import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoutes>
                <Dashboard />
            </ProtectedRoutes>
        )
    },
    {
        path: '/jobs/:id/edit',
        element: (
            <ProtectedRoutes>
                <UpdateJob />
            </ProtectedRoutes>
        )
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;