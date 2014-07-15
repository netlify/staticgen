---
title: Tclssg
repo: dbohdan/tclssg
homepage: https://github.com/dbohdan/tclssg
language: Tcl
license: MIT
templates: custom (textutil::expander)
description: A static site generator that uses Tcl for both code and templates.
---

Tclssg is a simple static site generator written in Tcl that uses Markdown for
content markup and HTML with embedded Tcl code for page templates (powered by
Tcllib's `textutil::expander`). Its output is valid HTML5 and CSS 3.

It distinguishes between plain old pages and blog posts; each blog post can have
tags, a sidebar with links to other blog posts (sorted by date) and
links to the previous and the next post.

Tclssg only generates relative links and can deploy websites over FTP.
