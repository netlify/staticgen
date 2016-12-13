module Github
  module Project
    [:title, :repo, :startertemplaterepo, :homepage, :language, :license, :templates, :description].each do |attr|
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

    def stars_last_week
      last_week.stars
    end

    def forks_last_week
      last_week.forks
    end

    def issues_last_week
      last_week.issues
    end

    def stars_diff
      return 0 unless stars_last_week
      stars - stars_last_week
    end

    def forks_diff
      return 0 unless forks_last_week
      forks - forks_last_week
    end

    def issues_diff
      return 0 unless issues_last_week
      issues - issues_last_week
    end

    def stars_trend
      trend(stars_diff)
    end

    def forks_trend
      trend(forks_diff)
    end

    def issues_trend
      trend(issues_diff)
    end

    def trend(diff)
      diff == 0 ? "" : (diff > 0 ? "up" : "down")
    end

    def last_week
      days_ago(7)
    end

    def week_history
      (0..7).map do |days|
        days_ago(days)
      end.reverse.tap do |days|
        days.each_with_index do |day,index|
          if index > 0 && day.stars.nil?
            days[index] = days[index - 1]
          end
        end
      end
    end

    def days_ago(days)
      time = Time.now.to_i / API::DAY - days
      point_in_time(time * API::DAY, repo_data(time) || {})
    end

    def repo_data(day = nil)
      day ? API.repo_data_for(repo, day) : API.repo_data(repo)
    end

    def render(opts={}, locs={}, &block)
      super(opts.merge(:layout => "project.erb"), locs, &block)
    end

    def point_in_time(time, data)
      data = data || {}
      Struct.new(:timestamp, :stars, :forks, :issues).new(time, data[:stargazers_count], data[:forks], data[:open_issues])
    end
  end
end
