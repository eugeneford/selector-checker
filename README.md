# selector-checker
Module for fast element css selector matching

### CSS Identifiers Support Table

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
Attribute Selectors | \[attr operator value] | Yes

#### Combinators

Category | Example | Supports
-------- | ------- | --------
Adjacent sibling selectors | A + B | Yes
General sibling selectors | A ~ B | Yes
Child selectors | A > B | Yes
Descendant selectors | A B | Yes

#### Pseudo-Classes

Category | Example | Supports
-------- | ------- | --------
First Child | :first-child | Yes
Last Child | :last-child | Yes
Any | :any | No
Dir | :dir() | No
Default | :default | No
Indeterminate | :indeterminate | Yes
Checked | :checked | Yes
Active | :active | Yes (via StateMap)
Hover | :hover | Yes (via StateMap)
Focus | :focus | Yes (via StateMap)
Visited | :visited | Yes (via StateMap)
Disabled | :disabled | Yes
Enabled | :enabled | Yes
Empty | :empty | Yes
First | :first | No
First Of Type | :first-of-type | Yes
Fullscreen | :fullscreen | No



#### Pseudo-Elements