import FormInput from "components/common/FormInput";
import Modal from "components/common/Modal";
import React, { useReducer } from "react";
import userIcon from 'assets/icons/user.svg';
import eyeIcon from 'assets/icons/eye.svg';
import eyeOffIcon from 'assets/icons/eye-off.svg';
import Button from "components/common/Button";
import { validateData } from "helpers/validator";
import { isObjectEmpty } from "utils/utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "redux-store/hooks";
import { setUser } from "redux-store/slices/user";
import { setIsSiginIn } from "redux-store/slices/global";

interface InitialState {
    formData: {username: string, password: string},
    isLoading: boolean,
    errors: Object;
    showPassword: boolean
}
interface SignInModalProps {
    showModal: boolean;
    toggleModal: () => void;
    title?: string;

}
const SignInModal = (props: SignInModalProps) => {
    const { showModal, toggleModal, title } = props;
    const dispatch = useAppDispatch();
    const initialState: InitialState = {
        formData: {
            username: '',
            password: ''
        },
        showPassword: false,
        errors: {},
        isLoading: false
    };

    const [state, setState]: any = useReducer((state: InitialState, newState: InitialState) => ({ ...state, ...newState }), initialState);
    const { errors, formData, isLoading, showPassword} = state;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setState({
            formData: {
                ...formData,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ''
            }
        });
    };

    const toggleShowPassword = (): void => {
        setState({
            showPassword: !showPassword
        })
    };

    const submitForm = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        const rules = {
            username: 'required',
            password: 'required'
        };
        const messages = {
            'username.required': 'Username is required',
            'password.required': 'Password is required'
        };
        const validate = await validateData(formData, rules, messages);
        if (isObjectEmpty(validate)) {
            dispatch(setUser({username: formData?.username}));
            dispatch(setIsSiginIn(true));
            toast.success('Login successful');
            toggleModal();
        } else {
            setState({
                errors: validate
            });
        }
    };


    return(
        <Modal 
            showModal={showModal}
            toggleModal={toggleModal}
            title={title}
        >
            <div className="mt-4">
             <FormInput
                label="Username"
                placeholder="Enter your username"
                name="username"
                type="text"
                onChange={handleInputChange}
                icon={<img src={userIcon} className="w-[20px]" alt="" />}
                showErrorMessage={errors?.username}
                errorMessage={errors?.username}
             />
            <div className="mt-4">
            <FormInput
                label="Password"
                placeholder="Enter your password"
                name="password"
                type={showPassword? 'text': 'password'}
                onChange={handleInputChange}
                icon={(
                    <span className="cursor-pointer" onClick={()=> toggleShowPassword()}>
                        <img src={ showPassword? eyeIcon: eyeOffIcon} className="w-[20px]" alt="" /> 
                    </span>
                    )}
                showErrorMessage={errors?.password}
                errorMessage={errors?.password}
             />
            </div>
                
                <div className="mt-10 flex justify-end gap-x-3">
                    <Button
                        action={toggleModal}
                        text="Cancel"
                        disabled={isLoading}
                        className="dark-btn-outline rounded-md px-4 py-2"
                    />
                    <Button
                        action={(e: any) => submitForm(e)}
                        text="Save"
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="dark-btn text-white rounded-md px-4 py-2"
                    />
                </div> 
            </div>
        </Modal>
    )
};

export default SignInModal;