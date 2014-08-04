---
title: Tclssg
repo: dbohdan/tclssg
homepage: https://github.com/dbohdan/tclssg
language: Tcl
license: MIT
templates: custom
description: A static site generator that uses Tcl for both code and templates.
---

Tclssg is a static site generator written in Tcl that uses Markdown for content markup, Bootstrap for layout (with Bootstrap theme support) and Tcl code embedded in HTML for templating.

### Features

* Markdown, Bootstrap themes, Tcl templates;
* Distinguishes between plain old pages and blog posts;
* Generates valid HTML5 and CSS level 3;
* Supports external comment engines;
* Only generates relative links;
* Can deploy websites over FTP;
* Can be used as a library from Tcl.

### Page example

```markdown
{
    pageTitle {Test page}
    blogPost 1
    tags {test {a long tag with spaces}}
    date 2014-01-02
    hideDate 1
}
**Lorem ipsum** reprehenderit _ullamco deserunt sit eiusmod_ ut minim in id
voluptate proident enim eu aliqua sit.

<!-- more -->

Mollit ex cillum pariatur anim [exemplum](http://example.com) tempor
exercitation sed eu Excepteur dolore deserunt cupidatat aliquip irure in
fugiat eu laborum est.
```
