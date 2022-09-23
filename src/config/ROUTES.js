import LoginComponent from "../components/LoginComponent/LoginComponent";
import PlayComponent from "../components/PlayComponent/PlayComponent";
import RegisterComponent from "../components/RegisterComponent/RegisterComponent";

const ROUTES = [
    {
        path: 'login',
        component: <LoginComponent/>
    },
    {
        path : 'register',
        component : <RegisterComponent/>
    },
    {
        path : 'play',
        component : <PlayComponent/>
    }
]
export default ROUTES;
