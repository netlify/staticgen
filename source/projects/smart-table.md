---
title: Smart table
repo: lorenzofox3/Smart-Table
direct: https://github.com/lorenzofox3/Smart-Table
homepage: http://lorenzofox3.github.io/smart-table-website
examples: http://lorenzofox3.github.io/smart-table-website/#examples-section
license: MIT
bower: angular-smart-table
npm: angular-smart-table
technology: AngularJS
leading technology: AngularJS
author: RENARD Laurent
authorurl: https://lorenzofox3.github.io/resume/
description: Code source of Smart Table module - a table/grid for AngularJSjs.
---

Smart table is a table module for angular js. It allows you to quickly compose your table in a declarative way including sorting, filtering, row selection pagination. It is lightweight (around 3kb minified) and has no other dependencies than AngularJS itself. Check the documentation website for more details.

### Custom builds

smart-table is based around a main directive which generate a top level controller whose API can be accessed by sub directives (plugins), if you don't need some of these, simply edit the gulpfile (the pluginList variable) and run gulp build.