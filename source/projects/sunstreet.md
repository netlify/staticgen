---
title: Sunstreet
repo: zalando/sunstreet
homepage: https://github.com/zalando/sunstreet
language: Javascript
license: MIT
templates: Markdown
description: Responsive SPA with on-the-fly markdown translation, Github API, and a CMS. 
---

Sunstreet is a minimalistic blog template, specially made for Github pages and can be statically/dynamically served anywhere else too. You can view the demo from [zalando.github.io/sunstreet](http://zalando.github.io/sunstreet).

![Screenshot Am I Responsive](https://raw.githubusercontent.com/zalando/sunstreet/master/screentshot.png)


### Usage Features
1. **Responsive** --- Try [screenify](http://screenify.com) to see how it looks on different devices.
2. **Single Page App**  --- Using [Routie](http://projects.jga.me/routie/) we have hash based navigation, that is compatible with github pages, and older browsers.
2. **Minimalistic** -- The design was inspired by [Medium](http://medium.com), and [Slidebars](http://plugins.adchsm.me/slidebars/) demo website.
3. **Dynamic TOC** --- A dynamic table of contents  found in the right sidebar Inspired by [stackeditor](http://stackeditor.io).
4. **Markdown** --- Content written in Markdown format, and compiled on the fly, instead of compiling them into html files then having to upload them.
5. **Code Hilighting** -- HighlightJS is included.
6. **Github API** ---  Since contents compiled on the fly this made it possible to also load any document found on github, such as projects' README.md, examples are in demo version.
7. **Disqus** --- Disqus comments plugin, wish SPA hash support.
8. **Analytics** --- Google Analytics with SPA hash support.
9. **CMS** check http://project/cms.html


### Development Features
1. **Architecture** ---  We try to follow 12Factor app guidlines.
1. **Build** --- We use Gulp to build, compile and optimize artifacts the project, using `gulp` command.
2. **Serve** --- Site can be simply served with  `gulp serve`
2. **Javascript** --- Simple and in one file `main.js` the code is is compatible with jshint.
3. **Html5**
4. **CSS** --- Built by [Less](http://lesscss.org) for maximum maintability, simplicity, and productivity.
5. **gulp deploy** --- Deploys the distribution to repo gh-pages branch (note I guess it only works when you have push rights)

### Users
You just download the [Demo source](https://github.com/zalando/sunstreet/tree/gh-pages)  (which is latest version) and edit the `index.html` and `content.json` to fit your needs.
> Note: The content folder is where you put all of your contents, other folders are for the Application itself.

### Developers/Hackers
1. `npm install jshint -g`  you'll need this if you're using EMACS jshint adhook.
2. You clone this repo.
3. cd to the project and `npm install`  and `bower install`
4. `npm install -g gulp`
5. build using `gulp`  , and run test server using  `gulp serve`.

## Contribution and Future features
Small Pull Requests are much welcome, just don't forget to comment them, as for bigger PRs they might take longer time since I might not have time reviewing them all.

As for future plan here's a humble brain storm:

1. ~~Update dependencies.~~
1. ~~Removing Personal data~~
1. ~~Add Markdown test page~~
1. ~~More reliance on `content.json` file instead of hardcoding any content, e.g disqus configurations~~ Done
1. ~~Continuous integration if necessary.~~ Done
1. ~~`content.json` validation~~ Done
1. JS code modularity and pluggability.
1. ~~gh-pages deployment branch~~  Done using `gulp deploy!` super cool
1. travis to gh-pages branch
1. More improvements on tests

## Licence
Copyright (c) 2015 Ismail Marmoush and other contributors. Licensed under the MIT. See [License](https://opensource.org/licenses/MIT)
