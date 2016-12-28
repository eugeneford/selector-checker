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

  describe('check', () => {
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

    it('a.btn.btn-primary matches *.btn ==> true', () => {
      let element, selector, actualResult, expectedResult, checker = new SelectorChecker();

      element = document.createElement("a");
      element.setAttribute("class", "btn btn-primary");
      selector = "*.btn";
      expectedResult = true;

      actualResult = checker.check(element, selector);

      expect(actualResult).toBe(expectedResult);
    });


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
});