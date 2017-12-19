---
title: Madoko
repo: koka-lang/madoko
homepage: https://www.madoko.net
language: Javascript/Koka
license: Apache
templates: No
description: A fast processor for high quality academic and technical articles from Markdown and LaTeX.

---

The main design goal of Madoko is to enable light-weight creation of
high-quality scholarly and industrial documents for the web and print,
while maintaining John Gruber's Markdown philosophy of simplicity and
focus on plain text readability.

The popularity of Markdown is not accidental, and it is great for
writing prose: it is super simple and straightforward to create good
looking HTML documents. But for more serious use Markdown falls short in
several areas, and Madoko provides many essential additions for larger
documents:

-   Extensive support for labeling and
    in-document [references](http://madoko.org/reference.html#sec-ids-labels).
-   [Tables](http://madoko.org/reference.html#sec-table) with custom
    borders, column alignment, multicolumn spans, colors etc.
-   Great [citation](http://madoko.org/reference.html#sec-bib) support,
    using standard BibTeX entries with either BibTeX styles (`.bst`) or
    Citation Language styles (`.csl`).
-   Excellent support for [advanced
    mathematics](http://madoko.org/reference.html#sec-math) (and
    powerful packages like TikZ and PSTricks) with scalable vector
    images (SVG) in web pages.
-   Great LaTeX integration where one can use any LaTeX style or package, and
    any LaTeX document styles, like the ones provided by most
    publishers.
-   Excellent support for static [syntax
    highlighting](http://madoko.org/reference.html#sec-pre) and
    transformation of code fragments.
-   Automatic [numbering](http://madoko.org/reference.html#sec-numbering)
    of sections, figures, examples, etc.
-   Title page
    and [table-of-contents](http://madoko.org/reference.html#sec-special)
    generation.
-   Support for user defined [custom
    blocks](http://madoko.org/reference.html#sec-custom), like
    *Theorem*, *Abstract*, *Figure*, etc.
-   Styling for both HTML and LaTeX output through [standard CSS
    attributes](http://madoko.org/reference.html#sec-css) and [CSS
    metadata rules](http://madoko.org/reference.html#sec-rules).
-   Powerful document transformations through [replacement
    rules](http://madoko.org/reference.html#sec-replace).
-   Create
    great [presentations](http://madoko.org/reference.html#sec-presentations)
    for both the web and in print.
-   Compatible with most common Markdown extensions, such
    as [footnotes](http://madoko.org/reference.html#sec-footnotes),
    [mathematics](http://madoko.org/reference.html#sec-math), [attributes](http://madoko.org/reference.html#sec-attr),
    etc.

Moreover the online editor [Madoko.net](https://www.madoko.net/)
supports:

-   Full online editing, previewing, and document generation.
-   Seamless sharing and collaboration with other authors
    through [dropbox](https://www.dropbox.com/home)
    and [github](https://github.com/); it is very easy to work together
    on a document where changes are continuously merged.
-   Full support for mathematics and bibliographies through server-side
    LaTeX; no need to install LaTeX yourself.
-   This is an HTML5 app and also works offline. With the open source [madoko
    local](https://www.npmjs.com/package/madoko-local) program you even
    access local files on disk, and run LaTeX locally.

Instead of a plethora of backends, Madoko concentrates on generating
either HTML or high-quality PDF files
through [LaTeX](http://en.wikibooks.org/wiki/LaTeX). There has been a
lot of effort in Madoko to make the LaTeX generation robust and
customizable while integrating well with the various academic document-
and bibliography styles. This makes it great for writing articles using
just Madoko and get both a high-quality print format (PDF) and a great
looking HTML page.


Here are some other (large!) examples of complicated documents, click on
the links to edit the document directly
in [Madoko.net](https://www.madoko.net/):

-   [The anatomy of programming
    languages](https://www.madoko.net/editor.html?#url=http://research.microsoft.com/en-us/um/people/daan/madoko/samples/AoPL/anatomy.mdk&options=%7B%22delayedUpdate%22:%22true%22%7D):
    A large part of the [AoPL](https://github.com/w7cook/AoPL) book by
    Prof. Dr. William Cook.
-   [Software model checking with
    IC3](https://www.madoko.net/editor.html?#url=http://research.microsoft.com/en-us/um/people/daan/madoko/samples/horn/horn.mdk&options=%7B%22delayedUpdate%22:%22true%22%7D):
    A math-heavy presentation for the VTSA summer school 2014 by Dr.
    Nikolaj Bjørner and others.
-   [The Madoko reference
    manual](https://www.madoko.net/editor.html?#url=http://research.microsoft.com/en-us/um/people/daan/madoko/samples/reference/reference.mdk&options=%7B%22delayedUpdate%22:%22true%22%7D):
    The reference manual by yours truly.

To learn more about Madoko, checkout the [reference manual](http://madoko.org/reference.html). To use it, simply:

Install with:

```
npm install madoko -g
``` 
Translating a Markdown document to HTML is as simple as:

```
madoko mydoc.mdk
```
To also generate a PDF file, use:

```
madoko --pdf --odir=out mydoc
```

