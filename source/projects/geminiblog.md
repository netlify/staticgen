---
title: geminiBlog
repo: wifiextender/geminiblog
language: javascript
license: MIT
templates: any
description: Static blog written in JavaScript
---

Static blog written in Javascript. [Demo page](https://wifiextender.github.io) (my blog)

Typical static blogs: write the post, initialize the **X** static blog generator to convert your post and rewrite all local html files, push all the rewritten files.

In comparison geminiblog: write the post, register it in `js/config.js`

```javascript
register("./marktest.md", "Markdown Test", "December 10, 2014");
```

and push your markdown post + config.js, that's all. All the magic (post convertion, rendering, etc) happens in your blog visitors browser.

There are no server/client side requirements, except html and javascript.

This is a fork of [geminiblog](https://github.com/arpanpal010/geminiblog) and I have improved it to:

- [x] Be always mobile compatible by using the bootstrap framework. You can easily swap bootstrap themes, all you have to do is point the new theme in **index.html**, it's that simple.
- [x] Display Recent Posts sidebar in every page.
- [x] Download small number of markdown posts whenever the main blog page is loaded. The archive page doesn't download any markdown posts.
- [x] Set window title according to the requested page.
- [x] Include syntax highlighting while your blog posts remain written in markdown (see it in action [1](https://wifiextender.github.io/#!post=switching-from-archlinux-to-freebsd-then-gentoo) and [2](https://wifiextender.github.io/#!post=install-owncloud-with-ssl-and-nginx-in-centos--version-3-)). The highlighting script and highlighting languages are crammed and minified in single file.
- [x] Easily enable/disable prevnextLinks in `config.js`, if you don't want <-previous next-> button links.
- [x] Make use of CDN with integrity checks

Even thought I made [blogfy](https://github.com/wifiextender/blogfy), I have to admit that geminiblog brings the blogging down to everyone since it requires no blog post convertion and relies only on Javascript.

This project wouldn't exist without it's original author - [Arpan Pal](https://github.com/arpanpal010), he is the one that wrote geminiblog.

To test all the files located in this folder you'll have to have the most basic web server, `cd` to this folder in some terminal emulator and type:

```python
python2 -m SimpleHTTPServer

# or

python3 -m http.server
```

visit 127.0.0.1:8000 to preview your blog.

I've copied 9 of my blog posts in the markdown folder to make you more excited about geminiblog and how to write markdown posts.
