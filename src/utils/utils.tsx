

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isArrayEmpty = (arr: any) => Array.isArray(arr) && arr.length === 0;

/**
 * Checks if an object has no set properties
 * @param {*} obj The object to test
 * @returns {*} boolean
 */
export const isObjectEmpty = (obj = {}) => !obj || Object.keys(obj).length === 0;


// /**
//  * Ensure that a given string matches the character count and ellipsized at that point
//  * @param {String} text Target text
//  * @param {Number} numChars Number of characters needed
//  * @returns {String} Truncated text
//  */
export const truncateMultilineText = (text: string, numChars: number) => {
    if (!text) return '';

    // Because '...' will be appended to long strings,
    // this ensures that the entire character count is as specified
    const maxStringLength = numChars - 3;

    return maxStringLength > text.length ? text : `${text.trim().substring(0, maxStringLength)}...`;
};

/**
 * Function that does nothing:
 * Useful as a default value for an optional Component prop
 * that's of type - function
 * Or for stubbing function calls in Tests and Storybook Docs
 * @returns {*} undefined
 */
export const noOp = () => {};


// /**
//  * Method to Extract initials from Full name
//  * @param {string} name name
//  * @returns {string} initials
//  */
export const getInitials = (name: string) => {
    const fullName = name.split(' ');
    const initials = fullName[0].substring(0, 1).toUpperCase();

    if (fullName.length > 1) {
        initials.concat(fullName[fullName.length - 1].substring(0, 1).toUpperCase());
    }

    return initials;
};



export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const scrollDown = () => {
    window.scrollTo({
        // bottom:0,
        behavior: 'smooth'
    });
};


export const capitalizeFirstLetter = (string = '') => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const extractFirstLetter = (string = '') => {
    if (string) {
        return string.charAt(0).toUpperCase();
    }

    return string;
};

export const replaceSpace = (str = '') =>
    // Empty
    str.split(' ').join('');


