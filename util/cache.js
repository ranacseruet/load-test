/**
 * Created by Rana on 15-05-09.
 */
var cacheTime = require('../config').cacheTime;

var data = {};
var timeOutHandler;

exports.set = function(key, content){
    data[key] = content;

    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(function(){
        //invalidate cache
        data[key] = null;
    }, cacheTime);
};

exports.get = function(key) {
    return data[key];
}

