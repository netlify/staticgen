# JSpreadsheets

[JSpreadsheets.com](https://www.jspreadsheets.com), a list of top open source spreadsheets and data grids written in JavaScript.

## Running locally

```bash
git clone https://github.com/krzysztofspilka/JSpreadsheets.git
cd staticgen
bundle install
bundle exec middleman
```
    
if you have problems with building a project or you don't have (or want) to install required tools on your local machine you can use the prepared docker-compose.yml file.

Compile markdown files to HTML and bundle static files (it takes a while):

```bash
docker-compose -f docker/docker-compose.yml build
```

Run local server (http://localhost:8080):

```bash
docker-compose -f docker/docker-compose.yml up
```

## Copyrights

JSpreadsheets is created upon StaticGen which is built and maintained by [Netlify](https://www.netlify.com), a hosting and automation service for static websites and apps.

## License
This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
