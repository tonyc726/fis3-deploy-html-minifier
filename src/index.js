/**
 * A FIS3 plugin to generate html file with i18n data in deploy stage
 * Copyright (c) 2017
 * All rights reserved
 *
 * Author: tonyc726@gmail.com
 */

import { minify } from 'html-minifier';
import isGlob from 'is-glob';
import { merge, forEach } from 'lodash';

/**
 * @type {Object} DEFAULT_CONFIG - 插件默认配置
 * @property {string} [templatePattern=''] - 需要做多语言处理文件subpath的glob规则，默认为所有html文件
 * @property {string} [ignorePattern=''] - 需要忽略编译的glob规则
 * @property {...object} minifyOptions - html-minifiers的配置项，具体的可以参考[options-quick-reference](https://github.com/kangax/html-minifier#options-quick-reference)
 */
const DEFAULT_CONFIG = {
  templatePattern: '',
  ignorePattern: '',
};

/**
 * FIS3 deploy i18n plugin
 *
 * http://fis.baidu.com/fis3/docs/api/dev-plugin.html
 * @param {object} options - 插件配置
 * @param {object} modified - 修改了的文件列表（对应watch功能）
 * @param {object} total - 所有文件列表
 * @param {function} next - 调用下一个插件
 * @return {undefined}
 */
export default (options, modified, total, fisDeployNextEvent) => {
  const config = merge(DEFAULT_CONFIG, options);
  const { templatePattern, ignorePattern, ...minifyOptions } = config;
  const isTemplatePatternGlobVerified = isGlob(templatePattern);
  const isIgnorePatternGlobVerified = isGlob(ignorePattern);
  /**
   * @see http://fis.baidu.com/fis3/api/fis.file-File.html
   *
   * @param {string}  modifiedFile.ext - 文件名后缀
   * @param {string}  modifiedFile.filename - 文件名，没有后缀
   * @param {string}  modifiedFile.basename - 文件名
   * @param {string}  modifiedFile.realpath - 文件物理地址
   * @param {string}  modifiedFile.realpathNoExt - 文件物理地址，没有后缀
   * @param {string}  modifiedFile.subpath - 文件基于项目 root 的绝对路径
   * @param {string}  modifiedFile.subdirname - 文件基于项目 root 的绝对路径，仅文件夹目录
   * @param {string}  modifiedFile.subpathNoExt - 文件基于项目 root 的绝对路径，没有后缀
   * @param {string | boolean}  modifiedFile.release - 文件的发布路径，当值为 false 时，文件不会发布
   *
   * @example
   *
   * [{
   *   "ext": ".fileExt",
   *   "filename": "fileName",
   *   "basename": "fileName.fileExt",
   *   "realpath": "/projectRootPath/fileParentDirPath/fileName.fileExt",
   *   "realpathNoExt": "/projectRootPath/fileParentDirPath/fileName",
   *   "subpath": "/fileParentDirPath/fileName.fileExt",
   *   "subdirname": "/fileParentDirPath",
   *   "subpathNoExt": "/fileParentDirPath/fileName",
   *   "release": "/fileParentDirPath/fileName.fileExt",
   * }...]
   */
  forEach(modified, (modifiedFile) => {
    if (
      modifiedFile.release &&
      (
        // 如果没有过滤的正则，则依据`isHtmlLike`来鉴别
        (!isTemplatePatternGlobVerified) ?
          modifiedFile.isHtmlLike :
          // eslint-disable-next-line no-undef
          fis.util.glob(templatePattern, modifiedFile.subpath)
      ) &&
      (
        isIgnorePatternGlobVerified &&
        // eslint-disable-next-line no-undef
        !fis.util.glob(ignorePattern, modifiedFile.subpath)
      )
    ) {
      const fileContent = modifiedFile.getContent();
      modifiedFile.setContent(minify(fileContent, minifyOptions));
    }
  });

  // 由于是异步的如果后续还需要执行必须调用 fisDeployNextEvent
  fisDeployNextEvent();
};
