[@use JSDoc](https://jsdoc.app/tags-returns.html)

# @returns

## Table of Contents

- [Synonyms](https://jsdoc.app/tags-returns.html#synonyms)
- [Syntax](https://jsdoc.app/tags-returns.html#syntax)
- [Overview](https://jsdoc.app/tags-returns.html#overview)
- [Examples](https://jsdoc.app/tags-returns.html#examples)
- [Related Links](https://jsdoc.app/tags-returns.html#related-links)

## Synonyms

```
@return
```

## Syntax

```
@returns [{type}] [description]
```

## Overview

The `@returns` tag documents the value that a function returns.

If you are documenting a generator function, use the [`@yields` tag](https://jsdoc.app/tags-yields.html) instead of this tag.

## Examples

Return value with a type

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

Return value with a type and description

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
    return a + b;
}
```

Return value with multiple types

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @param {boolean} retArr If set to true, the function will return an array
 * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
}
```

Returns a promise

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {Promise} Promise object represents the sum of a and b
 */
function sumAsync(a, b) {
    return new Promise(function(resolve, reject) {
        resolve(a + b);
    });
}
```

## Related Links

- [@param](https://jsdoc.app/tags-param.html)
- [@yields](https://jsdoc.app/tags-yields.html)