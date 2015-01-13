---
title: simple-website
repo: alexanderteinum/simple-website
homepage: https://github.com/alexanderteinum/simple-website
language: Go
license: BSD
templates: Markdown
description: simple-website is a static site generator written in Go
---
# simple-website

*simple-website* is a static site generator written in Go. It takes Markdown as input, and gives you a static, simple, and responsive website as output. Posts and pages are supported.

simple-website has been designed with technical simplicity and readability in mind – there are no configuration options and no themes to choose from. The workflow is simple – initialize a website using `simple-website`, create and/or edit Markdown files, run `simple-website` again – and publish.

## Get it

    go get github.com/alexanderte/simple-website

## Initialize website

    mkdir title-of-website
    cd title-of-website
    simple-website

## Create content

    $EDITOR _sections/header.md
    $EDITOR _posts/YYYY-MM-DD-title-of-post.md
    $EDITOR _pages/title-of-page.md

## Regenerate

    simple-website

## License

BSD
