---
title: Madoko
repo: houshuang/madoko
homepage: http://www.madoko.net
language: Javascript
license: Apache
templates: No
description: One-page article-styled website from Markdown and LaTex.
---

With Madoko you can write full-blown academic articles with internal references, mathematical formulas, and bibliographies completely in Markdown and LaTex to get beautiful PDF or HTML output.

- Install with `npm install madoko -g` 
- Transform a markdown document to HTML: `madoko -v mydoc.md` 

Supports "including" source files and referencing both CSS and javascript. Read the [reference manual](http://research.microsoft.com/en-us/um/people/daan/madoko/doc/reference.html) to learn more.

An easy way to manage a large project is to split up the content and have one `index.md` including the chucncks:

```md
css : lib/style.css

script: lib/myAweseomScriptsAndAnalytics.js

[INCLUDE="whyWeDoIt.md"]

[INCLUDE="HowWeDoIt.md"]

[INCLUDE="WhatWeDo.md"]

```



