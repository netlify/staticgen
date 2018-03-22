---
title: LabsHub
repo: stefanocudini/labshub
homepage: http://labs.easyblog.it
language: Javascript
license: MIT
templates: Handlebars
description: Create a Hub to organizing a set of NPM packages by keywords
startertemplaterepo: 
---

LabsHub generate automatically a nice and simple user interface that shows projects including their name, description and allows you to search through the keywords defined in each package.json files.
## Usage
Copy or linking projects directories inside root path
```bash
cp -r /var/www/my-npm-projects/* ./
```
LabsHub allows you to centrally manage all of npm projects(contains package.json file) deployed in your website through a single configuration file(labshub.json). Edit [labshub.json](https://github.com/stefanocudini/labs/blob/master/labshub.json) adding details about npm packages inside the root directory.
```javascript
{
  "pages": {
    "index.tmpl.html": "index.html",
    "maps.tmpl.html": "maps/index.html"
  },
  "pageOut": "index.html",
  "packages": {
    "package-dir-name": {
      "name": "package name override package.json name",
      "keywords": ["bootstrap","jquery","css3"],
      "rank": 2
    },
    ...
```

### generate static pages
```bash
npm i
grunt
```
