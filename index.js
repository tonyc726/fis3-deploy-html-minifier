/**
 * A plugin with html-minifier in fis deploy
 * Copyright (c) 2016
 * All rights reserved
 *
 * Author: zhujf620@gmail.com
 */

'use strict';

var minify = require('html-minifier').minify

/**
 * deploy 插件接口
 * @param  {Object}   options  插件配置
 * @param  {Object}   modified 修改了的文件列表（对应watch功能）
 * @param  {Object}   total    所有文件列表
 * @param  {Function} next     调用下一个插件
 * @return {undefined}
 */
module.exports = function(options, modified, total, next) {
  
  modified.forEach(function(file) {
    if (file.isHtmlLike) {
      var content = file.getContent();

      file.setContent(minify(content, options))
    }
  });

  //invoke the next deploy plugin
  next();
};
