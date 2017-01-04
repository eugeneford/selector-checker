(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /**
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
     * @returns {boolean|undefined}
     */

  }, {
    key: "isOutOfRange",
    value: function isOutOfRange(element) {
      var types = ["number", "range", "date", "datetime", "datetime-local", "month", "time", "week"],
          type = void 0,
          min = void 0,
          max = void 0;
      if (element.tagName === "INPUT" && element.validity) {
        type = element.getAttribute("type");
        min = element.getAttribute("min");
        max = element.getAttribute("max");

        if (type && types.indexOf(type.toLowerCase()) > -1 && (min || max)) {
          return element.validity.rangeOverflow || element.validity.rangeUnderflow;
        }
      }
      return undefined;
    }

    /**
     * Check if element is actually in range
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isInRange",
    value: function isInRange(element) {
      var types = ["number", "range", "date", "datetime", "datetime-local", "month", "time", "week"],
          type = void 0,
          min = void 0,
          max = void 0;
      if (element.tagName === "INPUT" && element.validity) {
        type = element.getAttribute("type");
        min = element.getAttribute("min");
        max = element.getAttribute("max");

        if (type && types.indexOf(type.toLowerCase()) > -1 && (min || max)) {
          return !element.validity.rangeOverflow && !element.validity.rangeUnderflow;
        }
      }
      return undefined;
    }

    /**
     * Check if element is actually invalid
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isInvalid",
    value: function isInvalid(element) {
      return element.validity ? element.validity.valid === false : false;
    }

    /**
     * Check if element is actually valid
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid(element) {
      return element.validity ? element.validity.valid === true : false;
    }

    /**
     * Checks if element is matching a target lang
     * @param element
     * @param params
     * @returns {boolean}
     */

  }, {
    key: "isLang",
    value: function isLang(element, params) {
      if (params && params.length === 1 && params[0].type === "type") {
        var elem = element,
            lang = void 0;
        while (elem) {
          if (lang = elem.getAttribute("lang")) {
            if ((lang = lang.toLowerCase()) === params[0].value.toLowerCase() || lang.indexOf(params[0].value.toLowerCase() + "-") === 0) {
              return true;
            }
          }
          elem = elem.parentElement;
        }
      }
      return false;
    }

    /**
     * Check if element is actually not matching target param
     * @param element
     * @param params
     */

  }, {
    key: "isNot",
    value: function isNot(element, params) {
      if (params && params.length === 1) {
        return this.matchSelectorToken(element, params[0]) === false;
      }
      return false;
    }

    /**
     * Check if element is actually an nth child of its parent
     * @param element
     * @param params
     * @returns {boolean}
     */

  }, {
    key: "isNthChild",
    value: function isNthChild(element, params, inverseFlag) {
      if (params && params.length) {
        var parent = element.parentElement,
            index = void 0,
            a = void 0,
            b = void 0,
            length = parent.childNodes.length,
            n = 0;

        switch (params.length) {
          case 3:
            if (params[2].value[params[2].value.length - 1] !== "n") return false;
            a = parseInt(params[2].value, 10) || (params[2].value[0] === "-" ? -1 : 1);
            b = parseInt(params[0].value, 10) || 0;
            break;
          case 1:
            if (params[0].value.toLowerCase() === "odd") {
              a = 2;
              b = 1;
            } else if (params[0].value.toLowerCase() === "even") {
              a = 2;
              b = 0;
            } else if ((index = params[0].value.indexOf("-")) > 0) {
              a = parseInt(params[0].value.substring(0, index), 10) || 1;
              b = parseInt(params[0].value.substring(index), 10) || 0;
            } else if (params[0].value[params[0].value.length - 1] === "n") {
              a = parseInt(params[0].value, 10) || (params[0].value[0] === "-" ? -1 : 1);
              b = 0;
            } else {
              a = 0;
              b = parseInt(params[0].value, 10);
            }
            break;
          default:
            return false;
        }

        if (isNaN(a) || isNaN(b)) return false;

        if (a) {
          while (n < length) {
            index = a * n + b;
            if (parent.childNodes[inverseFlag ? length - index : index - 1] === element) return true;
            n = n + 1;
          }
        } else {
          return parent.childNodes[inverseFlag ? length - b : b - 1] === element;
        }
      }
      return false;
    }

    /**
     * Check if element is actually an nth last child of its parent
     * @param element
     * @param params
     * @returns {boolean}
     */

  }, {
    key: "isNthLastChild",
    value: function isNthLastChild(element, params) {
      return this.isNthChild(element, params, true);
    }

    /**
     * Check if element is actually an nth of type of its parent
     * @param element
     * @param params
     * @returns {boolean}
     */

  }, {
    key: "isNthOfType",
    value: function isNthOfType(element, params, inverseFlag) {
      if (params && params.length) {
        var parent = element.parentElement,
            index = void 0,
            a = void 0,
            b = void 0,
            n = 0,
            nodes = void 0,
            i = void 0;

        switch (params.length) {
          case 3:
            if (params[2].value[params[2].value.length - 1] !== "n") return false;
            a = parseInt(params[2].value, 10) || (params[2].value[0] === "-" ? -1 : 1);
            b = parseInt(params[0].value, 10) || 0;
            break;
          case 1:
            if (params[0].value.toLowerCase() === "odd") {
              a = 2;
              b = 1;
            } else if (params[0].value.toLowerCase() === "even") {
              a = 2;
              b = 0;
            } else if ((index = params[0].value.indexOf("-")) > 0) {
              a = parseInt(params[0].value.substring(0, index), 10) || 1;
              b = parseInt(params[0].value.substring(index), 10) || 0;
            } else if (params[0].value[params[0].value.length - 1] === "n") {
              a = parseInt(params[0].value, 10) || (params[0].value[0] === "-" ? -1 : 1);
              b = 0;
            } else {
              a = 0;
              b = parseInt(params[0].value, 10);
            }
            break;
          default:
            return false;
        }

        if (isNaN(a) || isNaN(b)) return false;

        // Filter node of type
        nodes = [];
        for (i = 0; i < parent.childNodes.length; i++) {
          if (parent.childNodes[i].tagName === element.tagName) {
            nodes.push(parent.childNodes[i]);
          }
        }

        // Check if element is a nth of its parent
        if (a) {
          while (n < nodes.length) {
            index = a * n + b;
            if (nodes[inverseFlag ? nodes.length - index : index - 1] === element) return true;
            n = n + 1;
          }
        } else {
          return nodes[inverseFlag ? nodes.length - b : b - 1] === element;
        }
      }
      return false;
    }

    /**
     * Check if element is actually an nth of type of its parent
     * @param element
     * @param params
     * @returns {boolean}
     */

  }, {
    key: "isNthLastOfType",
    value: function isNthLastOfType(element, params) {
      return this.isNthOfType(element, params, true);
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
     * @param params - a set of any additional params tokenized inside tokenization scopes
     * @returns {boolean|undefined}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchPseudoSelector",
    value: function matchPseudoSelector(element, value, statesMap, params) {
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
        case ":in-range":
          return this.isInRange(element);
        case ":invalid":
          return this.isInvalid(element);
        case ":valid":
          return this.isValid(element);
        case ":lang":
          return this.isLang(element, params);
        case ":not":
          return this.isNot(element, params);
        case ":nth-child":
          return this.isNthChild(element, params);
        case ":nth-last-child":
          return this.isNthLastChild(element, params);
        case ":nth-of-type":
          return this.isNthOfType(element, params);
        case ":nth-last-of-type":
          return this.isNthLastOfType(element, params);

        // TODO: Add in feature releases
        case ":any":
        case ":dir":
        case ":default":
        case ":first":
        case ":fullscreen":
        case ":scope":
          return false;

        // Ignore all other pseudo-classes and pseudo-elements
        default:
          return false;
      }
    }

    /**
     * Check if specified element matches target token
     * @param element
     * @param token
     * @param statesMap - optional map of elements with forced interactive states (:hover, :focus, :active, :visited)
     * @param params - a set of any additional params tokenized inside tokenization scopes
     * @returns {boolean}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchSelectorToken",
    value: function matchSelectorToken(element, token, statesMap, params) {
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
          return this.matchPseudoSelector(element, token.value, statesMap, params);

        default:
          throw new TypeError("Unexpected token " + token.value + " to match");
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
          params = void 0,
          matches = void 0,
          elem = element;

      // While has next token
      while (token = tokens.pop()) {

        if (token.type === SCOPE_ENDING_POINT) {
          params = [];
          while ((token = tokens.pop()).type !== SCOPE_STARTING_POINT) {
            params.push(token);
          }

          // Read token which is starting a scope
          token = tokens.pop();

          matches = this.matchSelectorToken(elem, token, statesMap, params);
        } else {
          matches = this.matchSelectorToken(elem, token, statesMap);
        }

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

},{"selector-tokenizer":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
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

var WHITESPACE = ' '.charCodeAt(0);
var SINGLE_QUOTE = '\"'.charCodeAt(0);
var DOUBLE_QUOTE = '\''.charCodeAt(0);
var SLASH = '\\'.charCodeAt(0);
var HASH = '#'.charCodeAt(0);
var OPEN_PARENTHESES = '('.charCodeAt(0);
var CLOSE_PARENTHESES = ')'.charCodeAt(0);
var ASTERISK = '*'.charCodeAt(0);
var PLUS_SIGN = '+'.charCodeAt(0);
var DOT_SIGN = '.'.charCodeAt(0);
var COLON = ':'.charCodeAt(0);
var RIGHT_ANGLE = '>'.charCodeAt(0);
var OPEN_SQUARE = '['.charCodeAt(0);
var CLOSE_SQUARE = ']'.charCodeAt(0);
var TILDE = '~'.charCodeAt(0);
var EQUAL_SIGN = '='.charCodeAt(0);

/**
 * @returns {boolean}
 */
var CF_WORD = function CF_WORD(code) {
  return code >= 128 || code === 45 || code == 245 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
};

/**
 * The selector tokenizer allows to break a css selector string into set of tokens.
 * The tokenization method is based on a set of lexer grammars rules. The full list of
 * available token types is next:
 *
 * <type-selector> - for basic type selectors eg. "article", "h1", "p" etc.
 * <class-selector> - for basic class selectors eg. ".button", ".post", etc.
 * <universal-selector> - for basic universal selector "*"
 * <attribute-selector> - for basic attribute selectors eg. "[attr]", "[attr=val]", "[attr^=val]" etc.
 * <pseudo-selector> - for pseudo-element and pseudo-class-selectors eg. ":first-child", "::first-letter"
 * <descendat-selector> - for selector's descendant combinator " "
 * <adjacent-sibling-selector> - for selector's adjacent sibling combinator "+"
 * <general-sibling-selector> - for selector's general sibling combinator "~"
 * <child-selector> - for selector's child combinator ">"
 *
 * The following example illustrates the principle the SelectorTokenizer.tokenize method
 * @example
 * tokens = tokenizer.tokenize(".page main");
 * tokens   //=> [{type: "class", value: ".page"}, {type: "type", value: "main"}]
 */

var SelectorTokenizer = function () {
  function SelectorTokenizer() {
    _classCallCheck(this, SelectorTokenizer);
  }

  /**
   * Get token type based on one charCode only
   * @param startCode
   * @returns {string}
   *
   * @throws SyntaxError - if target char code was not found in grammar
   *
   * @example
   * type = checker.getInitialTokenType(32);
   * type   //=> "descendant"
   */


  _createClass(SelectorTokenizer, [{
    key: 'getInitialTokenType',
    value: function getInitialTokenType(startCode) {
      // Find target startCode in grammar
      switch (startCode) {
        case WHITESPACE:
          return "descendant";
        case HASH:
          return "id";
        case OPEN_PARENTHESES:
          return "scope-start";
        case CLOSE_PARENTHESES:
          return "scope-end";
        case ASTERISK:
          return "universal";
        case PLUS_SIGN:
          return "adjacent-sibling";
        case DOT_SIGN:
          return "class";
        case COLON:
          return "pseudo";
        case RIGHT_ANGLE:
          return "child";
        case OPEN_SQUARE:
          return "attribute";
        case TILDE:
          return "general-sibling";
        default:
          if (CF_WORD(startCode)) return "type";
          break;
      }
      // Or throw a syntax error
      throw new SyntaxError('Unexpected character "' + String.fromCharCode(startCode) + '"');
    }

    /**
     * Get a token type update for more specificity with additional 3 char codes
     * NOTE: use this method to update toke type only. Use {getInitialTokenType} method
     * to get initial type of target token
     * @param firstCode
     * @param nextCode
     * @param secondCode
     * @returns {string|undefined}
     *
     * @example
     * type = checker.getInitialTokenType(32);
     * type   //=> "descendant"
     * type = checker.getLazyTokenType(32,41);
     * type   //=> "scope-end"
     */

  }, {
    key: 'getLazyTokenType',
    value: function getLazyTokenType(firstCode, nextCode, secondCode) {
      // Change token type if lazy <scope-ending-point> was spotted
      if (nextCode === CLOSE_PARENTHESES && firstCode === WHITESPACE) return "scope-end";

      // Change token type if lazy <adjacent-sibling-selector> was spotted
      else if (nextCode === PLUS_SIGN && firstCode === WHITESPACE) return "adjacent-sibling";

        // Change token type if lazy <child-selector> was spotted
        else if (nextCode === RIGHT_ANGLE && firstCode === WHITESPACE) return "child";

          // Change token type if lazy <general-sibling-selector> was spotted
          else if (nextCode === TILDE && firstCode === WHITESPACE) return "general-sibling";

      return undefined;
    }

    /**
     * Check for <descendant-selector> token bounds
     * @param firstCode
     * @param nextCode
     * @param wasBracesOpened
     * @returns {boolean}
     */

  }, {
    key: 'isDescendantBounds',
    value: function isDescendantBounds(firstCode, nextCode, wasBracesOpened) {
      return !wasBracesOpened && nextCode === WHITESPACE && firstCode !== WHITESPACE && firstCode !== PLUS_SIGN && firstCode !== RIGHT_ANGLE && firstCode !== TILDE;
    }

    /**
     * Check for <id-selector> token bounds
     * @param firstCode
     * @returns {boolean}
     */

  }, {
    key: 'isIdBounds',
    value: function isIdBounds(firstCode) {
      return firstCode === HASH;
    }

    /**
     * Check for <scope-starting-point> bounds
     * @param firstCode
     * @returns {boolean}
     */

  }, {
    key: 'isScopeStartBounds',
    value: function isScopeStartBounds(firstCode) {
      return firstCode === OPEN_PARENTHESES;
    }

    /**
     * Check for <scope-ending-point> bounds
     * @param firstCode
     * @param nextCode
     * @returns {boolean}
     */

  }, {
    key: 'isScopeEndBounds',
    value: function isScopeEndBounds(firstCode, nextCode) {
      return nextCode === CLOSE_PARENTHESES && firstCode !== WHITESPACE;
    }

    /**
     * Check for <universal-selector> bounds
     * @param firstCode
     * @param nextCode
     * @returns {boolean}
     */

  }, {
    key: 'isUniversalBounds',
    value: function isUniversalBounds(firstCode, nextCode) {
      return firstCode === ASTERISK && nextCode !== EQUAL_SIGN;
    }

    /**
     * Check for <adjacent-sibling-selector> bounds
     * @param firstCode
     * @param nextCode
     * @returns {boolean}
     */

  }, {
    key: 'isAdjacentSiblingBounds',
    value: function isAdjacentSiblingBounds(firstCode, nextCode) {
      return nextCode === PLUS_SIGN && firstCode !== WHITESPACE;
    }

    /**
     * Check for <class-selector> bounds
     * @param firstCode
     * @returns {boolean}
     */

  }, {
    key: 'isClassBounds',
    value: function isClassBounds(firstCode) {
      return firstCode === DOT_SIGN;
    }

    /**
     * Check for <pseudo-selector> bounds
     * @param firstCode
     * @param nextCode
     * @returns {boolean}
     */

  }, {
    key: 'isPseudoBounds',
    value: function isPseudoBounds(firstCode, nextCode) {
      return nextCode === COLON && firstCode !== COLON;
    }

    /**
     * Check for <child-selector> bounds
     * @param firstCode
     * @returns {boolean}
     */

  }, {
    key: 'isChildBounds',
    value: function isChildBounds(firstCode, nextCode) {
      return nextCode === RIGHT_ANGLE && firstCode !== WHITESPACE;
    }

    /**
     * Check for <attribute-selector> bounds
     * @param firstCode
     * @returns {boolean}
     */

  }, {
    key: 'isAttributeBounds',
    value: function isAttributeBounds(firstCode) {
      return firstCode === OPEN_SQUARE;
    }

    /**
     * Check for <general-sibling-selector> bounds
     * @param firstCode
     * @param nextCode
     * @param secondCode
     * @returns {boolean}
     */

  }, {
    key: 'isGeneralSiblingBounds',
    value: function isGeneralSiblingBounds(firstCode, nextCode, secondCode) {
      return nextCode === TILDE && secondCode !== EQUAL_SIGN && firstCode != WHITESPACE;
    }

    /**
     * Check for <type-selector> bounds
     * @param firstCode
     * @param nextCode
     * @param wasBracesOpened
     * @returns {boolean}
     */

  }, {
    key: 'isTypeBounds',
    value: function isTypeBounds(firstCode, nextCode, wasBracesOpened) {
      return (firstCode === WHITESPACE || firstCode === PLUS_SIGN || firstCode === TILDE || firstCode === RIGHT_ANGLE) && !wasBracesOpened && CF_WORD(nextCode);
    }

    /**
     * Check for token bounds
     * @param firstCode
     * @param nextCode
     * @param secondCode
     * @param wasBracesOpened
     * @returns {boolean}
     */

  }, {
    key: 'isTokenBounds',
    value: function isTokenBounds(firstCode, nextCode, secondCode, wasBracesOpened) {
      return this.isDescendantBounds(firstCode, nextCode, wasBracesOpened) || this.isIdBounds(nextCode) || this.isScopeStartBounds(nextCode) || this.isScopeEndBounds(firstCode, nextCode) || this.isUniversalBounds(nextCode, secondCode) || this.isAdjacentSiblingBounds(firstCode, nextCode) || this.isClassBounds(nextCode) || this.isPseudoBounds(firstCode, nextCode) || this.isChildBounds(firstCode, nextCode) || this.isAttributeBounds(nextCode) || this.isGeneralSiblingBounds(firstCode, nextCode, secondCode) || this.isTypeBounds(firstCode, nextCode, wasBracesOpened);
    }

    /**
     * Read a grammar token from a string starting at target position
     * @param selectorText - a string containing css text to read a token from
     * @param startIndex - position to start read a token at
     * @returns {number}
     *
     * @throws SyntaxError - if an unknown character was found in process
     *
     * @example
     * token = checker.tokenAt(".classname", 0);
     * token   //=> { type: "class", value: ".classname" }
     */

  }, {
    key: 'tokenAt',
    value: function tokenAt(selectorText, startIndex) {
      var size = 1,
          startCode = selectorText.codePointAt(startIndex),
          type = void 0,
          token = void 0,
          nextCode = void 0,
          nextIndex = void 0,
          prevCode = void 0,
          secondCode = void 0,
          openBraces = void 0,
          openQuotes = void 0,
          penultCode = void 0;

      // Get initial token type
      type = this.getInitialTokenType(startCode);

      // Set initial state for nextCode
      nextIndex = startIndex + size;
      prevCode = startCode;
      nextCode = selectorText.codePointAt(nextIndex);
      secondCode = selectorText.codePointAt(nextIndex + 1);
      openBraces = startCode === OPEN_SQUARE;

      // Check for <scope-starting-pointer> or <scope-ending-pointer>
      if (prevCode === OPEN_PARENTHESES || prevCode === CLOSE_PARENTHESES) {
        while (nextCode === WHITESPACE) {
          nextCode = selectorText.codePointAt(++size + startIndex);
        }
      } else {
        // While not EOF
        while (nextIndex < selectorText.length) {
          if (!openQuotes) {

            // Get a token type update or use the last one
            type = this.getLazyTokenType(prevCode, nextCode, secondCode) || type;

            // Break if next token spotted
            if (this.isTokenBounds(prevCode, nextCode, secondCode, openBraces)) break;
          }

          // Get codes for next iteration
          size++;
          nextIndex = size + startIndex;
          penultCode = prevCode;
          prevCode = nextCode;
          nextCode = selectorText.codePointAt(nextIndex);
          secondCode = selectorText.codePointAt(nextIndex + 1);

          // Check if " or ' was spotted without escape \
          if (prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
            if (!!openQuotes) {
              if (nextCode === openQuotes) openQuotes = undefined;
            } else {
              openQuotes = nextCode;
            }
          }

          if (!openQuotes) {
            // Check if [ was spotted
            if (nextCode === OPEN_SQUARE) {
              if (openBraces) throw new SyntaxError('Unexpected character "' + selectorText[nextIndex] + '" at ' + nextIndex + ' position');
              openBraces = true;
            }

            // Check if ] was spotted
            if (nextCode === CLOSE_SQUARE) {
              if (!openBraces) throw new SyntaxError('Unexpected character "' + selectorText[nextIndex] + '" at ' + nextIndex + ' position');
              openBraces = false;
            }

            // Check for triple colon ::: parse error
            if (COLON === penultCode === prevCode === nextCode) {
              throw new SyntaxError('Unexpected character "' + selectorText[nextIndex] + '" at ' + nextIndex + ' position');
            }
          }
        }
      }

      // Create a token
      token = { type: type, value: selectorText.substr(startIndex, size) };

      return token;
    }

    /**
     * Create a set of tokens from target selector string
     * @param selectorText
     * @returns {Array}
     */

  }, {
    key: 'tokenize',
    value: function tokenize(selectorText) {
      var tokens = [],
          index = void 0,
          token = void 0;

      // Loop through selectorText char codes
      for (index = 0; index < selectorText.length; index++) {

        // Create a token
        token = this.tokenAt(selectorText, index);

        // Shift loop pointer by token size
        index = index + token.value.length - 1;

        // Add token to tokensList
        tokens.push(token);
      }

      return tokens;
    }
  }]);

  return SelectorTokenizer;
}();

exports.default = SelectorTokenizer;
},{}],3:[function(require,module,exports){
'use strict';

var _selectorChecker = require('../../../dist/selector-checker.js');

var _selectorChecker2 = _interopRequireDefault(_selectorChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SelectorChecker', function () {
      describe('splitAttributeToken', function () {
            it('[autoplay] ==> [ "autoplay" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[autoplay]";
                  expectedResult = ["autoplay"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[href="#"] ==> [ "href", "=", "#" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[href=\"#\"]";
                  expectedResult = ["href", "=", "#"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[lang~=\'en-us\'] ==> [ "lang", "~=", "en-us" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[lang~=\'en-us\']";
                  expectedResult = ["lang", "~=", "en-us"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[lang*=en-us] ==> [ "lang", "*=", "en-us" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[lang*=en-us]";
                  expectedResult = ["lang", "*=", "en-us"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[href^=\"#\"] ==> [ "href", "^=", "#" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[href^=\"#\"]";
                  expectedResult = ["href", "^=", "#"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[href$=\".cn\"] ==> [ "href", "$=", ".cn" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[href$=\".cn\"]";
                  expectedResult = ["href", "$=", ".cn"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });

            it('[type=\"email\" i] ==> [ "type", "=", "email", "i" ]', function () {
                  var value = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  value = "[type=\"email\" i]";
                  expectedResult = ["type", "=", "email", "i"];

                  actualResult = checker.splitAttributeToken(value);

                  expect(actualResult).toEqual(expectedResult);
            });
      });

      describe('matchTagName', function () {
            it('h1 matches h1 ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("h1");
                  selector = "h1";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('h1 matches div ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("h1");
                  selector = "div";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('matchClassName', function () {
            it('div.post matches .post ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "post post-default");
                  selector = ".post";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div.post matches .main ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "post post-default");
                  selector = ".main";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('a.btn matches a.btn ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("a");
                  element.setAttribute("class", "btn");
                  selector = "a.btn";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('a.btn matches div.btn ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("a");
                  element.setAttribute("class", "btn");
                  selector = "div.btn";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('a.btn matches .btn ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("a");
                  element.setAttribute("class", "btn");
                  selector = ".btn";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('matchUniversal', function () {
            it('a.btn.btn-primary matches *.btn ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("a");
                  element.setAttribute("class", "btn btn-primary");
                  selector = "*.btn";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('matchAttribute', function () {
            it('audio[autoplay] matches [autoplay] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("audio");
                  element.setAttribute("autoplay", "autoplay");
                  selector = "[autoplay]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('iframe[allowfullscreen] matches [href] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("iframe");
                  element.setAttribute("allowfullscreen", "allowfullscreen");
                  selector = "[href]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"test\"] matches [class=\"test\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "test");
                  selector = "[class=\"test\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"post\"] matches [class=\"article\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "post");
                  selector = "[class=\"article\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"btn btn-md btn-primary\"] matches [class~=\"btn-md\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "btn btn-md btn-primary");
                  selector = "[class~=\"btn-md\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"btn btn-md btn-primary\"] matches [class~=\"primary\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "btn btn-md btn-primary");
                  selector = "[class~=\"primary\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section-large bg-primary\"] matches [class|=\"section\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section-large bg-primary");
                  selector = "[class|=\"section\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section-large bg-primary\"] matches [class|=\"bg\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section-large bg-primary");
                  selector = "[class|=\"bg\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"blogpost blogpost-default\"] matches [class^=\"blog\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "blogpost blogpost-default");
                  selector = "[class^=\"blog\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section blogpost\"] matches [class^=\"blog\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section blogpost");
                  selector = "[class^=\"blog\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"blogpost testcase\"] matches [class$=\"case\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "blogpost testcase");
                  selector = "[class$=\"case\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"blogpost testcase\"] matches [class$=\"post\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "blogpost testcase");
                  selector = "[class$=\"post\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section section-default\"] matches [class*=\"ion sect\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section section-default");
                  selector = "[class*=\"ion sect\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section section-default\"] matches [class*=\"default\"] ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section section-default");
                  selector = "[class*=\"default\"]";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[class=\"section section-default\"] matches [class*=\"post-default\"] ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("class", "section section-default");
                  selector = "[class*=\"post-default\"]";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isFirstChild', function () {
            it('section>{text}+div matches div:first-child ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);

                  selector = "div:first-child";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>div+p matches p:first-child ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("p");

                  parent.appendChild(document.createElement("div"));
                  parent.appendChild(element);

                  selector = "p:first-child";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isLastChild', function () {
            it('section>div+{text} matches div:last-child ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));

                  selector = "div:last-child";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>div+p matches div:last-child ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));

                  selector = "div:last-child";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isIndeterminate', function () {
            it('input[type="checkbox"] (indeterminate) matches :indeterminate ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "checkbox");
                  element.indeterminate = true;

                  selector = ":indeterminate";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="checkbox"] matches :indeterminate ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "checkbox");

                  selector = ":indeterminate";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="radio"] (unchecked) matches :indeterminate ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "radio");
                  element.setAttribute("name", "test");

                  selector = ":indeterminate";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="radio"] matches :indeterminate ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "radio");
                  element.setAttribute("name", "test");
                  element.setAttribute("checked", "checked");

                  selector = ":indeterminate";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('progress matches :indeterminate ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("progress");

                  selector = ":indeterminate";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('progress[value=1] matches :indeterminate ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("progress");
                  element.value = 1;

                  selector = ":indeterminate";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isChecked', function () {
            it('input[type="checkbox"] (checked) matches :checked ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "checkbox");
                  element.setAttribute("checked", "checked");

                  selector = ":checked";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="checkbox"] matches :checked ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "checkbox");

                  selector = ":checked";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="radio"] (checked) matches :checked ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "radio");
                  element.setAttribute("checked", "checked");

                  selector = ":checked";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type="radio"] matches :checked ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "radio");

                  selector = ":checked";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select>option (selected) matches :checked ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("select");
                  element = document.createElement("option");
                  element.setAttribute("selected", "selected");
                  parent.appendChild(element);

                  selector = ":checked";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select>option+option matches :checked ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("select");
                  element = document.createElement("option");
                  parent.appendChild(document.createElement("option"));
                  parent.appendChild(element);

                  selector = ":checked";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select>option (default) matches :checked ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("select");
                  element = document.createElement("option");
                  parent.appendChild(element);

                  selector = ":checked";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isDisabled', function () {
            it('button[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("button");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[disabled] matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('button matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("button");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("select");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("select");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('option[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("option");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('option matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("option");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('fieldset[disabled] matches :disabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("fieldset");
                  element.setAttribute("disabled", "disabled");

                  selector = ":disabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('fieldset matches :disabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("fieldset");

                  selector = ":disabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isEnabled', function () {
            it('button[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("button");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[disabled] matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('button matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("button");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("select");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('select matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("select");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('option[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("option");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('option matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("option");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('fieldset[disabled] matches :enabled ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("fieldset");
                  element.setAttribute("disabled", "disabled");

                  selector = ":enabled";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('fieldset matches :enabled ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("fieldset");

                  selector = ":enabled";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isEmpty', function () {
            it('div matches :empty ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":empty";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div{text} matches :empty ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.appendChild(document.createTextNode("text"));

                  selector = ":empty";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isFirstOfType', function () {
            it('section>{text}+span+{text}+button matches :first-of-type ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);

                  selector = ":first-of-type";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>{text}+button+{text}+button matches :first-of-type ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("button"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);

                  selector = ":first-of-type";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isLastOfType', function () {
            it('section>{text}+span+{text}+button matches :last-of-type ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);

                  selector = ":last-of-type";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>{text}+button+{text}+button matches :last-of-type ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("button"));

                  selector = ":last-of-type";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isOnlyChild', function () {
            it('section>{text}+div+{text} matches div:only-child ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));

                  selector = "div:only-child";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>{text}+div+div+{text} matches div:only-child ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("div"));
                  parent.appendChild(document.createTextNode("text"));

                  selector = "div:only-child";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isOnlyOfType', function () {
            it('section>div+{text}+button+{text}+div matches :only-of-type ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createElement("div"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("div"));

                  selector = ":only-of-type";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>button+{text}+button+{text}+div matches :only-of-type ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createElement("button"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("div"));

                  selector = ":only-of-type";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>div+{text}+button+{text}+button matches :only-of-type ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createElement("div"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("button"));

                  selector = ":only-of-type";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('section>button+{text}+button+{text}+button matches :only-of-type ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("button");
                  parent.appendChild(document.createElement("button"));
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(element);
                  parent.appendChild(document.createTextNode("text"));
                  parent.appendChild(document.createElement("button"));

                  selector = ":only-of-type";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isRequired', function () {
            it('input[required] matches :required ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("required", "required");

                  selector = ":required";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input matches :required ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":required";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[required] matches :required ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("required", "required");

                  selector = ":required";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :required ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":required";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isOptional', function () {
            it('input[required] matches :optional ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("required", "required");

                  selector = ":optional";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input matches :optional ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":optional";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[required] matches :optional ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("required", "required");

                  selector = ":optional";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :optional ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":optional";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isReadWrite', function () {
            it('input matches :read-write ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":read-write";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[readonly] matches :read-write ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("readonly", "readonly");

                  selector = ":read-write";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea matches :read-write ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");

                  selector = ":read-write";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea[readonly] matches :read-write ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");
                  element.setAttribute("readonly", "readonly");

                  selector = ":read-write";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[contenteditable] matches :read-write ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("contenteditable", "contenteditable");

                  selector = ":read-write";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :read-write ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":read-write";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isReadOnly', function () {
            it('input matches :read-only ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");

                  selector = ":read-only";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[readonly] matches :read-only ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("readonly", "readonly");

                  selector = ":read-only";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea matches :read-only ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");

                  selector = ":read-only";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('textarea[readonly] matches :read-only ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("textarea");
                  element.setAttribute("readonly", "readonly");

                  selector = ":read-only";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div[contenteditable] matches :read-only ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("contenteditable", "contenteditable");

                  selector = ":read-only";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :read-only ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":read-only";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isRoot', function () {
            it('html matches :root ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.firstElementChild;

                  selector = ":root";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :root ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  selector = ":root";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isTarget', function () {
            it('div[id=test] matches :target ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");
                  element.setAttribute("id", "test");

                  element.ownerDocument.location.hash = "test";

                  selector = ":target";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  element.ownerDocument.location.hash = "";

                  expect(actualResult).toBe(expectedResult);
            });

            it('div matches :target ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("div");

                  element.ownerDocument.location.hash = "test";

                  selector = ":target";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  element.ownerDocument.location.hash = "";

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isOutOfRange', function () {
            it('input[type=number min=0 max=10 value=5] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "0");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "5");

                  selector = ":out-of-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=5 max=10 value=0] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "5");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "0");

                  selector = ":out-of-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=5 max=10 value=15] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "5");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "15");

                  selector = ":out-of-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number max=10 value=15] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "15");

                  selector = ":out-of-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number max=10 value=5] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "5");

                  selector = ":out-of-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=10 value=5] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "10");
                  element.setAttribute("value", "5");

                  selector = ":out-of-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=2 value=5] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "2");
                  element.setAttribute("value", "5");

                  selector = ":out-of-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number value=5] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("value", "5");

                  selector = ":out-of-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2000-01-31] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");

                  selector = ":out-of-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=1999-01-31] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date max=2000-01-02 value=2000-01-31] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("max", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date max=2000-01-02 value=1999-01-31] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("max", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date value=1999-01-31] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2000-01-31 max=2001-01-02] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=1999-01-31 max=2001-01-02] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2100-01-31 max=2001-01-02] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2100-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month min=2000-01 value=2000-01] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("min", "2000-01");
                  element.setAttribute("value", "2000-01");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month min=2000-01 value=1993-01] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("min", "2000-01");
                  element.setAttribute("value", "1993-01");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month max=2000-01 value=2000-02] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("max", "2000-01");
                  element.setAttribute("value", "2000-02");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month max=2000-01 value=1993-01] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("max", "2000-01");
                  element.setAttribute("value", "1993-01");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week min=2016-W50 value=2016-W52] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("min", "2016-W50");
                  element.setAttribute("value", "2016-W52");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week min=2016-W50 value=2016-W40] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("min", "2016-W50");
                  element.setAttribute("value", "2016-W40");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week max=2016-W01 value=2016-W02] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("max", "2016-W01");
                  element.setAttribute("value", "2016-W02");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week max=2016-W01 value=2016-W01] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("max", "2016-W01");
                  element.setAttribute("value", "2016-W01");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time min=10:00 value=15:00] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("min", "10:00");
                  element.setAttribute("value", "15:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time min=21:00 value=15:00] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("min", "21:00");
                  element.setAttribute("value", "15:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time max=10:00 value=15:00] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("max", "10:00");
                  element.setAttribute("value", "15:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time max=21:00 value=15:00] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("max", "21:00");
                  element.setAttribute("value", "15:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local min=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("min", "2011-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local min=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("min", "2013-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local max=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("max", "2011-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local max=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("max", "2013-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":out-of-range";
                  expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isInRange', function () {
            it('input[type=number min=0 max=10 value=5] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "0");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "5");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=5 max=10 value=0] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "5");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "0");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=5 max=10 value=15] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "5");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "15");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number max=10 value=15] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "15");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number max=10 value=5] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("max", "10");
                  element.setAttribute("value", "5");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=10 value=5] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "10");
                  element.setAttribute("value", "5");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number min=2 value=5] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("min", "2");
                  element.setAttribute("value", "5");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=number value=5] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "number");
                  element.setAttribute("value", "5");

                  selector = ":in-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2000-01-31] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=1999-01-31] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date max=2000-01-02 value=2000-01-31] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("max", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date max=2000-01-02 value=1999-01-31] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("max", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date value=1999-01-31] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("value", "1999-01-31");

                  selector = ":in-range";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2000-01-31 max=2001-01-02] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2000-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=1999-01-31 max=2001-01-02] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "1999-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=date min=2000-01-02 value=2100-01-31 max=2001-01-02] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "date");
                  element.setAttribute("min", "2000-01-02");
                  element.setAttribute("value", "2100-01-31");
                  element.setAttribute("max", "2001-01-02");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month min=2000-01 value=2000-01] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("min", "2000-01");
                  element.setAttribute("value", "2000-01");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month min=2000-01 value=1993-01] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("min", "2000-01");
                  element.setAttribute("value", "1993-01");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month max=2000-01 value=2000-02] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("max", "2000-01");
                  element.setAttribute("value", "2000-02");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=month max=2000-01 value=1993-01] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "month");
                  element.setAttribute("max", "2000-01");
                  element.setAttribute("value", "1993-01");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week min=2016-W50 value=2016-W52] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("min", "2016-W50");
                  element.setAttribute("value", "2016-W52");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week min=2016-W50 value=2016-W40] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("min", "2016-W50");
                  element.setAttribute("value", "2016-W40");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week max=2016-W01 value=2016-W02] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("max", "2016-W01");
                  element.setAttribute("value", "2016-W02");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=week max=2016-W01 value=2016-W01] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "week");
                  element.setAttribute("max", "2016-W01");
                  element.setAttribute("value", "2016-W01");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time min=10:00 value=15:00] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("min", "10:00");
                  element.setAttribute("value", "15:00");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time min=21:00 value=15:00] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("min", "21:00");
                  element.setAttribute("value", "15:00");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time max=10:00 value=15:00] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("max", "10:00");
                  element.setAttribute("value", "15:00");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=time max=21:00 value=15:00] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "time");
                  element.setAttribute("max", "21:00");
                  element.setAttribute("value", "15:00");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local min=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("min", "2011-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":in-range";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local min=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("min", "2013-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local max=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("max", "2011-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=datetime-local max=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "datetime-local");
                  element.setAttribute("max", "2013-10-10T14:48:00");
                  element.setAttribute("value", "2011-10-10T16:48:00");

                  selector = ":in-range";
                  expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isInvalid', function () {
            it('input[type=text required] matches :invalid ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "");

                  selector = ":invalid";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=text value=text required] matches :invalid ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "text");

                  selector = ":invalid";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isValid', function () {
            it('input[type=text required] matches :valid ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "");

                  selector = ":valid";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=text value=text required] matches :valid ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "text");

                  selector = ":valid";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isValid', function () {
            it('input[type=text required] matches :valid ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "");

                  selector = ":valid";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('input[type=text value=text required] matches :valid ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("input");
                  element.setAttribute("type", "text");
                  element.setAttribute("required", "required");
                  element.setAttribute("value", "text");

                  selector = ":valid";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isLang', function () {
            it('body[lang="en"]>p matches :lang(en) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("body");
                  element = document.createElement("p");

                  parent.setAttribute("lang", "en");
                  parent.appendChild(element);

                  selector = ":lang(en)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('body[lang="en-us"]>p matches :lang(en) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("body");
                  element = document.createElement("p");

                  parent.setAttribute("lang", "en-us");
                  parent.appendChild(element);

                  selector = ":lang(en)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('body[lang="fr"]>p matches :lang(en) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("body");
                  element = document.createElement("p");

                  parent.setAttribute("lang", "fr");
                  parent.appendChild(element);

                  selector = ":lang(en)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('body>p matches :lang(en) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("body");
                  element = document.createElement("p");

                  parent.appendChild(element);

                  selector = ":lang(en)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isNot', function () {
            it('p[class=test] matches :not(.example) ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not(.example)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('p[class=test] matches :not(div) ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not(div)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('p[class=test] matches :not([class=post]) ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not([class=post])";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('p[class=test] matches :not(.test) ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not(.test)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('p[class=test] matches :not(p) ==> false', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not(p)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('p[class=test] matches :not(:target) ==> true', function () {
                  var element = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  element = document.createElement("p");
                  element.setAttribute("class", "test");

                  selector = ":not(:target)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isNthChild', function () {
            it('div>p+p+p.target+p+p matches p:nth-child(2n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(2n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(3) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(3)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(odd) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(odd)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(even) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(even)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(2n) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(2n)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(3n) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(3n)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(2) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(2)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(-2n+3) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(-2n+3)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-child(4n-1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-child(4n-1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isNthLastChild', function () {
            it('div>p+p+p+p+p.target matches p:nth-last-child(-n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);

                  selector = "p:nth-last-child(-n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p+p.target+p matches p:nth-last-child(-n+1) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(-n+1)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(-2n+3) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(-2n+3)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(3) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(3)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(4n-1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(4n-1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(odd) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(odd)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(even) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(even)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(2n) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(2n)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>p+p+p.target+p+p matches p:nth-last-child(2n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-child(2n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isNthOfType', function () {
            it('div>span+span+p+p+span+p.target matches p:nth-of-type(2n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);

                  selector = "p:nth-of-type(2n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-of-type(2n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(2n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-of-type(1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-of-type(odd) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(odd)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p+span+p+p.target matches p:nth-of-type(even) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);

                  selector = "p:nth-of-type(even)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p+span+p.target+p matches p:nth-of-type(2n) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(2n)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-of-type(-n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(-n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-of-type(2n-1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-of-type(2n-1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('isNthLastOfType', function () {
            it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(-n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);

                  selector = "p:nth-last-of-type(-n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(2n-1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);

                  selector = "p:nth-last-of-type(2n-1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p+span+p.target+p matches p:nth-last-of-type(2n) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-of-type(2n)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(even) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(element);

                  selector = "p:nth-last-of-type(even)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(odd) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-of-type(odd)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(1) ==> false', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-of-type(1)";
                  expectedResult = false;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(3) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-of-type(3)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });

            it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(2n+1) ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("div");

                  element = document.createElement("p");
                  element.setAttribute("class", "target");

                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(element);
                  parent.appendChild(document.createElement("p"));
                  parent.appendChild(document.createElement("span"));
                  parent.appendChild(document.createElement("p"));

                  selector = "p:nth-last-of-type(2n+1)";
                  expectedResult = true;

                  actualResult = checker.check(element, selector);

                  expect(actualResult).toBe(expectedResult);
            });
      });

      describe('check', function () {});
});

},{"../../../dist/selector-checker.js":1}],4:[function(require,module,exports){
"use strict";

require("./spec/SelectorCheckerSpec.es6");

},{"./spec/SelectorCheckerSpec.es6":3}]},{},[4]);
