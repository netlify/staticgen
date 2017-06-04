---
title: Spoon
repo: leNoahOfArk/spoon
homepage: https://github.com/leNoahOfArk/spoon
language: Bash
license: MIT
templates: Custom
description: A tiny and bashful static site generator
---

# SPOON
##### a tiny bashful static site generator

### dependencies:

+ Obviously, bash
+ A bunch of gnu-coreutils, to be precise:
    - echo
    - mkdir
    - exit
    - date
+ Also vi, unless you set a $EDITOR in your .bashrc
    
### Usage: 

+ `./spoon.sh post hello` will create a post with the slug hello.
+ Set the post title on the first line of the file.
+ `./spoon.sh build` will build your site.
+ The site is also automatically built after creating a new post.
