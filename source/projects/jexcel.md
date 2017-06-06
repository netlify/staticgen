---
title: jExcel Spreadsheet
repo: paulhodel/jexcel
direct: https://github.com/paulhodel/jexcel
homepage: http://www.bossanova.uk/jexcel
examples:  http://www.bossanova.uk/jexcel
license: MIT
technology: Javascript, Jquery, Web Component
leading technology: Javascript
author: Paul Hodel
authorurl: https://www.linkedin.com/in/paulhodel
description: excel is a very light jquery plugin to embed a spreadsheet, compatible with Excel, in your browser. You can load data straight to the table from a JS array, json or even a CSV file. You can copy and paste from or to Excel straight to jExcel. You can easily integrate with third party jquery plugins to create your own custom colums, custom editors, and others. And, it has a plenty of nice features such as key-value dropdown, CSV loading/exporting, multiple spreadsheets and much more. We have a large roadmap ahead and we are constantly improving, so don't forget to send us your ideas.
---
#### Advantages

* Make rich web applications
* Improve your clients software experience
* Better CRUDS and beautiful UI
* Compatibility with excel, just copy and paste
* Powerful customizations

#### Download:

[Githut](http://github.com/paulhodel/jexcel)
[Download](https://github.com/paulhodel/jexcel/archive/master.zip)

#### Usage:
```html
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="http://cdn.bossanova.uk/js/jquery.jexcel.js"></script>
<link rel="stylesheet" href="http://cdn.bossanova.uk/css/jquery.jexcel.css" type="text/css" />

<div id="my"></div>

<script>
data = [
    ['Google', 1998, 807.80],
    ['Apple', 1976, 116.52],
    ['Yahoo', 1994, 38.66],
];

$('#my').jexcel({ data:data, colWidths: [ 300, 80, 100 ] });
</script>
</html>
```

#### Examples:

[Creating a table from an external CSV file](http://www.bossanova.uk/jexcel/creating-a-table-from-an-external-csv-file)   
[Calendar column type](/jexcel/using-a-calendar-column-type)
[Sorting by column](http://www.bossanova.uk/jexcel/reorder)
[Multiple spreadsheets in the same page](/jexcel/multiple-spreadsheets-in-the-same-page)
[Integrating a third party plugin into jExcel](http://www.bossanova.uk/jexcel/integrating-a-third-party-plugin-into-your-spreadsheet)
[Currency and masking numbers](http://www.bossanova.uk/jexcel/currency-and-masking-numbers)
[Working with dropdowns](http://www.bossanova.uk/jexcel/working-with-dropdowns)
[Handling events](http://www.bossanova.uk/jexcel/tracking-changes-on-the-spreadsheet)
[Including formulas on your spreadsheet](http://www.bossanova.uk/jexcel/including-formulas-on-your-spreadsheet)
[Remote updates](http://www.bossanova.uk/jexcel/remote-updates)

#### Roadmap:

We are working hard to create a better plugin, but jExcel is under development. We would love to hear your ideas to make it great. We are glad to say new features are coming every day, and we are currently working in features such as:

* Merged cells
* Multiple tabs
* Big data (partial table loading)
* Pagination
* Online work collaboration

More suggestions are welcome. Please send your comments in our Github page. 
