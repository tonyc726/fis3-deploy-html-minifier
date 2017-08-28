'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _htmlMinifier = require('html-minifier');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
  templatePattern: '',
  ignorePattern: ''
};

exports.default = function (options, modified, total, fisDeployNextEvent) {
  var config = (0, _merge3.default)(DEFAULT_CONFIG, options);
  var templatePattern = config.templatePattern,
      ignorePattern = config.ignorePattern,
      minifyOptions = (0, _objectWithoutProperties3.default)(config, ['templatePattern', 'ignorePattern']);

  var isTemplatePatternVerified = !(0, _isEmpty3.default)(templatePattern);
  var isIgnorePatternVerified = !(0, _isEmpty3.default)(ignorePattern);

  (0, _forEach3.default)(modified, function (modifiedFile) {
    if (modifiedFile.release && (!isTemplatePatternVerified ? modifiedFile.isHtmlLike : fis.util.glob(templatePattern, modifiedFile.subpath)) && (!isIgnorePatternVerified || isIgnorePatternVerified && !fis.util.glob(ignorePattern, modifiedFile.subpath))) {
      var fileContent = modifiedFile.getContent();
      modifiedFile.setContent((0, _htmlMinifier.minify)(fileContent, minifyOptions));
    }
  });

  fisDeployNextEvent();
};

module.exports = exports['default'];