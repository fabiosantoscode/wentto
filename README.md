# wentto [![Build Status](https://secure.travis-ci.org/fabiosantoscode/wentto.png?branch=master)](http://travis-ci.org/fabiosantoscode/wentto)

GOTO in Javascripts. Considered harmful.

## Getting Started
Install the module with: `npm install wentto`

```javascript
var wentto = require('wentto');

var doSomethingComplicated = wentto([
    function preCheck(go) {
        if (something) { go(2 /* fail */) }
        else if (somethingElse) { go(2 /*fail*/) }
    },
    function doTheThing(go) {
        // Do the thing...
    },
    function fail(go) {
        // Handle errors here
    }
])
```

## Documentation

### require('wentto')([func0, func1, func2, func3, ...])
Pass it an array of functions. Make sure all of them accept the function "go" as a parameter.

`wentto` returns a function. That function will execute `func0`, then `func1`, etc. If one of these functions returns `go(<index>)`, execution continues at `func<index>`.

### go(index)
Go to a function. The `index` argument 

## Examples
### achieving a loop
```javascript
var a = 0;
var doSomethingUntil = wentto([
    function doSomething(go) {
        a += 1;
    },
    function until(go) {
        if (a < 3) {
            return go(0);
        }
    }
])

doSomethingUntil();

a // -> 3
```

### using parameters (just add them to every function after the "go" param)
```javascript
var justSum = wentto([
    function (go, a, b) {
        return a + b;
    },
])

justSum(1, 2) // -> 3
```

## How does it work?
It's just a for loop which executes the input functions one by one. `go` is actually a class which wraps the index of the function you want to go to. If one of the functions returns an instance of `go`, the loop variable is changed (`i = newIndex + 1; continue;`).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 - 0.0.0 Implemented core functionality: passing an array of functions and using go() to goto other functions.

## License
Copyright (c) 2014 Fábio Santos. Licensed under the MIT license.
