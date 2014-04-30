require 'github/repo_data'
require 'github/helper'

module Github
  class MiddlemanExtension < Middleman::Extension
    self.defined_helpers = [ Helper ]

    def initialize(app, options_hash={}, &block)
      super
    end

    def after_configuration
      app.github = RepoData.new(app, self)

      app.sitemap.register_resource_list_manipulator(:projects, app.github, false)
    end
  end
end

::Middleman::Extensions.register(:github, Github::MiddlemanExtension)
