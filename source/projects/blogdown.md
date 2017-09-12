---
title: blogdown
repo: thingdown/blogdown
homepage: https://thingdown.github.io/blogdown
language: JavaScript
license: MIT
templates: pug
description: A back-end agnostic, zero compilation, markdown blogging platform
---

### [Download](https://github.com/thingdown/blogdown/releases/download/v0.1.9/blogdown.zip)
### [Demo](https://thingdown.github.io/blogdown)


## Features

| Feature          | BlogDown | Jekyll | WordPress | Ghost |
| ---------------- | :------: | :----: | :-------: | :---: |
| Single Page      | Yes      | No     | No        | No    |
| Page Transitions | Yes      | No     | No        | No    |
| Modular Styles   | Yes      | No     | No        | No    |
| Custom Rendering | Yes      | No     | Yes       | No    |
| Taxonomies       | Yes      | No     | Yes       | No    |
| No Compilation   | Yes      | No     | Yes       | Yes   |
| Commenting       | Yes      | No     | Yes       | Yes   |
| Server Agnostic  | Yes      | Yes    | No        | No    |
| No Database      | Yes      | Yes    | No        | No    |
| Modules/Plugins  | Yes      | Yes    | Yes       | No    |
| Themes           | Yes      | Yes    | Yes       | Yes   |


## Installing

1. Unzip the contents from [HERE](https://github.com/thingdown/blogdown/releases/download/v0.1.9/blogdown.zip) on your server

2. There is no step two. That's how easy it is to install BlogDown.

### Try locally

```sh
mkdir blogdown && cd blogdown
curl -OL https://github.com/thingdown/blogdown/releases/download/v0.1.9/blogdown.zip
unzip blogdown.zip && rm blogdown.zip
python -m SimpleHTTPServer
```

Go to [http://localhost:8000](http://localhost:8000)

### Docker

```sh
docker run --name some-blogdown -v /volumes/blogdown-content:/app/content -p 8081:8081 thingdown/blogdown:latest
```

Go to [http://localhost:8081](http://localhost:8081)

### Build from source

```sh
git clone https://github.com/thingdown/blogdown.git
yarn install # or `npm intall`
bower install
yarn start
```
