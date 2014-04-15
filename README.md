# wentto [![Build Status](https://secure.travis-ci.org/fabiosantoscode/wentto.png?branch=master)](http://travis-ci.org/fabiosantoscode/wentto)

GOTO in Javascripts. Considered harmful.

## Getting Started
Install the module with: `npm install wentto`

```javascript
var wentto = require('wentto');

var doSomethingComplicated = wentto([
    function preCheck(go) {
        if (something) { return go('fail') }
        else if (somethingElse) { return go('fail') }
    },
    function doTheThing(go) {
        // Do the thing...
    },
    ['fail', function fail(go) {
        // Handle errors here
    }]
])
```

## Documentation

### require('wentto')([func0, func1, func2, func3, ...])
Pass it an array of functions. Make sure all of them accept the function "go" as a parameter.

`wentto` returns a function. That function will execute `func0`, then `func1`, etc. If one of these functions returns `go(<index>)`, execution continues at `func<index>`.

### return go(index)
Go to a function. The `index` argument is the index of the function in the array you passed to `wentto()`. So `return go(0)` to go back to the first function, `return go(2)` to go to the second function.

### return go(label)
Go to a function which has a name. See the example below, "naming your goto labels", to see how to give your functions a name.

### return go(indexOrLabel, args...)
Calls the next function (see the 2 above entries) with the arguments you passed.

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

### accepting parameters
just add them to every function after the "go" param

```javascript
var justSum = wentto([
    function (go, a, b) {
        return a + b;
    },
])

justSum(1, 2) // -> 3
```

### returning early
Just return anything which is not `undefined` or `go(somewhere)`

```javascript
var dontGoFar = wentto([
    function (go) { return 42 },
    function neverExecuted(go) {}
])
```

### naming your goto labels
It can become complicated to deal with numeric indices in a large wentto chain. 

To give names to your functions, just wrap them in a pair (`[name, yourFunction]`). You don't have to give a name to every function.

```javascript
var myFunc = wentto([
    function (go) { if (something) return go('fail') },
    ['fail', function (go) { throw something }]
])
```


## How does it work?
It's just a for loop which executes the input functions one by one. `go` is actually a class which wraps the index of the function you want to go to. If one of the functions returns an instance of `go`, the loop variable is changed (`i = newIndex + 1; continue;`).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 - 0.0.4 Passing arguments to the next function
 - 0.0.3 Documentation fix
 - 0.0.2 Adds the possibility of naming each function in the `wentto()` chain.
 - 0.0.1 Implemented core functionality: passing an array of functions and using go() to goto other functions.

## License
Copyright (c) 2014 Fábio Santos. Licensed under the MIT license.
