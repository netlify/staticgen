---
title: Hepek
repo: sake92/hepek
homepage: https://sake92.github.io/hepek/
language:
  - Scala
license:
  - Apache2
templates:
  - Scala
description: Render Scala objects into files
---

Hepek is a tool that turns Scala `object`s into files.  
Everything that can be represented as a String can be written to a file.

## Features
- full Scala support
- automatic calculation of relative links
- incremental rendering and file watching
- custom, extensible and **typesafe**:
    - templates
    - variables
    - abstractions (data, functions)
- Markdown syntax
- Prismjs code highlighter
- Mathjax for math formulas
- simple installation, it's just an sbt plugin
