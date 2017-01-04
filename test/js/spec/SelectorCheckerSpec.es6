import SelectorChecker from "../../../dist/selector-checker.js";

describe('SelectorChecker', () => {
  describe('splitAttributeToken', () => {
    it('[autoplay] ==> [ "autoplay" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[autoplay]";
      expectedResult = ["autoplay"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[href="#"] ==> [ "href", "=", "#" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[href=\"#\"]";
      expectedResult = ["href", "=", "#"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[lang~=\'en-us\'] ==> [ "lang", "~=", "en-us" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[lang~=\'en-us\']";
      expectedResult = ["lang", "~=", "en-us"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[lang*=en-us] ==> [ "lang", "*=", "en-us" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[lang*=en-us]";
      expectedResult = ["lang", "*=", "en-us"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[href^=\"#\"] ==> [ "href", "^=", "#" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[href^=\"#\"]";
      expectedResult = ["href", "^=", "#"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[href$=\".cn\"] ==> [ "href", "$=", ".cn" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[href$=\".cn\"]";
      expectedResult = ["href", "$=", ".cn"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });

    it('[type=\"email\" i] ==> [ "type", "=", "email", "i" ]', () => {
      let value, actualResult, expectedResult, checker = new SelectorChecker();

      value = "[type=\"email\" i]";
      expectedResult = ["type", "=", "email", "i"];

      actualResult = checker.splitAttributeToken(value);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('matchTagName', () => {
    it('h1 matches h1 ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("h1");
      selector = "h1";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('h1 matches div ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("h1");
      selector = "div";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('matchID', () => {
    it('h1#example matches #example ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("h1");
      element.setAttribute("id", "example");
      selector = "#example";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('h1 matches #example ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("h1");
      selector = "#example";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('matchClassName', () => {
    it('div.post matches .post ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "post post-default");
      selector = ".post";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });


    it('div.post matches .main ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "post post-default");
      selector = ".main";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('a.btn matches a.btn ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      selector = "a.btn";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('a.btn matches div.btn ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      selector = "div.btn";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('a.btn matches .btn ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      selector = ".btn";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('matchUniversal', () => {
    it('a.btn.btn-primary matches *.btn ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("a");
      element.setAttribute("class", "btn btn-primary");
      selector = "*.btn";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('matchAttribute', () => {
    it('audio[autoplay] matches [autoplay] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("audio");
      element.setAttribute("autoplay", "autoplay");
      selector = "[autoplay]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('iframe[allowfullscreen] matches [href] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("iframe");
      element.setAttribute("allowfullscreen", "allowfullscreen");
      selector = "[href]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"test\"] matches [class=\"test\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "test");
      selector = "[class=\"test\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });


    it('div[class=\"post\"] matches [class=\"article\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "post");
      selector = "[class=\"article\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"btn btn-md btn-primary\"] matches [class~=\"btn-md\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "btn btn-md btn-primary");
      selector = "[class~=\"btn-md\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"btn btn-md btn-primary\"] matches [class~=\"primary\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "btn btn-md btn-primary");
      selector = "[class~=\"primary\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section-large bg-primary\"] matches [class|=\"section\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section-large bg-primary");
      selector = "[class|=\"section\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section-large bg-primary\"] matches [class|=\"bg\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section-large bg-primary");
      selector = "[class|=\"bg\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"blogpost blogpost-default\"] matches [class^=\"blog\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "blogpost blogpost-default");
      selector = "[class^=\"blog\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section blogpost\"] matches [class^=\"blog\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section blogpost");
      selector = "[class^=\"blog\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"blogpost testcase\"] matches [class$=\"case\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "blogpost testcase");
      selector = "[class$=\"case\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"blogpost testcase\"] matches [class$=\"post\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "blogpost testcase");
      selector = "[class$=\"post\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section section-default\"] matches [class*=\"ion sect\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section section-default");
      selector = "[class*=\"ion sect\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section section-default\"] matches [class*=\"default\"] ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section section-default");
      selector = "[class*=\"default\"]";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[class=\"section section-default\"] matches [class*=\"post-default\"] ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("class", "section section-default");
      selector = "[class*=\"post-default\"]";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isFirstChild', () => {
    it('section>{text}+div matches div:first-child ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("div");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "div:first-child";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('section>div+p matches p:first-child ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isHover', () => {
    it('button:hover matches button:hover ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:hover";
      expectedResult = true;

      stateMap = {
        ":hover": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches button:hover ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:hover";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isFocus', () => {
    it('button:focus matches button:focus ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:focus";
      expectedResult = true;

      stateMap = {
        ":focus": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches button:focus ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:focus";
      expectedResult = false;

      stateMap = {
        ":focus": [parent]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    })
  });

  describe('isActive', () => {
    it('button:active matches button:active ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:active";
      expectedResult = true;

      stateMap = {
        ":active": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches button:active ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:active";
      expectedResult = false;

      stateMap = {
        ":active": [parent]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    })
  });

  describe('isVisited', () => {
    it('button:visited matches button:visited ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:visited";
      expectedResult = true;

      stateMap = {
        ":visited": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches button:visited ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:visited";
      expectedResult = false;

      stateMap = {
        ":active": [parent]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    })
  });

  describe('isActive', () => {
    it('button:link matches button:link ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:link";
      expectedResult = true;

      stateMap = {
        ":hover": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches button:link ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, stateMap, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("button");

      parent.appendChild(document.createTextNode("text"));
      parent.appendChild(element);

      selector = "button:link";
      expectedResult = false;

      stateMap = {
        ":visited": [element]
      };

      actualResult = checker.check(element, selector, stateMap);

      expect(actualResult).toBe(expectedResult);
    })
  });

  describe('isLastChild', () => {
    it('section>div+{text} matches div:last-child ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("div");

      parent.appendChild(element);
      parent.appendChild(document.createTextNode("text"));

      selector = "div:last-child";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('section>div+p matches div:last-child ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isIndeterminate', () => {
    it('input[type="checkbox"] (indeterminate) matches :indeterminate ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "checkbox");
      element.indeterminate = true;

      selector = ":indeterminate";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="checkbox"] matches :indeterminate ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "checkbox");

      selector = ":indeterminate";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="radio"] (unchecked) matches :indeterminate ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "radio");
      element.setAttribute("name", "test");

      selector = ":indeterminate";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="radio"] matches :indeterminate ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "radio");
      element.setAttribute("name", "test");
      element.setAttribute("checked", "checked");

      selector = ":indeterminate";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('progress matches :indeterminate ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("progress");

      selector = ":indeterminate";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('progress[value=1] matches :indeterminate ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("progress");
      element.value = 1;

      selector = ":indeterminate";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isChecked', () => {
    it('input[type="checkbox"] (checked) matches :checked ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "checkbox");
      element.setAttribute("checked", "checked");

      selector = ":checked";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="checkbox"] matches :checked ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "checkbox");

      selector = ":checked";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="radio"] (checked) matches :checked ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "radio");
      element.setAttribute("checked", "checked");

      selector = ":checked";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type="radio"] matches :checked ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "radio");

      selector = ":checked";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select>option (selected) matches :checked ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("select");
      element = document.createElement("option");
      element.setAttribute("selected", "selected");
      parent.appendChild(element);

      selector = ":checked";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select>option+option matches :checked ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("select");
      element = document.createElement("option");
      parent.appendChild(document.createElement("option"));
      parent.appendChild(element);

      selector = ":checked";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select>option (default) matches :checked ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("select");
      element = document.createElement("option");
      parent.appendChild(element);

      selector = ":checked";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isDisabled', () => {
    it('button[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("button");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[disabled] matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("button");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("select");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("select");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('option[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("option");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('option matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("option");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('fieldset[disabled] matches :disabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("fieldset");
      element.setAttribute("disabled", "disabled");

      selector = ":disabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('fieldset matches :disabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("fieldset");

      selector = ":disabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isEnabled', () => {
    it('button[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("button");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[disabled] matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('button matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("button");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("select");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('select matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("select");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('option[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("option");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('option matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("option");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('fieldset[disabled] matches :enabled ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("fieldset");
      element.setAttribute("disabled", "disabled");

      selector = ":enabled";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('fieldset matches :enabled ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("fieldset");

      selector = ":enabled";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isEmpty', () => {
    it('div matches :empty ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":empty";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div{text} matches :empty ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.appendChild(document.createTextNode("text"));

      selector = ":empty";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isFirstOfType', () => {
    it('section>{text}+span+{text}+button matches :first-of-type ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>{text}+button+{text}+button matches :first-of-type ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isLastOfType', () => {
    it('section>{text}+span+{text}+button matches :last-of-type ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>{text}+button+{text}+button matches :last-of-type ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isOnlyChild', () => {
    it('section>{text}+div+{text} matches div:only-child ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>{text}+div+div+{text} matches div:only-child ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isOnlyOfType', () => {
    it('section>div+{text}+button+{text}+div matches :only-of-type ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>button+{text}+button+{text}+div matches :only-of-type ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>div+{text}+button+{text}+button matches :only-of-type ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('section>button+{text}+button+{text}+button matches :only-of-type ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isRequired', () => {
    it('input[required] matches :required ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("required", "required");

      selector = ":required";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input matches :required ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":required";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[required] matches :required ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("required", "required");

      selector = ":required";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :required ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":required";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isOptional', () => {
    it('input[required] matches :optional ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("required", "required");

      selector = ":optional";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input matches :optional ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":optional";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[required] matches :optional ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("required", "required");

      selector = ":optional";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :optional ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":optional";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isReadWrite', () => {
    it('input matches :read-write ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":read-write";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[readonly] matches :read-write ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("readonly", "readonly");

      selector = ":read-write";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea matches :read-write ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");

      selector = ":read-write";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea[readonly] matches :read-write ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");
      element.setAttribute("readonly", "readonly");

      selector = ":read-write";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[contenteditable] matches :read-write ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("contenteditable", "contenteditable");

      selector = ":read-write";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :read-write ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":read-write";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isReadOnly', () => {
    it('input matches :read-only ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");

      selector = ":read-only";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[readonly] matches :read-only ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("readonly", "readonly");

      selector = ":read-only";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea matches :read-only ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");

      selector = ":read-only";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('textarea[readonly] matches :read-only ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("textarea");
      element.setAttribute("readonly", "readonly");

      selector = ":read-only";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div[contenteditable] matches :read-only ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("contenteditable", "contenteditable");

      selector = ":read-only";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :read-only ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":read-only";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isRoot', () => {
    it('html matches :root ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.firstElementChild;

      selector = ":root";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :root ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      selector = ":root";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isTarget', () => {
    it('div[id=test] matches :target ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");
      element.setAttribute("id", "test");

      element.ownerDocument.location.hash = "test";

      selector = ":target";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      element.ownerDocument.location.hash = "";

      expect(actualResult).toBe(expectedResult);
    });

    it('div matches :target ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("div");

      element.ownerDocument.location.hash = "test";

      selector = ":target";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      element.ownerDocument.location.hash = "";

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isOutOfRange', () => {
    it('input[type=number min=0 max=10 value=5] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number min=5 max=10 value=0] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number min=5 max=10 value=15] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number max=10 value=15] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("max", "10");
      element.setAttribute("value", "15");

      selector = ":out-of-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number max=10 value=5] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("max", "10");
      element.setAttribute("value", "5");

      selector = ":out-of-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number min=10 value=5] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("min", "10");
      element.setAttribute("value", "5");

      selector = ":out-of-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number min=2 value=5] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("min", "2");
      element.setAttribute("value", "5");

      selector = ":out-of-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number value=5] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("value", "5");

      selector = ":out-of-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=2000-01-31] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("min", "2000-01-02");
      element.setAttribute("value", "2000-01-31");

      selector = ":out-of-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=1999-01-31] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("min", "2000-01-02");
      element.setAttribute("value", "1999-01-31");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date max=2000-01-02 value=2000-01-31] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("max", "2000-01-02");
      element.setAttribute("value", "2000-01-31");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date max=2000-01-02 value=1999-01-31] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("max", "2000-01-02");
      element.setAttribute("value", "1999-01-31");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date value=1999-01-31] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("value", "1999-01-31");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=2000-01-31 max=2001-01-02] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=date min=2000-01-02 value=1999-01-31 max=2001-01-02] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=date min=2000-01-02 value=2100-01-31 max=2001-01-02] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=month min=2000-01 value=2000-01] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("min", "2000-01");
      element.setAttribute("value", "2000-01");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month min=2000-01 value=1993-01] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("min", "2000-01");
      element.setAttribute("value", "1993-01");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month max=2000-01 value=2000-02] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("max", "2000-01");
      element.setAttribute("value", "2000-02");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month max=2000-01 value=1993-01] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("max", "2000-01");
      element.setAttribute("value", "1993-01");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week min=2016-W50 value=2016-W52] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("min", "2016-W50");
      element.setAttribute("value", "2016-W52");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week min=2016-W50 value=2016-W40] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("min", "2016-W50");
      element.setAttribute("value", "2016-W40");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week max=2016-W01 value=2016-W02] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("max", "2016-W01");
      element.setAttribute("value", "2016-W02");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week max=2016-W01 value=2016-W01] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("max", "2016-W01");
      element.setAttribute("value", "2016-W01");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time min=10:00 value=15:00] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("min", "10:00");
      element.setAttribute("value", "15:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time min=21:00 value=15:00] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("min", "21:00");
      element.setAttribute("value", "15:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time max=10:00 value=15:00] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("max", "10:00");
      element.setAttribute("value", "15:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time max=21:00 value=15:00] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("max", "21:00");
      element.setAttribute("value", "15:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local min=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("min", "2011-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local min=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("min", "2013-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local max=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("max", "2011-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":out-of-range";
      expectedResult = element.validity ? element.validity.rangeOverflow || element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local max=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :out-of-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isInRange', () => {
    it('input[type=number min=0 max=10 value=5] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number min=5 max=10 value=0] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number min=5 max=10 value=15] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=number max=10 value=15] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("max", "10");
      element.setAttribute("value", "15");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number max=10 value=5] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("max", "10");
      element.setAttribute("value", "5");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number min=10 value=5] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("min", "10");
      element.setAttribute("value", "5");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number min=2 value=5] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("min", "2");
      element.setAttribute("value", "5");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=number value=5] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute("value", "5");

      selector = ":in-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=2000-01-31] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("min", "2000-01-02");
      element.setAttribute("value", "2000-01-31");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=1999-01-31] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("min", "2000-01-02");
      element.setAttribute("value", "1999-01-31");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date max=2000-01-02 value=2000-01-31] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("max", "2000-01-02");
      element.setAttribute("value", "2000-01-31");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date max=2000-01-02 value=1999-01-31] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("max", "2000-01-02");
      element.setAttribute("value", "1999-01-31");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date value=1999-01-31] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "date");
      element.setAttribute("value", "1999-01-31");

      selector = ":in-range";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=date min=2000-01-02 value=2000-01-31 max=2001-01-02] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=date min=2000-01-02 value=1999-01-31 max=2001-01-02] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=date min=2000-01-02 value=2100-01-31 max=2001-01-02] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('input[type=month min=2000-01 value=2000-01] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("min", "2000-01");
      element.setAttribute("value", "2000-01");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month min=2000-01 value=1993-01] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("min", "2000-01");
      element.setAttribute("value", "1993-01");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month max=2000-01 value=2000-02] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("max", "2000-01");
      element.setAttribute("value", "2000-02");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=month max=2000-01 value=1993-01] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "month");
      element.setAttribute("max", "2000-01");
      element.setAttribute("value", "1993-01");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week min=2016-W50 value=2016-W52] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("min", "2016-W50");
      element.setAttribute("value", "2016-W52");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week min=2016-W50 value=2016-W40] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("min", "2016-W50");
      element.setAttribute("value", "2016-W40");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week max=2016-W01 value=2016-W02] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("max", "2016-W01");
      element.setAttribute("value", "2016-W02");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=week max=2016-W01 value=2016-W01] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "week");
      element.setAttribute("max", "2016-W01");
      element.setAttribute("value", "2016-W01");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time min=10:00 value=15:00] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("min", "10:00");
      element.setAttribute("value", "15:00");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time min=21:00 value=15:00] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("min", "21:00");
      element.setAttribute("value", "15:00");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time max=10:00 value=15:00] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("max", "10:00");
      element.setAttribute("value", "15:00");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=time max=21:00 value=15:00] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "time");
      element.setAttribute("max", "21:00");
      element.setAttribute("value", "15:00");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local min=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("min", "2011-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":in-range";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local min=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("min", "2013-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local max=2011-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "datetime-local");
      element.setAttribute("max", "2011-10-10T14:48:00");
      element.setAttribute("value", "2011-10-10T16:48:00");

      selector = ":in-range";
      expectedResult = element.validity ? !element.validity.rangeOverflow && !element.validity.rangeUnderflow : false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=datetime-local max=2013-10-10T14:48:00 value=2011-10-10T16:48:00] matches :in-range ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isInvalid', () => {
    it('input[type=text required] matches :invalid ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "text");
      element.setAttribute("required", "required");
      element.setAttribute("value", "");

      selector = ":invalid";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=text value=text required] matches :invalid ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isValid', () => {
    it('input[type=text required] matches :valid ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "text");
      element.setAttribute("required", "required");
      element.setAttribute("value", "");

      selector = ":valid";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=text value=text required] matches :valid ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isValid', () => {
    it('input[type=text required] matches :valid ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("input");
      element.setAttribute("type", "text");
      element.setAttribute("required", "required");
      element.setAttribute("value", "");

      selector = ":valid";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('input[type=text value=text required] matches :valid ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isLang', () => {
    it('body[lang="en"]>p matches :lang(en) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("body");
      element = document.createElement("p");

      parent.setAttribute("lang", "en");
      parent.appendChild(element);

      selector = ":lang(en)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('body[lang="en-us"]>p matches :lang(en) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("body");
      element = document.createElement("p");

      parent.setAttribute("lang", "en-us");
      parent.appendChild(element);

      selector = ":lang(en)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('body[lang="fr"]>p matches :lang(en) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("body");
      element = document.createElement("p");

      parent.setAttribute("lang", "fr");
      parent.appendChild(element);

      selector = ":lang(en)";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('body>p matches :lang(en) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("body");
      element = document.createElement("p");

      parent.appendChild(element);

      selector = ":lang(en)";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isNot', () => {
    it('p[class=test] matches :not(.example) ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not(.example)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('p[class=test] matches :not(div) ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not(div)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('p[class=test] matches :not([class=post]) ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not([class=post])";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('p[class=test] matches :not(.test) ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not(.test)";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('p[class=test] matches :not(p) ==> false', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not(p)";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('p[class=test] matches :not(:target) ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("p");
      element.setAttribute("class", "test");

      selector = ":not(:target)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('isNthChild', () => {
    it('div>p+p+p.target+p+p matches p:nth-child(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(3) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(odd) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(even) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(2n) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(3n) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(2) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(-2n+3) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-child(4n-1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isNthLastChild', () => {
    it('div>p+p+p+p+p.target matches p:nth-last-child(-n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p+p.target+p matches p:nth-last-child(-n+1) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(-2n+3) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(3) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(4n-1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(odd) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(even) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(2n) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>p+p+p.target+p+p matches p:nth-last-child(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isNthOfType', () => {
    it('div>span+span+p+p+span+p.target matches p:nth-of-type(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-of-type(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-of-type(1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-of-type(odd) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p+span+p+p.target matches p:nth-of-type(even) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p+span+p.target+p matches p:nth-of-type(2n) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-of-type(-n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-of-type(2n-1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('isNthLastOfType', () => {
    it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(-n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(2n-1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p+span+p.target+p matches p:nth-last-of-type(2n) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p+span+p+p.target matches p:nth-last-of-type(even) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(odd) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(1) ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(3) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

    it('div>span+span+p.target+p+span+p matches p:nth-last-of-type(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

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

  describe('check => CHILD_COMBINATOR', () => {
    it('div>p matches div > p:first-child ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");

      element = document.createElement("p");

      parent.appendChild(element);

      selector = "div>p:first-child";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('main>div>p matches main > div:nth-child(1) > p:nth-of-type(2n+1) ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");

      element = document.createElement("p");

      document.createElement("main").appendChild(parent);
      parent.appendChild(element);

      selector = "main > div:nth-child(1) > p:nth-of-type(2n+1)";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div.test > p matches .example > p:last-child ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");

      parent.appendChild(element);

      selector = ".example > p:last-child";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div.test > p matches .test > * ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");

      parent.appendChild(element);

      selector = ".test > *";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('check => ADJACENT_SIBLING_COMBINATOR', () => {
    it('div.test > h1 + p matches .test > h1 + p ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");

      parent.appendChild(document.createElement("h1"));
      parent.appendChild(element);

      selector = ".test > h1 + p";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div.test > p matches .test > * + p ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");

      parent.appendChild(element);

      selector = ".test > * + p";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div.test > h1 + p matches .test > * + * ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");

      parent.appendChild(document.createElement("h1"));
      parent.appendChild(element);

      selector = "div > * + *";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div.test > p matches .test > p + * ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("class", "test");

      element = document.createElement("p");
 
      parent.appendChild(element);

      selector = "div > p + *";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('check => DESCENDANT_COMBINATOR', () => {
    it('main>section>article>h1 matches section h1 ==> true', () => {
      let element, parent, parent2, parent3, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent3 = document.createElement("main");
      parent2 = document.createElement("section");
      parent = document.createElement("article");
      element = document.createElement("h1");

      parent3.appendChild(parent2);
      parent2.appendChild(parent);
      parent.appendChild(element);

      selector = "section h1";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('main.page>section>article>h1 matches .page h1 ==> true', () => {
      let element, parent, parent2, parent3, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent3 = document.createElement("main");
      parent2 = document.createElement("section");
      parent = document.createElement("article");
      element = document.createElement("h1");

      parent3.setAttribute("class", "page");

      parent3.appendChild(parent2);
      parent2.appendChild(parent);
      parent.appendChild(element);

      selector = ".page h1";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('main.page>section>article>h1 matches [lang=en] h1 ==> false', () => {
      let element, parent, parent2, parent3, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent3 = document.createElement("main");
      parent2 = document.createElement("section");
      parent = document.createElement("article");
      element = document.createElement("h1");

      parent3.setAttribute("class", "page");

      parent3.appendChild(parent2);
      parent2.appendChild(parent);
      parent.appendChild(element);

      selector = "[lang=en] h1";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('check => GENERAL_SIBLING_COMBINATOR', () => {
    it('div#example > h1 + p + a.btn matches #example h1 ~ .btn[href=\'#\'] ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("id", "example");

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      element.setAttribute("href", "#");

      parent.appendChild(document.createElement("h1"));
      parent.appendChild(document.createElement("p"));
      parent.appendChild(element);

      selector = "#example h1 ~ .btn[href=\'#\']";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div#example > h1 + p + a.btn matches #example h1 ~ footer ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("id", "example");

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      element.setAttribute("href", "#");

      parent.appendChild(document.createElement("h1"));
      parent.appendChild(document.createElement("p"));
      parent.appendChild(element);

      selector = "#example h1 ~ footer";
      expectedResult = false;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('checkAll', () => {
    it('div#example > h1 + p + a.btn matches #example p, #example .btn[href="#"] ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("id", "example");

      element = document.createElement("a");
      element.setAttribute("class", "btn");
      element.setAttribute("href", "#");

      parent.appendChild(document.createElement("h1"));
      parent.appendChild(document.createElement("p"));
      parent.appendChild(element);

      selector = "#example p, #example .btn[href=\"#\"]";
      expectedResult = true;

      actualResult = checker.checkAll(element, selector);

      expect(actualResult).toBe(expectedResult);
    });

    it('div#example > h1 + p + a.btn matches #test h1, article ==> false', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("div");
      parent.setAttribute("id", "example");

      element = document.createElement("h1");

      parent.appendChild(element);
      parent.appendChild(document.createElement("p"));

      selector = "#test h1, article";
      expectedResult = false;

      actualResult = checker.checkAll(element, selector);

      expect(actualResult).toBe(expectedResult);
    });
  });
});