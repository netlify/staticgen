require 'github/middleman_extension'

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :github
activate :syntax

helpers do
  def caret_icon(number)
    if number > 0
      "<i class='fa fa-caret-up'></i>"
    elsif number < 0
      "<i class='fa fa-caret-down'></i>"
    end
  end
end

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true


# Build-specific configuration
configure :build do
end
