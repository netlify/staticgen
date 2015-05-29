---
title: About StaticGen
layout: making-of
---

# The Making of StaticGen

How do you build an up to date scoreboard for Github projects as a CDN backed static site with no moving parts?

The answer, of course, is a static site generator with some cool tooling around it.

This post will show you all the tricks we used to take StaticGen static.

## Tools of the Trade

StaticGen is built with [Middleman](/middleman), one of the most popular Ruby based static site generators. The site is hosted on [Netlify](https://www.netlify.com).

All the source for StaticGen is in [this repository](https://github.com/netlify/staticgen) on Github, and each time we push a new commit or accept a pull request, [Netlify](https://netlify.com) will run a middleman build and do a deploy of the generated site. Netlify will also auto-deploy the site once a day regardless of changes in the repository. We'll see why later.

## Data Sources

StaticGen combines data from the Github API with our own list of static site generators and some historical data on each of the static site generators we list.

Building a site like StaticGen with a static site generator, means changing the way we think about our data sources.

When building a dynamic site, we're always forced to focus on latency and query times. The #1 demand on our datasource will be that we can query and fetch data fast enough to get acceptable page load times.

With a static site, these concerns basically go away, as long as fetching the data can be done in a reasonable amount of time when running a build.

The structure of the Github API, means we have to make at least 1 call to the Github API for each static site generator when generating our index listing of all the generators (to get the number of stars, forks and issues).

If we were building a dynamic site, we would be forced to come up with a very effective caching layer or have to run cron-jobs in the background keeping our low-latency datastore in sync with the Github API, since doing 50+ API request while rendering the page would be out of the question.

With static site generation, things look completely different. Since we're just running the build a couple of times a day, there's absolutely no reason to worry about the latency of the API lookups, and we can happily use Github's API as our main datastore.

There's an issue with the Github API, however. It doesn't give us any historical data, and we need this to draw our charts of stars, forks and issues or to indicate the traction of each static site generator.

To keep these historical data around, we'll need a datastore we can write too as well as read from during our build process. There's plenty of options for this, but we wanted to keep everything as simple as possible.

## Gist as a Data Store

Enter Gist! Since we already need some Github API credentials to work with the Github API, we can take advantage of that to keep a really simple key value store around.

When we start the build, we read a JSON document from a Gist with all the historical data we already have on the static site generators. Whenever we fetch new data from the Github API for a project, we add it to our in-memory archive, and once the build is done, we write a new version of our JSON archive to the Gist.

Again, since latency or write time is really not a concern, as long as it's something reasonable for a build cycle, we can go for stupidly simple solutions. All of our StaticGen history can be found in [this gist](https://gist.github.com/biilmann/db8c50bf9fb8d0c0284b).

## High level overview

Each time Netlify runs a build of staticgen.com, Middleman will follow the following steps:

1. Get the list of projects from markdown files in the `/projects` folder
2. Load the archive from the Gist
3. Iterate through each project and add current stats from the Github API + historical data from archive
4. Generate all pages
5. Store the updated Gist archive

Then Netlify deploys the resulting `/build` directory

## Nitty Gritty Details

That's all you need to know for a high-level idea of how StaticGen works, and the ideas above can no doubt be adapted to all kind of sites that need to create reports, charts, rankings, etc, from API data that doesn't need to be updated instantly.

But lets dive into the nitty gritty details of how we're doing this with Middleman.

## The Basic Middleman Setup

Middleman has excellent support for blog-like collections, so the main data-source in StaticGen is a folder with a markdown file for each Github project we want to list and track.

Each file has some metadata expressed as YAML front-matter, eg.:

```yml
---
title: Middleman
repo: middleman/middleman
homepage: http://middlemanapp.com
language: Ruby
license: MIT
templates: ERB
description: Hand-crafted, modern frontend development.
---
```

The body text is then the description of the static site generator written in Markdown.

To access our pages, we can use the `sitemap` feature of Middleman. For a start we could do this straight from our templates (and in fact, while doing the first drafts of the design that's how StaticGen started out), but for StaticGen I wanted to decorate each of these pages with some more metadata fetched from Github's API.

To get this done, I wrote an extension to Middleman, with the end goal of exposing a sorted list of projects to the templates so we could do stuff like this:

```erb
<ul class="projects">
  <% projects.each do |project| %>
    <li>
      <h3><%= project.title %></h3>
      <p>Starts: <%= project.stars %>, Forks: <%= project.forks %>, Issues: <%= project.issues %></p>
    </li>
  <% end %>
</ul>
```

## Extending Middleman

Middleman has a solid extension system, that makes it straight forward to achieve something like this, once you get the hang of it.

The basic convention for Middleman extensions is to have a an extension class that in itself does little else than register helpers and resource list manipulators (more on those later), and then delegate the more specific tasks of filtering resources, or exposing methods to templates to more specified classes. Here's an annotated version of the Github extension we're using for StaticGen:

```ruby
# The top level module for our extension.
module Github
  # The actual extension class - this just defines some helpers and a
  # resource list manipulator
  class MiddlemanExtension < Middleman::Extension
    # Make all methods defined in out Github::Helper module available from
    # .erb templates
    self.defined_helpers = [ Helper ]

    # This is a callback method that Middleman will execute after the config.rb
    # has been executed
    def after_configuration
      # The extension can access our Middleman app
      # Our Github::Helper module has been mixed into this app already, and from
      # there we've added a "github" accessor that we'll use to keep the state
      # of our Github extension in.
      app.github = RepoData.new(app, self)

      # One of the powerful abstractions of Middleman is the "sitemap"
      # For our purposes we register a resource_list_manipulator (our newly
      # instantiated RepoData object). More about this later.
      app.sitemap.register_resource_list_manipulator(:projects, app.github, false)
    end
  end
end

# Register our Middleman extension under the namepsace "github"
::Middleman::Extensions.register(:github, Github::MiddlemanExtension)
```

This registers an extension with Middleman and tells Middleman to do a call to our "after_configuration" method once all of the `config.rb` file has been executed.

To use the extension we need to add `activate :github` to our `config.rb`.

The meat of our GitHub extension is all in the RepoData class that we registered as a resource list manipulator.

## The Middleman Sitemap and Resource Manipulation

Middleman's sitemap is quite a powerful abstraction over all the page-like resources that makes up our Middleman site.

Our RepoData class implements a `manipulate_resource_list` method, that will receive the list of resources that makes up our sitemap. Since it's a manipulator, it can filter or modify this list and return a new list. In theory you could have several extensions registering resource manipulators, and the resources from the sitemap would then get chained through them based on priority. For StaticGen the RepoData instance is our only resource manipulator.

Here's a quick look at a slightly simplyfied version of our resource manipulator for StaticGen:

```ruby
def manipulate_resource_list(resources)
  @projects = []

  # iterate over the resources
  resources.each do |resource|
    # Skip anything that's not in the projects/ folder
    next unless resource.path.match /^projects\//

    # Extend the resource with the methods from Github::Project
    resource.extend Project

    @projects << resource
  end

  resources
end
```

Our resource manipulator is the RepoData instance that we use to keep state for our extension during the Middleman build. And the basic idea is to not mess with the sitemap as such (we return the same resources we got), but to decorate all resources from the `projects` folder with methods for accessing stars, forks and issues from the Github API and our Gist archive. We also keep a list of just those resources that came from the `projects` folder so we can easily expose those to our `.erb` templates from the Github::Helper module.

This is generally useful technique for Middleman extensions, decorating some resources with special methods from a module.

In our case we add methods for accessing stars, forks and issues through the Github API and historical data through our Gist archive. I won't go into details on the Github API calls, it's pretty basic stuff.

## Deploying to Netlify

We now have a Middleman project that can get the relevant data from the Github API and generate StaticGen. Next step is to make sure StaticGen stays up to date.

All of StaticGen is open-source, and we're really keen on getting people to send us pull requests with new static site generators or improve our data on the ones we're currently listing. Github handles all of this for us, but we want to make sure changes go live as soon as we merge in a pull request.

Netlify makes it straight forward to setup continuous deployments from a Github repository and we've added our GITHUB_TOKEN as an environment variable in the Netlify backend.

Now whenever we merge in a new pull request, Github will trigger a new Netlify build and the changes are live on our CDN just a few seconds later.

Netlify also lets us setup an inbound webhook we can use to let other services trigger a new build. We take advantage of this by having [Zapier's](https://zapier.com/) scheduler trigger a build once every day. That way we can make sure our statistics on stars, forks and issues stays up to day.

## Final words

The first version of StaticGen was (ironically) a dynamic site, and we ran into lots of problem around caching Github API lookups and suffered from pretty abysmal performance.

Turning StaticGen into a static site made it perform at a whole other level, and leveraging Github means we have an awesome process in place for adding content and letting people contribute. We've had more than 50 pull requesets since we launched StaticGen.

The techniques we've used can be useful for just about any site that runs some kind of daily or hourly reporting.

---
Mathias Biilmann<br/>
Founder, [Netlify](https://www.netlify.com)
