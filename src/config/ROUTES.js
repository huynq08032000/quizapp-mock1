import { lazy } from "react";

const LoginComponent = lazy(()=> import('../components/LoginComponent/LoginComponent'))
const RegisterComponent = lazy(() => import('../components/RegisterComponent/RegisterComponent'))
const ForgotPasswordComponent = lazy(()=>import('../components/ForgotPassword/ForgotPasswordComponent'))
const PlayComponent = lazy(()=>import('../components/PlayComponent/MainComponent/PlayComponent'))
const AdminComponent = lazy(()=>import('../components/AdminComponent/MainComponent/AdminComponent'))
const AdminAddQuestionComponent = lazy(()=>import('../components/AdminComponent/MainComponent/AdminAddQuestionComponent'))
const UserAdminComponent = lazy(() => import('../components/AdminComponent/MainComponent/UserAdminComponent'))
const AdminAddUserComponent = lazy(() => import('../components/AdminComponent/MainComponent/AdminAddUserComponent'))

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
        path : 'admin/questions',
        component : <AdminComponent/>,
        role : ['admin']
    },
    {
        path : 'admin/addQuestion',
        component : <AdminAddQuestionComponent/>,
        role : ['admin']
    },
    {
        path : 'admin/users',
        component : <UserAdminComponent/>,
        role : ['admin']
    },
    {
        path : 'admin/addUser',
        component : <AdminAddUserComponent/>,
        role : ['admin']
    }
]
export default ROUTES;

