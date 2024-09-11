import Button from "components/common/Button";
import ConfirmationModal from "components/common/ConfirmationModal";
import DropdownMenu from "components/common/DropdownMenu";
import React, { useReducer } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux-store/hooks";
import { setIsSiginIn } from "redux-store/slices/global";
import { setUser } from "redux-store/slices/user";
import AddNewsModal from "ui-chunks/AddNewsModal";
import SignInModal from "ui-chunks/SignInModal";
import { getInitials } from "utils/utils";

interface InitialState {
    showSignInModal: boolean;
    showAddNewsModal: boolean;
    showLogOutModal: boolean;
}
const HomePageLayout = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const { isSignedIn } = useAppSelector((state) => state.global);
    const dispatch = useAppDispatch();
    const initialState: InitialState = {
        showSignInModal: false,
        showAddNewsModal: false,
        showLogOutModal: false
    };
    const [state, setState]: any = useReducer((state: InitialState, newState: InitialState) => ({ ...state, ...newState }), initialState);
    const {showSignInModal, showAddNewsModal, showLogOutModal } = state;

    const toggleSignInModal = () => {
        setState({
            showSignInModal: !showSignInModal
        })
    };

    const toggleAddNewsModal = () => {
        setState({
            showAddNewsModal: !showAddNewsModal
        })
    };

    const toggleLogOutModal = () => {
        setState({
            showLogOutModal: !showLogOutModal
        })
    };

    const handleLogOut = () => {
        dispatch(setUser({}));
        dispatch(setIsSiginIn(false));
        toggleLogOutModal();
        toast.success('Account logged out successfully')
    };

    const dropdownMenuItems = () => {
        return [
            {
                label: 'Go to dashboard',
                // @ts-ignore
                action: ()=> navigate('/admin')
            },
            {
                label: 'Log out',
                action: ()=> toggleLogOutModal()
            }
        ];
    };

    return(
        <>
            <div className="antialiased relative">
                <div className='fixed top-0 z-10 w-full h-16  flex text-dark items-center  bg-white justify-between text-center px-5 shadow-md'>
                    <div className="font-bold text-lg">News Portal</div>
                    <div className="">
                        {isSignedIn? (
                            <div className="flex gap-x-3 items-center">
                                
                                <Button 
                                    text="Add news" 
                                    className="bg-dark py-1 px-3 rounded-md dark-btn text-white font-semibold" 
                                    action={toggleAddNewsModal}
                                />
                                
                                <div>
                                    <DropdownMenu
                                        data={dropdownMenuItems()}
                                        hasCustomContent
                                        position="bottom-right"
                                        // dropdownClassName="w-max"
                                        parentClassName="bg-white py-1 px-2 rounded-[32px]"
                                        anchor= {
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-purple-500 flex justify-center text-lg cursor-pointer items-center text-white rounded-full" >
                                                {getInitials(user?.username || '')}
                                            </div>
                                            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                        </div>
                                        }

                                    />
                                </div>
                            </div>
                        ): (
                            <>
                                <Button 
                                    text="Sign In" 
                                    className="bg-dark py-1 px-3 rounded-md dark-btn text-white font-semibold" 
                                    action={toggleSignInModal}
                                />
                            </>
                        )}
                       
                    </div>
                </div>
               
                <div className='w-full  px-5   min-h-[100vh]  h-full pt-24 lg:pt-16  w-full mx-auto'>
                    <Outlet />
                </div>
            </div>
            {showSignInModal && (
                <SignInModal
                    showModal={showSignInModal}
                    toggleModal={toggleSignInModal}
                    title="Sign In"
                />
            )}
            {showAddNewsModal && (
                <AddNewsModal
                    showModal={showAddNewsModal}
                    toggleModal={toggleAddNewsModal}
                    title="Add news"
                />
            )}

        <ConfirmationModal 
                title={"Logout of this portal"}
                showModal={showLogOutModal} 
                modalAction={handleLogOut}
                toggleModal={toggleLogOutModal} 
                text="This action will log you out of the system.  Press okay to continue or press cancel to halt"
                
            />
            
        </>
    )
};

export default HomePageLayout;
