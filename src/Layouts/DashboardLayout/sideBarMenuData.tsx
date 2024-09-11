import { 
    DashboardIcon, 
    UserManagementIcon 
} from "./sidebar-icons";

export const sideBarMenuData = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        title: 'Overview',
        match: '/admin/dashboard',
        icon: <DashboardIcon />
    },
    {
        name: 'User Management',
        path: '/admin/user-management',
        title: 'User Management',
        match:  '/admin/user-management',
        icon: <UserManagementIcon />
    },
   ];
