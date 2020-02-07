"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var interpolate = function interpolate(cache, text, regex, submit, replace) {
  regex.lastIndex = 0;
  var index = 0,
      match;

  while ((match = regex.exec(text)) != null) {
    var slot = match[0];
    if (!cache.hasOwnProperty(slot)) cache[slot] = replace(slot);
    submit(text.substring(index, match.index), cache[slot]);
    index = match.index + slot.length;
  }

  return text.substring(index);
};

var wrapWithReplacer = function wrapWithReplacer(_ref) {
  var replace = _ref.replace,
      regex = _ref.regex,
      _ref$cache = _ref.cache,
      cache = _ref$cache === void 0 ? {} : _ref$cache,
      base = _ref.base;
  return function (Component) {
    return function () {
      var prevLiterals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var literals = [],
          tags = [];

      var submit = function submit(a, b) {
        literals.push(a);
        tags.push(b);
      };

      for (var i = 0; i < prevLiterals.length; i++) {
        var text = prevLiterals[i];
        var remainder = interpolate(cache, text, regex, submit, replace);
        submit(remainder, i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      }

      return base(Component).apply(void 0, [literals].concat(tags));
    };
  };
};

var _default = wrapWithReplacer;
exports["default"] = _default;