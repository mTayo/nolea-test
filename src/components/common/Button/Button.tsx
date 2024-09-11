/* eslint-disable react/button-has-type */
import React from 'react';
import './button.scss';

interface ButtonPropsType  {
    text?: string;
    type?: string;
    action: Function;
    className?: string;
    icon?: any;
    isLoading?: boolean;
    disabled?: boolean;
    animateClass?: string;
};

const Button = (props: ButtonPropsType): JSX.Element => {
    const { text, action, className, icon, isLoading, disabled, animateClass, ...rest } = props;

    const btnLoadingComponent = () => (
        <div className="flex justify-center w-full items-center">
            ... Loading
        </div>
    );
    return (
        
        <button
            // @ts-ignore
            type="button"
            // @ts-ignore
            onClick={action}
            className={`cursor-pointer ${className} ${disabled ? 'button-disabled' : ''} ${isLoading ? 'not-allowed' : ''}`}
            disabled={disabled}
            {...rest}
        >
            {isLoading ? <div>{btnLoadingComponent()}</div> : <div className="text-center w-full">{text}</div>}
        </button>
            
    );
};
export default Button;
