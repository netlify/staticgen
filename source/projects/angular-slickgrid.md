---
title: Angular-Slickgrid
repo: ghiscoding/Angular-Slickgrid
homepage: https://github.com/ghiscoding/Angular-Slickgrid
examples: https://ghiscoding.github.io/Angular-Slickgrid
license: MIT
npm: angular-slickgrid
technology: Angular 4+
author: Ghislain B.
description: SlickGrid for Angular 4+, the fastest & most customizable javascript datagrid with Bootstrap 3/4 theme support
---

Angular-Slickgrid is a wrapper of the SlickGrid library into an Angular component, it brings all of the features from SlickGrid plus many new and convenient features not available in the original grid. SlickGrid utilizes virtual rendering to enable you to easily work with hundreds of thousands of items without any drop in performance.

Take a look at the multiple [demos](https://ghiscoding.github.io/Angular-Slickgrid) available.

#### Features:

* Adaptive virtual scrolling (easily supports 1 million rows)
* Cell Formatters (support built-in & custom)
* Cell Editors with Validation/Undo (support built-in & custom)
* Column Filters (support built-in & custom)
* input/date picker/slider/single & multiple select
* Compound Column Filters (operator + filter)
* Column Resize/Reorder/Show/Hide
* Column Autosizing, Force-Fit or Custom Size
* Column Header Button Plugin
* Column Header Menu Plugin (support built-in & custom commands)
* Column Header Grouped
* Column Span
* Row Highlighting
* Row Selections
* Row Detail View Plugin
* Row Reordering
* Row & Cell Create/Update/Delete
* Sorting (single/multi-columns)
* Grouping & Aggregates (single/multi-columns)
* Grouping with Column Dragging
* Support Multiple Locale Dynamically
* Data Export to CSV or Text File
* Grid Menu (aka hamburger menu, support built-in and custom commands)
* Grid State & Presets using Local Storage (or anything else)
* Pinned Columns/Rows (aka frozen)
* Grid Auto-Resize & Responsive
* Background Async Post-Rendering
* Backend Services (OData & GraphQL)
* Bootstrap Theme with SASS (Bootstrap 3/4)
* Customizable Styling/Theme (over 300 SASS variables)
* Support Multiple Grids in 1 page
* Custom Column Filters with Angular Component
* Custom Cell Editors with Angular Component
* Custom AsyncPostRender with Angular Component

#### Preview:

Screenshots from the demo app with the `Bootstrap` theme (that is the only available theme, but there is a lot of SASS variables to make it look like Material, or other theme if you wish to. If you create a new theme, please submit a PR).

##### Slickgrid example with Formatters (last column shown is a custom Formatter)

###### You can also see the Grid Menu opened (aka hamburger menu)

![Default Slickgrid Example](/images/libraries/angular-slickgrid/formatters.png)

##### Filter and Sort (clientside with DataView)

![Slickgrid Server Side](/images/libraries/angular-slickgrid/filter_and_sort.png)

##### Editors and/or onCellClick

![Editors](/images/libraries/angular-slickgrid/editors.png)

##### Pinned (aka frozen) Columns/Rows

![Slickgrid Server Side](/images/libraries/angular-slickgrid/frozen.png)

##### Slickgrid Example with Server Side (Filter/Sort/Pagination)
###### Comes with OData & GraphQL support (you can implement custom too)

![Slickgrid Server Side](/images/libraries/angular-slickgrid/pagination.png)
