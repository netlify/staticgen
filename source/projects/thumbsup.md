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

```
media
  |
  |__ paris
  |     |__ img001.jpg
  |     |__ img002.jpg
  |
  |__ sydney
        |__ vid001.mp4
        |__ img003.png
```

### How it works

- `npm install -g thumbsup`
- install extra dependencies mentioned in the [README](https://github.com/rprieto/thumbsup), like `ffmpeg`

Then simply run the `thumbsup` command with a few options:

```bash
thumbsup --input "/media/photos" --output "./website" --title "My holidays" --thumb-size 200 --large-size 1500 --css "./custom.css"


Static website      [===================] done
Original media      [===================] 6/6 files
Photos (large)      [===================] 5/5 files
Photos (thumbs)     [===================] 5/5 files
Videos (web)        [===================] 1/1 files
Videos (poster)     [===================] 1/1 files
Videos (thumbs)     [===================] 1/1 files

Gallery generated successfully
```

### What it looks like

![screenshot](https://raw.github.com/rprieto/thumbsup/master/screenshot.jpg)

Note that the goal of `thumbsup` is to generate a gallery in a quick and effortless way - just like Dropbox shared galleries. You can specify custom CSS, but it doesn't let you specify custom rendering templates (yet).
