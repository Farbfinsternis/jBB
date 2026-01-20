/**
 * Provides a collection of math utility functions, emulating BlitzBasic's syntax.
 */
export class Maths{
    /**
     * Returns a random integer between min and max (inclusive).
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number}
     */
    rand(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Returns the value of PI.
     * @returns {number}
     */
    pi(){
        return Math.PI;
    }

    /**
     * Converts a value to a floating-point number.
     * @param {*} value The value to convert.
     * @returns {number}
     */
    float(value){
        return parseFloat(value);
    }

    /**
     * Converts a value to an integer.
     * @param {*} value The value to convert.
     * @returns {number}
     */
    int(value){
        return parseInt(value);
    }
}