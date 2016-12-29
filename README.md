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
Link | :link | Yes (via StateMap)
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

#### Pseudo-Elements