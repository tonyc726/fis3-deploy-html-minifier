"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _htmlMinifier = require("html-minifier");

const DEFAULT_CONFIG = {
  templatePattern: '',
  ignorePattern: ''
};

var _default = (options, modified, total, fisDeployNextEvent) => {
  const config = (0, _merge2.default)(DEFAULT_CONFIG, options);
  const templatePattern = config.templatePattern,
        ignorePattern = config.ignorePattern,
        minifyOptions = (0, _objectWithoutProperties2.default)(config, ["templatePattern", "ignorePattern"]);
  const isTemplatePatternVerified = !(0, _isEmpty2.default)(templatePattern);
  const isIgnorePatternVerified = !(0, _isEmpty2.default)(ignorePattern);
  (0, _forEach2.default)(modified, modifiedFile => {
    if (modifiedFile.release && (!isTemplatePatternVerified ? modifiedFile.isHtmlLike : fis.util.glob(templatePattern, modifiedFile.subpath)) && (!isIgnorePatternVerified || isIgnorePatternVerified && !fis.util.glob(ignorePattern, modifiedFile.subpath))) {
      const fileContent = modifiedFile.getContent();
      modifiedFile.setContent((0, _htmlMinifier.minify)(fileContent, minifyOptions));
    }
  });
  fisDeployNextEvent();
};

exports.default = _default;
module.exports = exports.default;