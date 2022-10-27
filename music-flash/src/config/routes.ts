import IRoute from "../interfaces/route";
import ChangePasswordPage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import Create from "../pages/blog/create"
import Blog from "../pages/blog/blog";

const routes: IRoute[] = [
    {
        path: '/',
        component: Blog,
        name: 'Blog Page'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'Register Page'
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'Login Page'
    },
    {
        path: '/change',
        component: ChangePasswordPage,
        name: 'Change Password Page'
    },
    {
        path: '/logout',
        component: LogoutPage,
        name: 'Logout Page'
    },
    {
        path: '/forget',
        component: ForgotPasswordPage,
        name: 'Forgot Password Page'
    },
    {
        path: '/add',
        component: Create,
        name: 'Add blog Post'
    }
];

export default routes;