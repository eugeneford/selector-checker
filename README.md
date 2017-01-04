# selector-checker
Module for fast element to selector matching (with custom :hover, :focus etc. handing)

[![NPM](https://nodei.co/npm/selector-checker.png?downloads=true)](https://nodei.co/npm/selector-checker/)

## What does this repo about
 
The SelectorChecker allows to match a specified DOM element with target css selector.

This module should be useful in cases when you need to handle, force or manipulate a custom hover, focus, active
or visited states.


## How to use

### Basic Example
The following example illustrates the principle the SelectorChecker.checkAll method
```javascript
checker = new SelectorChecker();
element = document.getElementById("target"); //=> <h1 class="heading-1">...</h1>
matches = checker.checkAll(element, "div, h1");
matches   //=> true
```

### Methods
SelectorChecker has a set of different methods you can find to be useful.

##### check(element, selector, stateMap);
Check if specified element matches target css selector

```javascript
checker = new SelectorChecker();
element = document.getElementById("target"); //=> <h1 class="heading-1">...</h1>
matches = checker.check(element, "h1");
matches   //=> true
```

##### checkAll(element, multipleSelector, stateMap);
Check if specified element matches target multiple css selector

```javascript
checker = new SelectorChecker();
element = document.getElementById("target"); //=> <h1 class="heading-1">...</h1>
matches = checker.checkAll(element, "div, h1");
matches   //=> true
```

### How a StateMap works

A StateMap is a plain object of following structure:

```javascript
var stateMap = {
    ":hover": [elem1, elem2, elemN],
    ":focus": [elem1, elem2, elemN],
    ":active": [elem1, elem2, elemN],
    ":visited": [elem1, elem2, elemN]
}
```

An approach with a stateMap instead of default browser behavior will be usefull in cases when you need to handle,
force or manipulate a custom hover, focus, active or visited states.

Links which are not in array of :visited state will automatically match :link pseudo-class.

### CSS Identifiers support table

Selector Checker is supporting the set of following css identifiers so far:

#### Basic Selectors

Category | Example | Supports
-------- | ------- | --------
Type Selectors | div, section | Yes
Class Selectors | .post, .btn | Yes
ID Selectors | #page, #element | Yes
Universal Selectors | * | Yes
Universal Namespaces | ns\|* \*\|\* | No
Attribute Selectors | \[attr operator value] | Yes

#### Combinators

Category | Example | Supports
-------- | ------- | --------
Adjacent sibling selectors | A + B | Yes
Child selectors | A > B | Yes
Descendant selectors | A B | Yes
General sibling selectors | A ~ B | Yes

#### Pseudo-Classes

Category | Example | Supports
-------- | ------- | --------
Active | :active | Yes (via StateMap)
Checked | :checked | Yes
Disabled | :disabled | Yes
Empty | :empty | Yes
Enabled | :enabled | Yes
First Child | :first-child | Yes
First Of Type | :first-of-type | Yes
Focus | :focus | Yes (via StateMap)
Hover | :hover | Yes (via StateMap)
Indeterminate | :indeterminate | Yes
In Range | :in-range | Yes
Invalid | :invalid | Yes
Last Child | :last-child | Yes
Last Of Type | :last-of-type | Yes
Lang | :lang | Yes
Link | :link | Yes (via StateMap)
Not | :not | Yes
Nth Child | :nth-child | Yes
Nth Last Child | :nth-last-child | Yes
Nth Of Type | :nth-of-type | Yes
Nth Last Of Type | :nth-last-of-type | Yes
Only Child | :only-child | Yes
Only Of Type | :only-of-type | Yes
Optional | :optional | Yes
Out Of Range | :out-of-range | Yes
Read Only | :read-only | Yes
Read Write | :read-write | Yes
Required | :required | Yes
Root | :root | Yes
Target | :target | Yes
Valid | :valid | Yes
Visited | :visited | Yes (via StateMap)
Any | :any | No
Dir | :dir() | No
Default | :default | No
First | :first | No
Fullscreen | :fullscreen | No
Scope | :scope | No

### Building
```javascript
npm install
```

### Development and Testing
* `npm run gulp` will launch dist building
* `npm run watch` will launch a watcher for dist building
* `npm run test` will launch unit-test building
* `npm run test-watch` will launch a watcher for unit-test building

## License

It's all about MIT stuff. (C) 2017 Eugene Ford