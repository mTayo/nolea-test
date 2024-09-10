import { useRoutes } from 'react-router-dom';
import {
    HomeRoutes,
    DashboardRoutes
} from './app-routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function Routes() {
    return useRoutes([
        DashboardRoutes,
        HomeRoutes
    ]);
}
