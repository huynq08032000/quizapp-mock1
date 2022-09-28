import AdminComponent from "../components/AdminComponent/MainComponent/AdminComponent";
import ForgotPasswordComponent from "../components/ForgotPassword/ForgotPasswordComponent";
import LoginComponent from "../components/LoginComponent/LoginComponent";
import PlayComponent from "../components/PlayComponent/MainComponent/PlayComponent";
import RegisterComponent from "../components/RegisterComponent/RegisterComponent";

const ROUTES = [
    {
        path: 'login',
        component: <LoginComponent />
    },
    {
        path: 'register',
        component: <RegisterComponent />
    },
    {
        path: 'forgot',
        component: <ForgotPasswordComponent />
    },
    {
        path : 'play',
        component : <PlayComponent/>, 
        role : ['user','admin']
    },
    {
        path : 'admin',
        component : <AdminComponent/>,
        role : ['admin']
    },
]
export default ROUTES;

