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
    // Deal with a list of pairs
    if (typeof name === 'number') {
        return name
    } else if (typeof name === 'string') {
        for (var i = 0, len = funcList.length; i < len; i++) {
            if (funcList[i][0] === name) {
                return i;
            }
        }
    } else {
        throw new Error('Can\'t wentTo ' + name + '!')
    }
}

function wentTo(funcs) {
    return function () {
        var args = [].slice.call(arguments)
        args.unshift(module.exports.go)
        var ret
        var goArgs = null
        for (var i = 0, len = funcs.length; i < len; i++) {
            if (typeof funcs[i] === 'function') {
                ret = funcs[i].apply(this, goArgs || args)
            } else if (funcs[i].length === 2) {
                ret = funcs[i][1].apply(this, goArgs || args)
            }

            if (ret instanceof module.exports.go) {
                i = indexOfFunc(ret.to, funcs) - 1
                if (ret.args) {
                    goArgs = [module.exports.go].concat(ret.args)
                }
            } else if (ret !== undefined) {
                return ret;
            }
        }
        return ret;
    }
}

// A class which wraps where we're going
function Go(to, args) {
    if (!(this instanceof Go)) {
        if (arguments.length > 1) {
            return new Go(to, [].slice.call(arguments, 1))
        } else if (arguments.length === 1) {
            return new Go(to)
        } else {
            throw new Error('wentTo: You must call go() with an argument!')
        }
    }
    this.args = args;
    this.to = to;
}

module.exports = wentTo
module.exports.go = Go

