import IRoute from "../interfaces/route";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import Create from "../pages/blog/create";
import Own from "../pages/blog/own"
import Blog from "../pages/blog/blog";
import Admin from "../pages/blog/admin";
import AccountInfo from "../pages/blog/accountinfo";

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
    },
    {
        path: '/own',
        component: Own,
        name: 'My own Posts'
    },
    {
        path: '/admin',
        component: Admin,
        name: 'Admin'
    },
    {
        path: '/accountinfo',
        component: AccountInfo,
        name: 'Account Info'
    }
];

export default routes;