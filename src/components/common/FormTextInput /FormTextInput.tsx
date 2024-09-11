/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from 'react';

import './form-text.scss';

/**
 *
 * @param {*} param0
 */
const FormTextInput = forwardRef(
    (
        {
    
            label = '',
            labelClass = 'label-class',
            icon = '',
            inputName,
            inputType,
            inputClass = '',
            showErrorMessage = true,
            errorMessage= '',
            placeholderIcon = '',
            required = false,
            onChange,
            ...rest
        }: any,
        ref
    ) => (
        <div className='form-text-group'>
            <label htmlFor={inputName} className="text-base  font-medium">{label}</label>
         
            <div className="relative mt-1 ">
                <textarea
                    className={`block w-full py-3.5 pl-3 pr-14 form-input  focus:border-[#000000]  border border-[#000000]  text-sm  border rounded-lg focus:ring-0`}
                    name={inputName}
                    type={inputType}
                    onChange={onChange}
                    {...rest}
                />
                
            </div>
            <div className="text-red-500 text-sm ">{errorMessage  || ''}</div>
        </div>
    )
);

export default FormTextInput;
