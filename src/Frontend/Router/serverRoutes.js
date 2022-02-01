import Main from '../containers/Main';
import NotFound from '../containers/NotFound';


const routes = [
    {
        exact: true,
        path: '/',
        component: Main
    },
    {
        name: 'NotFound',
        component: NotFound
    },
];


export default routes;