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
   * @returns {boolean}
   *
   * @throws TypeError - when unknown token type was spotted
   */
  matchPseudoSelector(element, value, statesMap) {
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

      // TODO: Add in feature releases
      case ":any":
      case ":dir":
      case ":default":
      case ":first":
      case ":fullscreen":
        return undefined;

      default:
        throw new TypeError(`Unexpected pseudo ${value} to match`);
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
  matchSelectorToken(element, token, statesMap) {
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
        throw new TypeError(`Unexpected token ${token} to match`);
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
    let tokens = this.tokenizer.tokenize(selector), token, i, attrs, matches, elem = element;

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
}

export default SelectorChecker;