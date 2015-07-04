---
title: Statix
repo: https://gist.github.com/c2f7cc3807e8934b179e.git
homepage: https://gist.github.com/plugnburn/c2f7cc3807e8934b179e
language: Bash
license: WTFPL
templates: Own engine
description: Simplest static website generator in Bash
---

Statix is a stand-alone Bash script aimed at generating full-featured, routable static websites from reusable HTML snippets. It features the most basic templating engine ever possible but allows to organize your content in a SEO-friendly way. All Statix-based websites contain these parts:

- Templates: a directory where all HTML templates are stored
- Route configuration: a file that maps each publicly accessible template to a SEO-friendly URL
- Assets: a directory with optional files copied to the output website directory with no processing.

This script is also lightweight. Aside from some standard file management commands such as `cp`, `mkdir` and `rm`, the only serious dependency for Statix is GNU Grep compiled with PCRE support (i.e. the version that supports `-P` flag, included in most Linux distributions).

Templates
---------

In Statix, a template is a simple HTML file (or its partial) where also several special directives are allowed:

- **Include block** (`<!--#include:other-template.html-->`) is a block that allows including another template to reuse existing HTML code.
- **Set block** (`<!--#set:variable=some new value-->`) is a block that allows setting a variable to the specific string value.
- **Use block** (`<!--@variable-->`) is a block that inserts a previously set variable value.

Note that if a variable is set twice, the first set block occurence overrides any others. So if you want to set some page-specific variables and want to be sure they will not be overwritten by any included templates, please put the appropriate set blocks at the very top of the page.

Route configuration
-------------------

To let Statix know the entire structure of your website, it's mandatory to specify all routing in a separate file (say, `routes.conf`). This file contains the mapping of a physical template name (relative to your templates directory) and logical URL (relative to the supposed website root). Note that in order to avoid any building errors all URLs **must** end in `/` (forward slash). Physical names and URLs are separated with a colon (`:`). Each mapping pair is on a new line.

Example of a typical `routes.conf` file:
```
index.html:/
about.html:/about-us/
contact.html:/contact/
work.html:/portfolio/
```

Build process
-------------

Building the website out of the source materials (templates, routes and assets) is as simple as calling the script with all necessary parameters:

`/path/to/statix.sh -r <route config> -t <template directory> -o <output directory> [-a <asset directory>]`

Everything but asset directory is mandatory here. If `<asset directory>` is not specified, output will contain just the generated HTML tree and nothing else will be copied. If `<output directory>` doesn't exist, it will be created, **but if it does and is not empty, it will be completely overwritten, so be careful!** After the build completes, you can transfer the output directory contents wherever you want to host it.
