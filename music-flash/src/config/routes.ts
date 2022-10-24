import IRoute from "../interfaces/route";
import ChangePasswordPage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import AddTutorial from "../pages/blog/createblog";
import BlogEntries from "../pages/blog/blog";
import AddBlog from "../pages/blog/createblog";

const routes: IRoute[] = [
    {
        path: '/',
        component: BlogEntries,
        name: 'Login Page',
        protected: false
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
    },
    {
        path: '/add',
        component: AddBlog,
        name: 'Add blog Post',
        protected: true
    },
    {
        path: '/blog',
        component: BlogEntries,
        name: 'Show blog Entries',
        protected: false
    }
];

export default routes;