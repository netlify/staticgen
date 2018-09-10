---
title: Landspout
repo: gmr/landspout
homepage: https://github.com/gmr/landspout
language:
  - Python (3.5+)
license:
  - BSD 3-Clause
templates:
  - Tornado
  - Mako
description: A simple static site generation tool
---
Landspout is a static website generation tool, using Tornado Template. Create your template structure, and your content, and point landspout at it.

Landspout has three operational modes:

- Single run build of the site
- Watch for changes in the source or template directory, rendering on change
- Run a HTTP server while watching for changes and rendering them

## Installation

```bash
pip3 install landspout
```

## Usage

    usage: Static website generation tool

    positional arguments:
    {build,watch,serve}   The command to run (default: build)

    optional arguments:
    -h, --help            show this help message and exit
    -s SOURCE, --source SOURCE
                            Source content directory (default: content)
    -d DEST, --destination DEST
                            Destination directory for built content (default:
                            build)
    -t TEMPLATE DIR, --templates TEMPLATE DIR
                            Template directory (default: templates)
    -b BASE_URI_PATH, --base-uri-path BASE_URI_PATH
    --whitespace {all,single,oneline}
                            Compress whitespace (default: all)
    -n NAMESPACE, --namespace NAMESPACE
                            Load a JSON file of values to inject into the default
                            rendering namespace. (default: None)
    -i INTERVAL, --interval INTERVAL
                            Interval in seconds between file checks while watching
                            or serving (default: 3)
    --port PORT           The port to listen on when serving (default: 8080)
    --debug               Extra verbose debug logging (default: False)
    -v, --version         output version information, then exit
