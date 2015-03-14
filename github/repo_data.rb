require 'github/project'
require 'github/api'

module Github
  class RepoData
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
      @languages.keys.sort.uniq { |language| language.downcase }
    end

    def manipulate_resource_list(resources)
      @projects = []

      API.bulk do
        resources.each do |resource|
          next unless resource.path.match /^projects\//
          resource.extend Project
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
end
