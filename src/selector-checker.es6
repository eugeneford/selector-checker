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

import SelectorTokenizer from "selector-tokenizer";

const TYPE_SELECTOR = "type";
const CLASS_SELECTOR = "class";
const ATTRIBUTE_SELECTOR = "attribute";
const UNIVERSAL_SELECTOR = "universal";
const PSEUDO_SELECTOR = "pseudo";
const DESCENDANT_COMBINATOR = "descendant";
const ADJACENT_SIBLING_COMBINATOR = "adjacent-sibling";
const GENERAL_SIBLING_COMBINATOR = "general-sibling";
const CHILD_COMBINATOR = "child";
const SCOPE_STARTING_POINT = "scope-start";
const SCOPE_ENDING_POINT = "scope-end";

const OPEN_SQUARE = "[".charCodeAt(0);
const CLOSE_SQUARE = "]".charCodeAt(0);
const WHITESPACE = " ".charCodeAt(0);
const ASTERISK = "*".charCodeAt(0);
const CARET = "^".charCodeAt(0);
const VERTICAL_LINE = "|".charCodeAt(0);
const TILDE = "~".charCodeAt(0);
const DOLLAR = "$".charCodeAt(0);
const EQUALS = "=".charCodeAt(0);
const SINGLE_QUOTE = "\'".charCodeAt(0);
const DOUBLE_QUOTE = "\"".charCodeAt(0);
const SLASH = "\\".charCodeAt(0);
const I_CODE = "i".charCodeAt(0);

/**
 * @returns {boolean}
 */
const CF_WORD = function (code) {
  return (code >= 128 || code === 45 || code == 245 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122));
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
class SelectorChecker {
  constructor() {
    this.tokenizer = new SelectorTokenizer();
  }

  /**
   * Check if element is a first child of its parent
   * @param element
   * @returns {boolean}
   */
  isFirstChild(element){
    return element.parentElement && element.parentElement.children[0] === element;
  }

  /**
   * Check if element is a first child of its parent
   * @param element
   * @returns {boolean}
   */
  isLastChild(element){
    return element.parentElement && element.parentElement.children[element.parentElement.children.length - 1] === element;
  }

