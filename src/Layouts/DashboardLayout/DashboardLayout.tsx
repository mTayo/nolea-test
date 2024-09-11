import Button from "components/common/Button";
import ConfirmationModal from "components/common/ConfirmationModal";
import DropdownMenu from "components/common/DropdownMenu";
import React, { useReducer } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux-store/hooks";
import { setIsSiginIn } from "redux-store/slices/global";
import { setUser } from "redux-store/slices/user";
import AddNewsModal from "ui-chunks/AddNewsModal";
import SignInModal from "ui-chunks/SignInModal";
import { getInitials } from "utils/utils";
import { sideBarMenuData } from "./sideBarMenuData";

interface InitialState {
    showSignInModal: boolean;
    showAddNewsModal: boolean;
    showLogOutModal: boolean;
}
const DashboardLayout = () => {
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
    const {showSignInModal,  showLogOutModal } = state;

    

    const toggleSignInModal = () => {
        setState({
            showSignInModal: !showSignInModal
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
        navigate('/home');
        toast.success('Account logged out successfully')
    };

    const dropdownMenuItems = () => {
        return [
            
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

            <aside className="hidden pt-16 w-[70px] text-white border border-right shadow-sm fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block">
                <div className="p-4 min-h-full">
                <div className="mt-6">
                        {sideBarMenuData.map((sidebarMenu, _i) => (
                            <div className={`${_i > 0? 'mt-5':''} `}  key={_i}>
                                <Link to={sidebarMenu?.path} className={`${_i > 0? 'mt-6':''}`}>
                                    <div className={`flex gap-x-4 items-center text-sm font-medium p-2 py-1 `}>
                                        <div className={`text-black `}>{sidebarMenu?.icon}</div>
                                       
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="pt-16 sm:pl-[70px]">
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </div>
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

export default DashboardLayout;
