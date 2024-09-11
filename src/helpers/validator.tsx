/* eslint-disable no-return-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { validateAll, extend } from 'indicative/validator';
import { getValue } from 'indicative-utils';
import validator from 'validator';

extend('isEmail', {
    async: true,
    /**
     * @param {*} args
     * @returns {args} args
     */
    compile(args: any) {
        return args;
    },

    /**
     * @param {*} data data object
     * @param {*} field fields
     * @returns {Boolean} bool
     */
    async validate(data: any, field: any) {
        const fieldValue = getValue(data, field);
        return validator.isEmail(fieldValue);
    }
});



/**
 * Method to validate form data
 * @param {*} data
 * @param {*} rules
 * @param {*} messages
 * @returns {object} error
 */
// eslint-disable-next-line import/prefer-default-export
export const validateData = async (data: object, rules: any, messages: any, removeAdditional = false) =>
    validateAll(data, rules, messages, { removeAdditional })
        .then(() => ({}))
        .catch((errors) => {
            const formattedErrors: any = {};

            errors.forEach((error: any) => (formattedErrors[error.field] = error.message));

            return formattedErrors;
        });
