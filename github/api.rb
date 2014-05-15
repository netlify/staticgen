require 'net/http'

module Github
  class API
    DAY = 60 * 60 * 24
    METHODS = {
      :get => Net::HTTP::Get,
      :patch => Net::HTTP::Patch
    }
    GIST_ID = "3c9829b24df3aafef582"

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
      rescue => e
        puts "Error updating archived statistics"
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
        gist = JSON.parse(api_request(archive_uri)) rescue nil
        # Temporary workaround
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
        req = METHODS[options[:method] || :get].new(uri.path)
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
end
