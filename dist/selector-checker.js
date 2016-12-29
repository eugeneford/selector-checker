"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and associated documentation files (the "Software"), to deal in the Software without restriction,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to the following conditions:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The above copyright notice and this permission notice shall be included in all copies or substantial
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _selectorTokenizer = require("selector-tokenizer");

var _selectorTokenizer2 = _interopRequireDefault(_selectorTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_SELECTOR = "type";
var CLASS_SELECTOR = "class";
var ATTRIBUTE_SELECTOR = "attribute";
var UNIVERSAL_SELECTOR = "universal";
var PSEUDO_SELECTOR = "pseudo";
var DESCENDANT_COMBINATOR = "descendant";
var ADJACENT_SIBLING_COMBINATOR = "adjacent-sibling";
var GENERAL_SIBLING_COMBINATOR = "general-sibling";
var CHILD_COMBINATOR = "child";
var SCOPE_STARTING_POINT = "scope-start";
var SCOPE_ENDING_POINT = "scope-end";

var OPEN_SQUARE = "[".charCodeAt(0);
var CLOSE_SQUARE = "]".charCodeAt(0);
var WHITESPACE = " ".charCodeAt(0);
var ASTERISK = "*".charCodeAt(0);
var CARET = "^".charCodeAt(0);
var VERTICAL_LINE = "|".charCodeAt(0);
var TILDE = "~".charCodeAt(0);
var DOLLAR = "$".charCodeAt(0);
var EQUALS = "=".charCodeAt(0);
var SINGLE_QUOTE = "\'".charCodeAt(0);
var DOUBLE_QUOTE = "\"".charCodeAt(0);
var SLASH = "\\".charCodeAt(0);
var I_CODE = "i".charCodeAt(0);

/**
 * @returns {boolean}
 */
var CF_WORD = function CF_WORD(code) {
  return code >= 128 || code === 45 || code == 245 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
};

/**
 * The selector checker allows to match a specified DOM element with target css selector.
 * This module should be useful for custom element state matching eg. :hover, :focus etc.
 *
 * The following example illustrates the principle the SelectorChecker.check method
 * @example
 * checker = new SelectorChecker();
 * element = document.getElementById("target"); //=> <h1 class="heading-1">...</h1>
 * matches = checker.check(element, "h1");
 * matches   //=> true
 */

var SelectorChecker = function () {
  function SelectorChecker() {
    _classCallCheck(this, SelectorChecker);

    this.tokenizer = new _selectorTokenizer2.default();
  }

  /**
   * Check if element is a first child of its parent
   * @param element
   * @returns {boolean}
   */


  _createClass(SelectorChecker, [{
    key: "isFirstChild",
    value: function isFirstChild(element) {
      return element.parentElement && element.parentElement.children[0] === element;
    }

    /**
     * Check if element is a first child of its parent
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isLastChild",
    value: function isLastChild(element) {
      return element.parentElement && element.parentElement.children[element.parentElement.children.length - 1] === element;
    }

    /**
     * Check if element is in indeterminate state
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isIndeterminate",
    value: function isIndeterminate(element) {
      var group = void 0,
          i = void 0;
      // Any <input type="checkbox"> element whose indeterminate DOM property is set to true by JavaScript
      if (element.tagName === "INPUT" && element.getAttribute("type") === "checkbox") {
        return element.indeterminate === true;
      }
      // <input type="radio"> elements whose radio button group's radio buttons are all unchecked
      else if (element.tagName === "INPUT" && element.getAttribute("type") === "radio") {
          if (group = element.getAttribute("name")) {
            group = element.ownerDocument.querySelectorAll("input[type=\"radio\"][name=\"" + group + "\"]");
            for (i = 0; i < group.length; i++) {
              if (group[i].checked) return false;
            }
          }
          return element.checked === false;
        }
        // <progress> elements in an indeterminate state
        else if (element.tagName === "PROGRESS") {
            return !element.hasAttribute("value");
          }
      // Otherwise, return false
      return false;
    }

    /**
     * Check if element is has checked state
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isChecked",
    value: function isChecked(element) {
      var type = element.getAttribute("type");
      if (element.tagName === "INPUT" && (type = type.toLowerCase() === "checkbox" || type === "radio")) {
        return element.checked === true;
      } else if (element.tagName === "OPTION") {
        return element.selected === true;
      }
      return false;
    }

    /**
     * Check if element is actually disabled
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isDisabled",
    value: function isDisabled(element) {
      var elements = ["button", "input", "select", "textarea", "optgroup", "option", "menuitem", "fieldset"];

      if (elements.indexOf(element.tagName.toLowerCase()) > -1) {
        return element.disabled === true;
      }

      return false;
    }

    /**
     * Check if element is actually enabled
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isEnabled",
    value: function isEnabled(element) {
      return this.isDisabled(element) !== true;
    }

    /**
     * Check if element is actually empty
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(element) {
      return element.childNodes.length === 0;
    }

    /**
     * Check if element is actually first of type
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isFirstOfType",
    value: function isFirstOfType(element) {
      var elem = element;
      while (elem = elem.previousElementSibling) {
        if (elem.tagName === element.tagName) return false;
      }
      return true;
    }

    /**
     * Check if element is actually last of type
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isLastOfType",
    value: function isLastOfType(element) {
      var elem = element;
      while (elem = elem.nextElementSibling) {
        if (elem.tagName === element.tagName) return false;
      }
      return true;
    }

    /**
     * Check if element is actually the only child of its parent
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isOnlyChild",
    value: function isOnlyChild(element) {
      return this.isFirstChild(element) && this.isLastChild(element);
    }

    /**
     * Check if element is actually the only element of its type in parent
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isOnlyOfType",
    value: function isOnlyOfType(element) {
      return this.isFirstOfType(element) && this.isLastOfType(element);
    }

    /**
     * Check if element is actually required
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isRequired",
    value: function isRequired(element) {
      var elements = ["input", "select", "textarea"];
      return elements.indexOf(element.tagName.toLowerCase()) > -1 && element.hasAttribute("required");
    }

    /**
     * Check if element is actually optional
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isOptional",
    value: function isOptional(element) {
      var elements = ["input", "select", "textarea"];
      return elements.indexOf(element.tagName.toLowerCase()) > -1 && !element.hasAttribute("required");
    }

    /**
     * Check if element is actually a read-write element
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isReadWrite",
    value: function isReadWrite(element) {
      var types = ["text", "email", "date", "time", "url", "search", "number", "week", "month", "tel"],
          type = element.getAttribute("type");

      if (element.tagName === "TEXTAREA") {
        return !element.hasAttribute("readonly");
      } else if (element.tagName === "INPUT") {
        if (type && types.indexOf(type.toLowerCase()) === -1) {
          return false;
        }
        return !element.hasAttribute("readonly");
      }
      return element.hasAttribute("contenteditable");
    }

    /**
     * Check if element is actually a read-only element
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isReadOnly",
    value: function isReadOnly(element) {
      return this.isReadWrite(element) === false;
    }

    /**
     * Check if element is actually a document root element
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isRoot",
    value: function isRoot(element) {
      return element.ownerDocument.documentElement === element;
    }

    /**
     * Check if element is actually a document target element
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isTarget",
    value: function isTarget(element) {
      return element.hasAttribute("id") && "#" + element.getAttribute("id") === element.ownerDocument.location.hash;
    }

    /**
     * Check if element is actually out of range
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isOutOfRange",
    value: function isOutOfRange(element) {
      var types = ["number", "range", "date", "datetime", "datetime-local", "month", "time", "week"],
          type = void 0,
          min = void 0,
          max = void 0,
          value = void 0,
          isOut = false;
      if (element.tagName === "INPUT") {
        type = element.getAttribute("type");
        value = element.getAttribute("value");
        min = element.getAttribute("min");
        max = element.getAttribute("max");

        if (type && types.indexOf(type.toLowerCase()) > -1 && (min || max)) {
          switch (type) {
            case "number":
            case "range":
              value = !!value ? parseFloat(value) : undefined;
              min = !!min ? parseFloat(min) : undefined;
              max = !!max ? parseFloat(max) : undefined;
              break;

            case "month":
            case "date":
              value = !!value ? new Date(value).getTime() : undefined;
              min = !!min ? new Date(min).getTime() : undefined;
              max = !!max ? new Date(max).getTime() : undefined;
              break;

            case "week":
              value = !!value ? value.split("-W") : undefined;
              value = value ? new Date(parseInt(value[0], 10), 0, 1 + (parseInt(value[1], 10) - 1) * 7) : undefined;

              min = !!min ? min.split("-W") : undefined;
              min = min ? new Date(parseInt(min[0], 10), 0, 1 + (parseInt(min[1], 10) - 1) * 7) : undefined;

              max = !!max ? max.split("-W") : undefined;
              max = max ? new Date(parseInt(max[0], 10), 0, 1 + (parseInt(max[1], 10) - 1) * 7) : undefined;
              break;

            case "datetime-local":
            case "datetime":
              break;

            case "time":
              break;
          }

          if (isNaN(value) || isNaN(min) && isNaN(max)) return undefined;

          if (!isNaN(min)) isOut = min > value;

          if (!isOut && !isNaN(max)) isOut = value > max;

          return isOut;
        }
      }
      return undefined;
    }

    /**
     * Check if specified tagName matches element
     * @param element
     * @param tagName
     * @returns {boolean}
     */

  }, {
    key: "matchTagName",
    value: function matchTagName(element, tagName) {
      return element.tagName.toLowerCase() === tagName.toLowerCase();
    }

    /**
     * Check if specified tagName matches
     * @param element
     * @param className
     */

  }, {
    key: "matchClassName",
    value: function matchClassName(element, className) {
      return element.getAttribute("class").split(/\s+/).indexOf(className.substr(1)) > -1;
    }

    /**
     * Check if specified attribute value matches target element
     * @param element
     * @param value
     * @returns {boolean}
     */

  }, {
    key: "matchAttribute",
    value: function matchAttribute(element, value) {
      var tokens = this.splitAttributeToken(value),
          elementValue = void 0,
          i = void 0;

      switch (tokens.length) {
        // Proceed with [attr] case
        case 1:
          return element.hasAttribute(tokens[0]);
          break;

        // TODO: Update this fragment on CSS4 Spec release
        // Proceed with [attr operator value] or [attr operator value i] case
        case 3:
        case 4:
          // Process element by attribute operator type
          switch (tokens[1]) {
            case "=":
              return element.getAttribute(tokens[0]).toLowerCase() === tokens[2].toLowerCase();
              break;
            case "~=":
              if (elementValue = element.getAttribute(tokens[0])) {
                elementValue = elementValue.split(/\s+/);
                for (i = 0; i < elementValue.length; i++) {
                  if (elementValue[i].toLowerCase() === tokens[2].toLowerCase()) return true;
                }
              }
              return false;
              break;
            case "|=":
              if (elementValue = element.getAttribute(tokens[0])) {
                elementValue = elementValue.split(/\s+/);
                if (elementValue[0].toLowerCase() === tokens[2].toLowerCase() || elementValue[0].toLowerCase().indexOf(tokens[2].toLowerCase() + "-") === 0) return true;
              }
              return false;
              break;
            case "^=":
              if (elementValue = element.getAttribute(tokens[0])) {
                elementValue = elementValue.split(/\s+/);
                if (elementValue[0].toLowerCase().indexOf("" + tokens[2].toLowerCase()) === 0) return true;
              }
              break;
            case "$=":
              if (elementValue = element.getAttribute(tokens[0])) {
                elementValue = elementValue.split(/\s+/);
                if (elementValue[elementValue.length - 1].toLowerCase().indexOf("" + tokens[2].toLowerCase()) === elementValue[elementValue.length - 1].length - tokens[2].length) return true;
              }
              break;
            case "*=":
              return element.getAttribute(tokens[0]).toLowerCase().indexOf(tokens[2].toLowerCase()) > -1;
              break;
            default:
              throw new Error("Parse error on " + value);
          }

          break;
        default:
          throw new Error("Parse error on " + value);
      }

      return false;
    }

    /**
     * Check if specified element matches target pseudo selector
     * @param element
     * @param value
     * @param statesMap - optional map of elements with forced interactive states (:hover, :focus, :active, :visited)
     * @returns {boolean}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchPseudoSelector",
    value: function matchPseudoSelector(element, value, statesMap) {
      switch (value) {
        case ":first-child":
          return this.isFirstChild(element);
        case ":last-child":
          return this.isLastChild(element);
        case ":indeterminate":
          return this.isIndeterminate(element);
        case ":checked":
          return this.isChecked(element);
        case ":disabled":
          return this.isDisabled(element);
        case ":enabled":
          return this.isEnabled(element);
        case ":empty":
          return this.isEmpty(element);
        case ":first-of-type":
          return this.isFirstOfType(element);
        case ":last-of-type":
          return this.isLastOfType(element);
        case ":only-child":
          return this.isOnlyChild(element);
        case ":only-of-type":
          return this.isOnlyOfType(element);
        case ":required":
          return this.isRequired(element);
        case ":optional":
          return this.isOptional(element);
        case ":read-only":
          return this.isReadOnly(element);
        case ":read-write":
          return this.isReadWrite(element);
        case ":root":
          return this.isRoot(element);
        case ":target":
          return this.isTarget(element);
        case ":out-of-range":
          return this.isOutOfRange(element);

        // TODO: Add in feature releases
        case ":any":
        case ":dir":
        case ":default":
        case ":first":
        case ":fullscreen":
        case ":scope":
          return undefined;

        default:
          throw new TypeError("Unexpected pseudo " + value + " to match");
      }
    }

    /**
     * Check if specified element matches target token
     * @param element
     * @param token
     * @param statesMap - optional map of elements with forced interactive states (:hover, :focus, :active, :visited)
     * @returns {boolean}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchSelectorToken",
    value: function matchSelectorToken(element, token, statesMap) {
      switch (token.type) {
        case TYPE_SELECTOR:
          return this.matchTagName(element, token.value);

        case CLASS_SELECTOR:
          return this.matchClassName(element, token.value);

        case UNIVERSAL_SELECTOR:
          return true;

        case ATTRIBUTE_SELECTOR:
          return this.matchAttribute(element, token.value);

        case PSEUDO_SELECTOR:
          return this.matchPseudoSelector(element, token.value);

        default:
          throw new TypeError("Unexpected token " + token + " to match");
      }
    }

    /**
     * Split an attribute token on attr, operand and value
     * @param value
     * @returns {Array}
     */

  }, {
    key: "splitAttributeToken",
    value: function splitAttributeToken(value) {
      var attr = void 0,
          val = void 0,
          type = void 0,
          nextCode = void 0,
          i = void 0,
          size = void 0,
          start = void 0,
          quotes = void 0,
          ignore = void 0,
          result = [];

      for (i = 0; i < value.length; i++) {
        nextCode = value.charCodeAt(i);

        // Tokenize attribute
        if (!attr && CF_WORD(nextCode)) {
          start = i;
          size = 0;
          while (CF_WORD(nextCode)) {
            size++;
            nextCode = value.charCodeAt(++i);
          }

          result.push(attr = value.substr(start, size));
        }

        // Tokenize operation type
        if (!type && (nextCode === CARET || nextCode === ASTERISK || nextCode === VERTICAL_LINE || nextCode === DOLLAR || nextCode === EQUALS || nextCode === TILDE)) {
          if (nextCode === EQUALS) {
            result.push(type = value[i]);
          } else if (value.charCodeAt(i + 1) !== EQUALS) {
            throw new SyntaxError("Unexpected character " + value[i + 1] + " at " + i);
          } else {
            result.push(type = value[i] + value[++i]);
          }
        }

        // Tokenize value
        if (!val && (CF_WORD(nextCode) || nextCode === SINGLE_QUOTE || nextCode === DOUBLE_QUOTE)) {
          size = 0;
          if (nextCode === SINGLE_QUOTE || nextCode === DOUBLE_QUOTE) {
            start = ++i;
            quotes = nextCode;

            nextCode = value.charCodeAt(i);

            while (nextCode && nextCode !== quotes) {
              size++;
              nextCode = value.charCodeAt(++i);
            }
          } else {
            start = i;
            while (CF_WORD(nextCode)) {
              size++;
              nextCode = value.charCodeAt(++i);
            }
          }

          result.push(val = value.substr(start, size));
        }

        // Tokenize ignore case flag
        if (!ignore && nextCode === I_CODE) {
          if (!CF_WORD(value.charCodeAt(i + 1))) {
            result.push(ignore = value[i]);
            break;
          }
        }
      }

      return result;
    }

    /**
     * Check if specified element matches target css selector
     * @param element
     * @param selector
     * @param statesMap - optional map of elements with forced interactive states (:hover, :focus, :active, :visited)
     * @returns {boolean}
     *
     * @example
     * checker = new SelectorChecker();
     * element = document.getElementById("target"); //=> <h1 class="heading-1">...</h1>
     * matches = checker.check(element, "h1");
     * matches   //=> true
     */

  }, {
    key: "check",
    value: function check(element, selector, statesMap) {
      var tokens = this.tokenizer.tokenize(selector),
          token = void 0,
          i = void 0,
          attrs = void 0,
          matches = void 0,
          elem = element;

      // While has next token
      while (token = tokens.pop()) {
        matches = this.matchSelectorToken(elem, token, statesMap);

        // Stop looping on first mismatch
        if (!matches) {
          return false;
        }
      }

      return true;
    }
  }]);

  return SelectorChecker;
}();

exports.default = SelectorChecker;