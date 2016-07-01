# MCOM Documentation

This repository contains documentation for Magento Commerce Order Management.

## Contributing

### Build website locally

You can build website locally using [Jekyll][jekyll] to see how things look like before committing change. 

Install [bundler][bundler] and [jekyll](https://jekyllrb.com/docs/installation/). Then, simply go to the root of the repository and run jekyll:

```
$ bundler exec jekyll serve
```

It will start jekyll webserver which will serve statically generated website at http://localhost:4000/docs. Jekyll will watch files and regenerate website every time when there is a change.

### Compile stylesheets

Look and feel of the website is build using SCSS files from `theme/scss`. These are complied into CSS files using [Gulp][gulp] task.

In case you want to update website theme install [gulp-cli](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and run:

```
$ gulp styles
```

[jekyll]: https://jekyllrb.com
[bundler]: http://bundler.io/
[gulp]: http://gulpjs.com/
