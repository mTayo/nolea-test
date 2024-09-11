
import Modal from "components/common/Modal";
import React, { useReducer } from "react";
import Button from "../Button";

interface InitialState {
    isLoading: boolean,
}

interface SignInModalProps {
    showModal: boolean;
    toggleModal: () => void;
    modalAction : () => void;
    title?: string;
    text?: string;
    children?: JSX.Element;

}
const ConfirmationModal = (props: SignInModalProps) => {
    const { showModal, toggleModal, title, modalAction, text } = props;
    const initialState: InitialState = {
        isLoading: false
    };

    const [state, setState]: any = useReducer((state: InitialState, newState: InitialState) => ({ ...state, ...newState }), initialState);
    const { isLoading } = state;

    return(
        <Modal 
            showModal={showModal}
            toggleModal={toggleModal}
            title={title}
        >
            <div>
                <div className="my-5">{text}</div>
                <div className="flex justify-end gap-x-5 items-center">
                    <Button text="Cancel" className="dark-btn-outline py-1.5 px-2 rounded-lg" isLoading={isLoading} action={toggleModal} />
            
                    <Button text="Continue" className="dark-btn  py-1.5 px-2 rounded-lg text-white" isLoading={isLoading} action={modalAction} />
                
                </div>
            </div>
        </Modal>
    )
};

export default ConfirmationModal;