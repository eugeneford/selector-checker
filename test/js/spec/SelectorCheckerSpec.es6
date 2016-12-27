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

    it('section>div matches div:first-child ==> true', () => {
      let element, parent, selector, actualResult, expectedResult, checker = new SelectorChecker();

      parent = document.createElement("section");
      element = document.createElement("div");

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
});