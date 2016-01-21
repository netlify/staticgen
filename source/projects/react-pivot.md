---
title: React-Pivot
repo: davidguttman/react-pivot
direct: https://github.com/davidguttman/react-pivot
homepage: https://github.com/davidguttman/react-pivot
examples: http://davidguttman.github.io/react-pivot
license: MIT
bower: n/a
npm: react-pivot
technology: cssify, dataframe, envify, lodash, react, reactify, wildemitter, xtend
leading technology: React
author: David Guttman
authorurl: http://davidguttman.com/
description: Data-grid component with pivot-table-like functionality for data display, filtering, and exploration. Can be used without React.
---

ReactPivot is a data-grid component with pivot-table-like functionality for data display, filtering, and exploration. Can be used without React.

ReactPivot takes four arguments: `rows`, `dimensions`, `reduce` and `calculations`. Where:

* `rows` is your data, just an array of objects,
* `dimensions` is how you want to group your data,
* `reduce` is how you calculate numbers for each group,
* `calculations` is how you want to display the calculations done in `reduce`

#### Preview:

##### Filter data
![React-Pivot filter data](/images/libraries/react-pivot/react-pivot-filtering-solo-cell-filter-example.png "React-Pivot filter data")

##### Nested rows (Tree grid)
![React-Pivot tree grid](/images/libraries/react-pivot/react-pivot-tree-table-example.png "React-Pivot tree grid")
