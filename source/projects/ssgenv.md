---
title: SSGEnv
repo: javimosch/ssgenv
homepage: 
language: JavaScript
license: Apache
templates: Handlebars
description: Generates simple static web content blazing fast using handlebars templates.
---

### Description

Ssgenv is a toolkit boilerplate thought to be hosted on a cloud  saas and used through a client side GUI, simplifying differents
aspects of web development.
Currently it works only by terminal (as most of static web generator tools) and was used succefully to deploy basic static web content
in the past.

### How it works

- Concatenate css files alphabetically from css folder. (Build / Watch)
- Concatenate js files alphabetically from js folder. (Build / Watch)
- Compiles files (tree structure, filenames need to contain 'index' and to be .html) from static folder.  (Build / Watch)
- Livereload Sync is possible using firebase on build event success. (config.js -> firebaseURL)
- Ftp deploy (multiple ftp configurations).
- a config.js file is used to expose as context to handlebars and for global configuration.

### Example and Docs

WIP
