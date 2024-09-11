import { userData } from "data";
import IUser from "models/IUser";
import React from "react";
import { capitalizeFirstLetter } from "utils/utils";

const UserListing = () => (
    <div>
        <h2 className="mb-4 mt-5 font-bold text-3xl">User management</h2>
        <table className="table mt-6 w-full">
        <thead>
            <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody className="relative">
            {userData?.map((datum:IUser, _id: number) => (
                <tr key={_id}>
                    <td className="pl-3 py-2">
                        <div className="user-info">
                            <div className="user-info__img">
                                <img src="https://mui.com/static/images/avatar/1.jpg"  alt="User Img" />
                            </div>
                            <div className="user-info__basic">
                                <h5 className="mb-0">{capitalizeFirstLetter(datum?.username)}</h5>
                                <p className="text-muted mb-0 text-left text-xs">{datum?.email}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        {datum?.email}
                    </td>
                    <td>{capitalizeFirstLetter(datum?.role)}</td>
                    <td>
                    <button className="btn btn-primary btn-sm">
                        {capitalizeFirstLetter(datum?.status)}
                        </button>
                    </td>
                    <td>
                        <div className="flex text-black items-center gap-x-3">
                        
                            <div className="cursor-pointer">
                                <DeleteIcon />
                            </div>
                            <div className="cursor-pointer" >
                                <EditIcon />
                            </div>
                        
                            
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
);

export default UserListing;

export const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M13.3335 16V22.6667M18.6668 16V22.6667M5.3335 9.33333H26.6668M8.00016 13.3333V24C8.00016 26.2092 9.79103 28 12.0002 28H20.0002C22.2094 28 24.0002 26.2092 24.0002 24V13.3333M12.0002 6.66667C12.0002 5.19391 13.1941 4 14.6668 4H17.3335C18.8063 4 20.0002 5.19391 20.0002 6.66667V9.33333H12.0002V6.66667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6695 6.18928C23.5281 5.04791 21.6776 5.04791 20.5362 6.18928L6.74362 19.9819C6.33562 20.3899 6.05751 20.9095 5.94435 21.4753L5.37242 24.335C5.09974 25.6983 6.30177 26.9004 7.66513 26.6277L10.5248 26.0558C11.0906 25.9426 11.6102 25.6645 12.0182 25.2565L25.8108 11.4639C26.9522 10.3225 26.9522 8.47202 25.8108 7.33064L24.6695 6.18928ZM21.9139 7.56703C22.2944 7.18658 22.9112 7.18658 23.2917 7.56703L24.433 8.7084C24.8136 9.08885 24.8136 9.70569 24.433 10.0862L21.8303 12.6889L19.3113 10.1697L21.9139 7.56703ZM17.9335 11.5475L8.12137 21.3596C7.98537 21.4956 7.89267 21.6688 7.85495 21.8575L7.28301 24.7171L10.1427 24.1451C10.3313 24.1074 10.5045 24.0148 10.6405 23.8788L20.4526 14.0666L17.9335 11.5475Z" fill="black"/>
    </svg>
)