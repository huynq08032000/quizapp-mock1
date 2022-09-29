import { lazy } from "react";

const LoginComponent = lazy(()=> import('../components/LoginComponent/LoginComponent'))
const RegisterComponent = lazy(() => import('../components/RegisterComponent/RegisterComponent'))
const ForgotPasswordComponent = lazy(()=>import('../components/ForgotPassword/ForgotPasswordComponent'))
const PlayComponent = lazy(()=>import('../components/PlayComponent/MainComponent/PlayComponent'))
const AdminComponent = lazy(()=>import('../components/AdminComponent/MainComponent/AdminComponent'))
const AdminAddQuestionComponent = lazy(()=>import('../components/AdminComponent/MainComponent/AdminAddQuestionComponent'))

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
    {
        path : 'admin/addQuestion',
        component : <AdminAddQuestionComponent/>,
        role : ['admin']
    },
]
export default ROUTES;

