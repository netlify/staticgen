---
title: thumbsup
repo: rprieto/thumbsup
homepage: http://github.com/rprieto/thumbsup
language: JavaScript
license: MIT
templates: N/A
description: Static photo &amp; video gallery generator
---

`thumbup` generates static photo &amp; video galleries from your local media.
Simply point it to a given folder, and upload the result to a static file server.

### Highlights

- creates all thumbnails
- generates multiple photo/video resolutions for web friendly browsing
- only rebuilds changed files: it's fast :)
- supports custom styles

### Input

Any folder with photos and videos:


    media
      |
      |__ paris
      |     |__ img001.jpg
      |     |__ img002.jpg
      |
      |__ sydney
            |__ vid001.mp4
            |__ img003.png


### What it looks like

![screenshot](https://raw.github.com/rprieto/thumbsup/master/screenshot.jpg)

Note that the goal of `thumbsup` is to generate a gallery in a quick and effortless way - just like Dropbox shared galleries. You can specify custom CSS, but it doesn't let you specify custom rendering templates (yet).
