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
    key: "isElementFirstChild",
    value: function isElementFirstChild(element) {
      return element.parentElement && element.parentElement.childNodes[0] === element;
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
     * @returns {boolean}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchPseudoSelector",
    value: function matchPseudoSelector(element, value) {
      switch (value) {
        case ":first-child":
          return this.isElementFirstChild(element);
        default:
          throw new TypeError("Unexpected token " + token + " to match");
      }
    }

    /**
     * Check if specified element matches target token
     * @param element
     * @param token
     * @returns {boolean}
     *
     * @throws TypeError - when unknown token type was spotted
     */

  }, {
    key: "matchSelectorToken",
    value: function matchSelectorToken(element, token) {
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
    value: function check(element, selector) {
      var tokens = this.tokenizer.tokenize(selector),
          token = void 0,
          i = void 0,
          attrs = void 0,
          matches = void 0,
          elem = element;

      // While has next token
      while (token = tokens.pop()) {
        matches = this.matchSelectorToken(elem, token);

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

      describe('check', function () {
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

            it('section>div matches div:first-child ==> true', function () {
                  var element = void 0,
                      parent = void 0,
                      selector = void 0,
                      actualResult = void 0,
                      expectedResult = void 0,
                      checker = new _selectorChecker2.default();

                  parent = document.createElement("section");
                  element = document.createElement("div");

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
});

},{"../../../dist/selector-checker.js":1}],4:[function(require,module,exports){
"use strict";

require("./spec/SelectorCheckerSpec.es6");

},{"./spec/SelectorCheckerSpec.es6":3}]},{},[4]);