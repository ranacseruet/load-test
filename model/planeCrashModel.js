/**
 * Created by Rana on 15-05-09.
 */

'use strict';

var fs = require('fs');
var config = require('../config');
var storageFileName = config.fileName;
var cache = require('../util/cache');

var fbnc      = require('../util/fibonacci');
var fbncLevel = config.fibonacciLevel;

var cacheKey = 'plane-crash';

/**
 * read article
 * @param cb
 */
exports.read = function(cb){

    var content = cache.get(cacheKey);
    if(content) {
        cb(content);
    }
    else {
        fs.readFile(storageFileName, 'utf8', function(err, data) {
            if (err) throw err;
            var result = fbnc.calculate(1, 1, fbncLevel, function(){
                cb(data);
                cache.set(cacheKey, data);
            });
        });
    }
};

/**
 * Write/Update article
 * @param content
 * @param cb
 */
exports.write = function(content, cb){
    cache.set(cacheKey, content);
    fs.writeFile(storageFileName, content, function(err){
        if (err) throw err;
        cb(true);
    });
};