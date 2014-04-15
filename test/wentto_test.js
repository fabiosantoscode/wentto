'use strict';

var wentTo = require('../lib/wentto.js');

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.wentto = {
    setUp: function(done) {
        // setup here
        done();
    },
    'return': function (t) {
        t.expect(1)
        t.equal(typeof wentTo([function(){}]), 'function', 'should return a function')
        t.done()
    },
    'function still works': function (t) {
        var func = wentTo([function testFunc_withBlocks(go, a) {
            switch(a) {
                case 2:
                    return 2
            }
            if(a === 1) { return 1 }
        }])

        t.equal(func(1), 1)
        t.equal(func(2), 2)
        t.done()
    },
    'executes functions in series': function (t) {
        var a = 0

        wentTo([
            function () { a+= 1 },
            function () { a+= 1 },
            function () { a+= 1 }
        ])()

        t.equal(a, 3)
        t.done()
    },
    'simple going-to': function(t) {
        var arr = []
        wentTo([
            function (go) { arr.push(1); return go(2); },
            function () { arr.push(3); return null; },
            function (go) { arr.push(2); return go(1); }
        ])();

        t.deepEqual(arr, [1, 2, 3])
        t.done()
    },
    'going to the same function': function (t) {
        var a = 0;
        wentTo([
            function (go) {
                a += 1;
                if (a < 3) {
                    return go(0);
                }
            }
        ])();
        t.equal(a, 3)
        t.done()
    },
    'wentTo([["funcXName", funcX]])': function(t) {
        var arr = []
        wentTo([
            ['one', function (go) { arr.push(1); return go('three'); }],
            ['two', function () { arr.push(3); return null; }],
            ['three', function (go) { arr.push(2); return go('two'); }]
        ])();

        t.deepEqual(arr, [1, 2, 3])
        t.done()
    },
    'wentTo([["funcXName", funcX]]) (not all have labels)': function(t) {
        var arr = []
        wentTo([
            function (go) { arr.push(1); return go('three'); },
            ['two', function () { arr.push(3); return null; }],
            ['three', function (go) { arr.push(2); return go('two'); }]
        ])();

        t.deepEqual(arr, [1, 2, 3])
        t.done()
    }
};
