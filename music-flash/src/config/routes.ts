import IRoute from "../interfaces/route";
import ChangePasswordPage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/home";

const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/change',
        component: ChangePasswordPage,
        name: 'Change Password Page',
        protected: true
    },
    {
        path: '/logout',
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
    {
        path: '/forget',
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false
    }
];

export default routes;