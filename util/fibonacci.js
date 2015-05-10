/**
 * Created by Rana on 15-05-09.
 */

/**
 * calculate fibonacci number for a given level
 * @param step1
 * @param step2
 * @param n
 * @param cb
 * @returns {*}
 */
exports.calculate = function calculate(step1, step2, n, cb){
    if(n <=0){
        return cb(step2);
    }

    return process.nextTick(function() {
        calculate(step2, step1+step2, --n, cb);
    });
}