  /**
   * Check if element is in indeterminate state
   * @param element
   * @returns {boolean}
   */
  isIndeterminate(element){
    let group, i;
    // Any <input type="checkbox"> element whose indeterminate DOM property is set to true by JavaScript
    if (element.tagName === "INPUT" && element.getAttribute("type") === "checkbox") {
      return element.indeterminate === true;
    }
    // <input type="radio"> elements whose radio button group's radio buttons are all unchecked
    else if (element.tagName === "INPUT" && element.getAttribute("type") === "radio"){
      if (group = element.getAttribute("name")) {
        group = element.ownerDocument.querySelectorAll(`input[type="radio"][name="${group}"]`);
        for (i = 0; i < group.length; i++){
          if (group[i].checked) return false;
        }
      }
      return element.checked === false;
    }
    // <progress> elements in an indeterminate state
    else if (element.tagName === "PROGRESS"){
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
  isChecked(element){
    let type = element.getAttribute("type");
    if ((element.tagName === "INPUT"
      && (type = type.toLowerCase() === "checkbox"
        || type === "radio"))) {
      return element.checked === true;
    }
    else if (element.tagName === "OPTION"){
      return element.selected === true;
    }
    return false;
  }

  /**
   * Check if element is actually disabled
   * @param element
   * @returns {boolean}
   */
  isDisabled(element){
    let elements = ["button", "input", "select", "textarea", "optgroup", "option", "menuitem", "fieldset"];

    if (elements.indexOf(element.tagName.toLowerCase()) > -1){
      return element.disabled === true;
    }

    return false;
  }

  /**
   * Check if element is actually enabled
   * @param element
   * @returns {boolean}
   */
  isEnabled(element){
    return this.isDisabled(element) !== true;
  }

  /**
   * Check if element is actually empty
   * @param element
   * @returns {boolean}
   */
  isEmpty(element){
    return element.childNodes.length === 0;
  }

  /**
   * Check if element is actually first of type
   * @param element
   * @returns {boolean}
   */
  isFirstOfType(element){
    let elem = element;
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
  isLastOfType(element){
    let elem = element;
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
  isOnlyChild(element){
    return this.isFirstChild(element) && this.isLastChild(element);
  }

  /**
   * Check if element is actually the only element of its type in parent
   * @param element
   * @returns {boolean}
   */
  isOnlyOfType(element){
    return this.isFirstOfType(element) && this.isLastOfType(element);
  }

  /**
   * Check if element is actually required
   * @param element
   * @returns {boolean}
   */
  isRequired(element){
    let elements = ["input", "select", "textarea"];
    return elements.indexOf(element.tagName.toLowerCase()) > -1 && element.hasAttribute("required");
  }

  /**
   * Check if element is actually optional
   * @param element
   * @returns {boolean}
   */
  isOptional(element){
    let elements = ["input", "select", "textarea"];
    return elements.indexOf(element.tagName.toLowerCase()) > -1 && !element.hasAttribute("required");
  }

  /**
   * Check if element is actually a read-write element
   * @param element
   * @returns {boolean}
   */
  isReadWrite(element){
    let types = ["text", "email", "date", "time", "url", "search", "number", "week", "month", "tel"], type = element.getAttribute("type");

    if (element.tagName === "TEXTAREA") {
      return !element.hasAttribute("readonly");
    }
    else if (element.tagName === "INPUT") {
      if ( type && types.indexOf(type.toLowerCase()) === -1){
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
  isReadOnly(element){
    return this.isReadWrite(element) === false;
  }

  /**
   * Check if element is actually a document root element
   * @param element
   * @returns {boolean}
   */
  isRoot(element){
    return element.ownerDocument.documentElement === element;
  }

  /**
   * Check if element is actually a document target element
   * @param element
   * @returns {boolean}
   */
  isTarget(element){
    return element.hasAttribute("id") && `#${element.getAttribute("id")}` === element.ownerDocument.location.hash;
  }

  /**
   * Check if element is actually out of range
   * @param element
   * @returns {boolean|undefined}
   */
  isOutOfRange(element){
    let types = ["number", "range", "date", "datetime", "datetime-local", "month", "time", "week"],
      type, min, max;
    if (element.tagName === "INPUT" && element.validity){
      type = element.getAttribute("type");
      min = element.getAttribute("min");
      max = element.getAttribute("max");

      if (type && types.indexOf(type.toLowerCase()) > -1 && (min || max)){
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
  isInRange(element){
    let types = ["number", "range", "date", "datetime", "datetime-local", "month", "time", "week"],
      type, min, max;
    if (element.tagName === "INPUT" && element.validity){
      type = element.getAttribute("type");
      min = element.getAttribute("min");
      max = element.getAttribute("max");

      if (type && types.indexOf(type.toLowerCase()) > -1 && (min || max)){
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
  isInvalid(element){
    return element.validity ? element.validity.valid === false : false;
  }

  /**
   * Check if element is actually valid
   * @param element
   * @returns {boolean}
   */
  isValid(element){
    return element.validity ? element.validity.valid === true : false;
  }

  /**
   * Checks if element is matching a target lang
   * @param element
   * @param params
   * @returns {boolean}
   */
  isLang(element, params){
    if (params && params.length === 1 && params[0].type === "type"){
      let elem = element, lang;
      while (elem){
        if (lang = elem.getAttribute("lang")){
          if ((lang = lang.toLowerCase()) === params[0].value.toLowerCase()
            || lang.indexOf(params[0].value.toLowerCase()+"-") === 0){
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
  isNot(element, params){
    if (params && params.length === 1){
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
  isNthChild(element, params, inverseFlag){
    if (params && params.length){
      let parent = element.parentElement,
        index, a, b,
        length = parent.childNodes.length,
        n = 0;

      switch (params.length){
        case 3:
          if (params[2].value[params[2].value.length - 1] !== "n") return false;
          a = parseInt(params[2].value, 10) || (params[2].value[0] === "-" ? -1: 1);
          b = parseInt(params[0].value, 10) || 0;
          break;
        case 1:
          if (params[0].value.toLowerCase() === "odd") {
            a = 2;
            b = 1;
          }
          else if (params[0].value.toLowerCase() === "even") {
            a = 2;
            b = 0;
          }
          else if ((index = params[0].value.indexOf("-")) > 0) {
            a = parseInt(params[0].value.substring(0, index), 10) || 1;
            b = parseInt(params[0].value.substring(index), 10) || 0;
          }
          else if (params[0].value[params[0].value.length - 1] === "n") {
            a = parseInt(params[0].value, 10) || (params[0].value[0] === "-" ? -1: 1);
            b = 0;
          } else {
            a = 0;
            b = parseInt(params[0].value, 10);
          }
          break;
        default: return false;
      }

      if (isNaN(a) || isNaN(b)) return false;

      if (a){
        while ( n < length ) {
          index = a*n+b;
          if (parent.childNodes[inverseFlag? length - index: index - 1] === element) return true;
          n = n + 1;
        }
      } else {
        return parent.childNodes[b - 1] === element;
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
  isNthLastChild(element, params){
    return this.isNthChild(element, params, true);
  }

  /**
   * Check if specified tagName matches element
   * @param element
   * @param tagName
   * @returns {boolean}
   */
  matchTagName(element, tagName) {
    return element.tagName.toLowerCase() === tagName.toLowerCase();
  }

  /**
   * Check if specified tagName matches
   * @param element
   * @param className
   */
  matchClassName(element, className) {
    return element.getAttribute("class").split(/\s+/).indexOf(className.substr(1)) > -1;
  }

  /**
   * Check if specified attribute value matches target element
   * @param element
   * @param value
   * @returns {boolean}
   */
  matchAttribute(element, value) {
    let tokens = this.splitAttributeToken(value), elementValue, i;

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
              if (elementValue[0].toLowerCase() === tokens[2].toLowerCase()
                || elementValue[0].toLowerCase().indexOf(`${tokens[2].toLowerCase()}-`) === 0
              ) return true;
            }
            return false;
            break;
          case "^=":
            if (elementValue = element.getAttribute(tokens[0])) {
              elementValue = elementValue.split(/\s+/);
              if (elementValue[0].toLowerCase().indexOf(`${tokens[2].toLowerCase()}`) === 0
              ) return true;
            }
            break;
          case "$=":
            if (elementValue = element.getAttribute(tokens[0])) {
              elementValue = elementValue.split(/\s+/);
              if (elementValue[elementValue.length - 1].toLowerCase().indexOf(`${tokens[2].toLowerCase()}`) === (elementValue[elementValue.length - 1].length - tokens[2].length)
              ) return true;
            }
            break;
          case "*=":
            return element.getAttribute(tokens[0]).toLowerCase().indexOf(tokens[2].toLowerCase()) > -1;
            break;
          default:
            throw new Error(`Parse error on ${value}`);
        }

        break;
      default:
        throw new Error(`Parse error on ${value}`);
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
  matchPseudoSelector(element, value, statesMap, params) {
    switch (value){
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
  matchSelectorToken(element, token, statesMap, params) {
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
        throw new TypeError(`Unexpected token ${token.value} to match`);
    }
  }

  /**
   * Split an attribute token on attr, operand and value
   * @param value
   * @returns {Array}
   */
  splitAttributeToken(value) {
    let attr, val, type, nextCode, i, size, start, quotes, ignore, result = [];

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
      if (!type && ( nextCode === CARET || nextCode === ASTERISK || nextCode === VERTICAL_LINE
        || nextCode === DOLLAR || nextCode === EQUALS || nextCode === TILDE)) {
        if (nextCode === EQUALS) {
          result.push(type = value[i]);
        }
        else if (value.charCodeAt(i + 1) !== EQUALS) {
          throw new SyntaxError(`Unexpected character ${value[i + 1]} at ${i}`);
        }
        else {
          result.push(type = value[i] + value[++i]);
        }
      }

      // Tokenize value
      if (!val && ( CF_WORD(nextCode) || nextCode === SINGLE_QUOTE || nextCode === DOUBLE_QUOTE)) {
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
  check(element, selector, statesMap) {
    let tokens = this.tokenizer.tokenize(selector), token, i, params, matches, elem = element;

    // While has next token
    while (token = tokens.pop()) {

      if (token.type === SCOPE_ENDING_POINT){
        params = [];
        while ((token = tokens.pop()).type !== SCOPE_STARTING_POINT){
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
}

export default SelectorChecker;