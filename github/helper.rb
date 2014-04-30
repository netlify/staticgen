module Github
  module Helper
    attr_accessor :github

    def projects
      github.projects
    end

    def languages
      github.languages
    end
  end
end
