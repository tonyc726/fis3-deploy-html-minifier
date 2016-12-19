#fis3-deploy-html-minifier
A plugin for [fis3](http://fis.baidu.com/) using [html-minifier](https://github.com/kangax/html-minifier) in deploy.

## Usage

### fis-conf.js

``` javascript

fis.match('*.tpl', {
    isHtmlLike: true
});

fis.match('**', {
   deploy: [
        fis.plugin('html-minifier', {
            // html-minifier options
            // https://github.com/kangax/html-minifier#options-quick-reference
        }
    )
});
```
