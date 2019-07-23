# fis3-deploy-html-minifier

A fis3 plugin to compress file with html-minifier on deploy stage.

[![npm](https://img.shields.io/npm/v/fis3-deploy-html-minifier.svg?style=flat-square)](https://github.com/tonyc726/fis3-deploy-html-minifier)
[![Build Status](https://travis-ci.org/tonyc726/fis3-deploy-html-minifier.svg?style=flat-square&branch=master)](https://travis-ci.org/tonyc726/fis3-deploy-html-minifier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/tonyc726/fis3-deploy-html-minifier)

> Thanks for [fis3-deploy-i18n-template](https://github.com/foio/fis3-deploy-i18n-template)

在前端的工程构建工具[FIS3](http://fis.baidu.com/)发布阶段，将`modified`中命中`templatePattern`规则，或者未设置`templatePattern`，但是拥有`isHtmlLike: true`的文件，使用 [html-minifier](https://github.com/kangax/html-minifier) 进行压缩。

## 使用说明

### 如何安装

```shell
yarn add fis3-deploy-html-minifier -D
# OR
npm install fis3-deploy-html-minifier -D
```

### 默认配置

```javascript
/**
 * @type {Object} DEFAULT_CONFIG - 插件默认配置
 * @property {string} [templatePattern=''] - 需要做多语言处理文件subpath的glob规则，默认为所有html文件
 * @property {string} [ignorePattern=''] - 需要忽略编译的glob规则
 * @property {...object} minifyOptions - html-minifiers的配置项，具体的可以参考[options-quick-reference](https://github.com/kangax/html-minifier#options-quick-reference)
 */
{
  templatePattern: '',
  ignorePattern: '',
  ...minifierOptions,
};
```

## 参考示例

> 具体的实验可以参考这个项目[fis3-examples](https://github.com/tonyc726/fis3-examples)。

### 项目目录结构

```
# project root path
│
├── template-folder
│   ├── index.html
│   ├── _not_compress.html
│   ├── ...
│   └── sub-folder
│       ├── detail.html
│       └── ...
│
├── fis-conf.js
│
└── package.json
```

### 配置`fis-conf.js`中`fis3-deploy-html-minifier`相关的内容

```javascript
// ------ templates ------
fis.match('/template-folder/(**)/(*.html)', {
  release: '/$1/$2',
});
fis.match('/template-folder/(*.html)', {
  release: '/$1',
});
// ------ deploy ------
fis.match('**', {
  deploy: [
    fis.plugin('html-minifier', {
      templatePattern: '',
      i18nPattern: '/template-folder/**/_*.html',
      // @see https://github.com/kangax/html-minifier#options-quick-reference
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }),
  ],
});
```

## 参考

- [node-project-kit](https://github.com/tonyc726/node-project-kit) - 快速创建项目的模板
- [glob](https://github.com/isaacs/node-glob) - 使用 glob 语法获取匹配文件的工具
- [html-minifier](https://github.com/kangax/html-minifier) - html 压缩工具

## License

Copyright © 2017-present. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/tonyc726/fis3-deploy-html-minifier/blob/master/LICENSE) file.

---

Made by Tony ([blog](https://itony.net))
