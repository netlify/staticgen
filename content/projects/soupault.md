---
title: soupault
repo: dmbaturin/soupault
homepage: https://baturin.org/projects/soupault
language:
  - OCaml
license:
  - MIT
templates:
  - HTML
description: Website generator based on HTML rewriting instead of template processing.
---

Soupault is a static website generator based on HTML rewriting rather than template processing.
Like DOM manipulation, but without a browser.
Any page can be a soupault theme, there are no templates and no front matter.
Instead you can tell it where to insert things or what to extract using CSS3 selectors.

You can tell it to do things like:
* Include page content in `<div id="content">`
* Use the first `<h1>` for the page title
* Insert output of `date -R` in `<time id="generated-on">`

What else it can do:
* Create clean URLs for pages.
* Generate tables of contents, footnotes, and breadcrumbs.
* Insert a file, program output, or an HTML snippet into any element identified by a CSS selector.
* Use any preprocessors for pages in formats other than HTML.
* Extract metadata from pages using CSS selectors, export to JSON, and feed it to external scripts.

Soupault is friendly to existing websites: directory structure is configurable,
clean URLs are optional, and it can preserve your site structure down to file extensions.
The only file of its own is a TOML config `soupault.conf` in the project directory,
the rest is yours.

Precompiled executables are available for Linux and Windows.
