require 'github/middleman_extension'

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :github

helpers do
  def caret_icon(number)
    if number > 0
      "<i class='fa fa-caret-up'></i>"
    elsif number < 0
      "<i class='fa fa-caret-down'></i>"
    end
  end
end

# Build-specific configuration
configure :build do
end
