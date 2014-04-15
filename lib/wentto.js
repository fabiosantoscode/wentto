/*
 * wentto
 * user/repo
 *
 * Copyright (c) 2014 Fábio Santos
 * Licensed under the MIT license.
 */

'use strict';

function indexOfFunc(name, funcList) {
    /* jshint unused: false */
    if (typeof name === 'number') {
        return name
    } else {
        throw new Error('Can\'t wentTo ' + name + '!')
    }
}

function wentTo(funcs) {
    return function () {
        var args = [].slice.call(arguments);
        args.unshift(module.exports.go)
        var ret;
        for (var i = 0, len = funcs.length; i < len; i++) {
            ret = funcs[i].apply(this, args)
            if (ret instanceof module.exports.go) {
                i = indexOfFunc(ret.to, funcs) - 1
            } else if (ret !== undefined) {
                return ret;
            }
        }
        return ret;
    }
}

// A class which wraps where we're going
function Go(to) {
    if (!(this instanceof Go)) {
        return new Go(to)
    }
    this.to = to;
}

module.exports = wentTo
module.exports.go = Go

