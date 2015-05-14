---
title: Durandal Grid
repo: tyrsius/durandal-grid
direct: https://github.com/tyrsius/durandal-grid
homepage: http://durandalgrid.tyrsius.com
examples: http://durandalgrid.tyrsius.com/#basic
license: MIT
bower: n/a
npm: Durandal-Grid
technology: grunt, grunt-contrib-copy
leading technology:
author: Timothy Moran
authorurl: http://tyrsius.com
description: A data-bindable grid widget with paging for Durandal.
---

#### Default setup

This is the simplest possible setup. An array of objects is supplied with no configuration, and no widget-parts are overridden. The grid default's use the first object's properties as the column headers. It should be noted that when you do not supply column options, as in this example, the supplied data must contain at least one element, or the grid cannot find column headers.

#### Bare configuration

Sometimes you don't want any configuration and you just want the grid to bind against the simplest possibly data. In these cases you can either pass just the rows of data you want to show, letting the widget figure out everything else, or pass your data with a list of property-name-only columns. In either case it is still necessary that the configuration be an object with at the very least a data property.

#### Advanced configuration

In advanced scenarios, you will need more control over Durandal Grid's HTML. The following data-parts are available to be overriden:

* header - The entire `<thead>` element
* headerRow - The `<tr>` element in the head containing the foreach: columns binding
* body - The `<tbody>` element, which contains the foreach: rows binding
* footer - The `<tfoot>` element, which contains the page buttons row, and the page size buttons row
* pageRow - The `<tr>` element of the page buttons, which contains the if: showPaging binding
* pageSizeRow - The `<tr>` element of the page size buttons, which tonains the if showPageSizeOptions binding

