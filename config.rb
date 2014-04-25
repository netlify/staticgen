require 'net/http'

module GithubHelper
  attr_accessor :github

  def projects
    github.projects
  end

  def languages
    github.languages
  end
end

class GithubAPI
  DAY = 60 * 60 * 24
  METHODS = {
    :get => Net::HTTP::Get,
    :patch => Net::HTTP::Patch
  }
  GIST_ID = "db8c50bf9fb8d0c0284b"

  class << self
    attr_accessor :bulk_update

    def cache
      @cache ||= {}
    end

    def bulk
      cache["in_bulk"] = true
      yield.tap do
        cache["in_bulk"] = false
        store_cache!
      end
    end

    def store_cache!
      return if cache["in_bulk"]
      return unless cache["archive"] && cache["updated"]
      return puts "No Github token specified, cannot update archive gist" unless ENV["GITHUB_TOKEN"]

      puts "Writing to gist cache"
      api_request(archive_uri, :method => :patch, :body => {
        :files => {
          "data.json" => {"content" => JSON.generate(cache["archive"])}
        }
      })
      cache["updated"] = false
    end

    def repo_data(repo)
      cache["repo/#{repo}"] ||= (repo_from_archive(repo) || repo_from_api(repo) || {})
    end

    def repo_data_for(repo, day)
      fetch_archive unless cache["archive"]
      data = cache["archive"] && cache["archive"][repo] && cache["archive"][repo][day.to_s]
      data && data.with_indifferent_access
    end

    def repo_from_archive(repo)
      repo_data_for(repo, today)
    end

    def repo_from_api(repo)
      JSON.parse(fetch_repo(repo)).with_indifferent_access.tap do |data|
        unless repo_from_archive(repo)
          cache["archive"] ||= {}
          cache["archive"][repo] ||= {}
          cache["archive"][repo][today.to_s] = {
            "size" => data["size"],
            "stargazers_count" => data["stargazers_count"],
            "watchers_count" => data["watchers_count"],
            "forks_count" => data["forks_count"],
            "open_issues_count" => data["open_issues_count"],
            "forks" => data["forks"],
            "open_issues" => data["open_issues"],
            "watchers" => data["watchers"],
            "network_count" => data["network_count"],
            "subscribers_count" => data["subscribers_count"]
          }
          cache["updated"] = true
          store_cache!
        end
      end
    end

    def fetch_archive
      gist = JSON.parse(api_request(archive_uri))
      data = JSON.parse(gist["files"]["data.json"]["content"])
      cache["archive"] = data
    rescue => e
      puts "Error fetching gist with archived data: #{e}"
    end

    def archive_uri
      "https://api.github.com/gists/#{ENV["GIST_ID"] || GIST_ID}"
    end

    def fetch_repo(repo)
      api_request("https://api.github.com/repos/#{repo}")
    end

    def api_request(url, options = {})
      uri = URI.parse(url)
      req = METHODS[options[:method] || :get].new(uri)
      req['Authorization'] = "token #{ENV["GITHUB_TOKEN"]}" if ENV["GITHUB_TOKEN"]

      if options[:body]
        req.body = JSON.generate(options[:body])
        req.content_type = "application/json"
      end

      res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) { |http|
        http.request(req)
      }
      code = res.code.to_i
      unless code >= 200 && code <= 300
        raise "Error communicating with Github #{uri} (#{res.code}): #{res.inspect}"
      end
      res.body
    end

    def today
      today = Time.now.to_i / DAY
    end
  end
end

module GithubProject
  [:title, :repo, :homepage, :language, :markdown, :templates, :description].each do |attr|
    define_method attr do
      data[attr]
    end
  end

  def stars
    repo_data[:stargazers_count]
  end

  def forks
    repo_data[:forks]
  end

  def issues
    repo_data[:open_issues]
  end

  def last_week
    days_ago(7)
  end

  def week_history
    (0..7).map do |days|
      days_ago(days)
    end.reverse
  end

  def days_ago(days)
    time = Time.now.to_i / GithubAPI::DAY - days
    point_in_time(time * GithubAPI::DAY, repo_data(time) || {})
  end

  def repo_data(day = nil)
    day ? GithubAPI.repo_data_for(repo, day) : GithubAPI.repo_data(repo)
  end

  def render(opts={}, locs={}, &block)
    super(opts.merge(:layout => "project.erb"), locs, &block)
  end

  def point_in_time(time, data)
    data = data || {}
    Struct.new(:timestamp, :stars, :forks, :issues).new(time, data[:stargazers_count], data[:forks], data[:open_issues])
  end
end

class GithubRepoData
  def initialize(app, extension)
    @app = app
    @extension = extension
    @projects = []
    @languages = {}
  end

  def projects
    @projects.sort {|a,b|
      b.stars <=> a.stars
    }
  end

  def languages
    @languages.keys.sort {|a,b| @languages[b] <=> @languages[a] }
  end

  def manipulate_resource_list(resources)
    @projects = []

    GithubAPI.bulk do
      resources.each do |resource|
        next unless resource.path.match /^projects\//
        resource.extend GithubProject
        resource.repo_data # Trigger a repo fetch
        resource.destination_path = resource.path.sub(/^projects\//, '')

        @projects << resource
        @languages[resource.language] ||= 0
        @languages[resource.language] += 1
      end
    end

    resources
  end
end

class GithubRepoListing < Middleman::Extension
  self.defined_helpers = [ GithubHelper ]

  def initialize(app, options_hash={}, &block)
    super
  end

  def after_configuration
    app.github = GithubRepoData.new(app, self)

    app.sitemap.register_resource_list_manipulator(:projects, app.github, false)
  end
end

::Middleman::Extensions.register(:github_repo_listing, GithubRepoListing)

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

activate :github_repo_listing

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
