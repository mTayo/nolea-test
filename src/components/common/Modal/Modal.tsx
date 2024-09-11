/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer } from 'react';
import { Modal } from 'flowbite-react';
import cancelIcon from 'assets/icons/cancel-circle.svg';

interface AppModalProps {
    showModal: boolean;
    toggleModal: (event: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    children: JSX.Element;

}
const AppModal = (props: AppModalProps) => {

    const { showModal, toggleModal, title, children } = props;


    return (
        <Modal show={showModal} size="xl">
            <Modal.Body className="pt-4 px-3 md:px-6">
                <div className="flex relative justify-between items-center">
                    <h5 className="font-semibold text-3xl">{title || ''}</h5>
                    <div>
                        <div className="cursor-pointer z-10 bg-white " onClick={(e: React.MouseEvent<HTMLElement>) => toggleModal(e)}>
                            <img src={cancelIcon} alt="" className='w-[30px]' />
                        </div>
                    </div>
                </div>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default AppModal;
