/**
 * Provides time-related utility functions.
 */
export class Time{
	/**
	 * Returns the number of milliseconds that have elapsed since the Unix epoch (January 1, 1970).
	 * @returns {number}
	 */
	millisecs(){
		return new Date().getTime();
	}
}