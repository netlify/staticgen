---
title: react-virtualized-pivot
repo: turnerniles/react-virtualized-pivot
direct: https://github.com/turnerniles/react-virtualized-pivot
homepage: https://turnerniles.github.io/react-virtualized-pivot
examples: https://github.com/turnerniles/react-virtualized-pivot
license: MIT
bower: n/a
npm: react-virtualized-pivot
technology: react, react-virtualized, react-select, sortablejs
leading technology: React
author: Niles Turner & Patrick Trasborg
authorurl: https://turnerniles.github.io/react-virtualized-pivot
description: A virtualized pivot table component for React
---

React Virtualized Pivot is a virtualized pivot table component for React.

ReactPivot takes a required `data` argument in the form of an array of arrays (first array will be your column headers) or an array of objects (keys of the object are your column headers). As well as optional arguments:

* `bodyCellValueTransformation` A function that transforms the display value of the body cell.
* `colorPack` An object with components to adjust colors of as keys and the corresponding color as a string.
* `onGridCellClick` A function that is fired when clicking on a grid cell.
* `onGridHeaderCellClick` A function that is fired when clicking on a column header.
* `onLeftGridCellClick` A function that is fired when clicking on a row header (the left hand column).
* `onLeftHeaderCellClick` A function that is fired when clicking on the top left most cell.

##### Preview
![react-virtualized-pivot preview](https://user-images.githubusercontent.com/8146241/29742823-06c2adf8-8a54-11e7-96ed-18466e853482.gif "react-virtualized-pivot preview")

##### Demo
![react-virtualized-pivot demo](https://turnerniles.github.io/react-virtualized-pivot "react-virtualized-pivot demo")
