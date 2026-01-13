import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';
import Error from './components/Error';
import AboutUs from './components/AboutUs';
import RestaurentMenu from './components/RestaurentMenu'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import appStore from './redux/appStore';
import Cart from './components/Cart'

const AppLayout = () => {
  return (
    <Provider store={appStore}>
    <div className="app ">
      <Header />
      <Outlet />
    </div>
    </Provider>
  );
}

const appRoutes = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout />,
    errorElement:<Error />,
    children: [
    {
      path:"/about-us",
      element:<AboutUs />
    },
    {
      path:"/",
      element:<Body />
    },
    {
      path:"restaurent/:name",
      element:<RestaurentMenu />
    },
    {
      path:"/cart",
      element:<Cart />
    }
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes}/>);
