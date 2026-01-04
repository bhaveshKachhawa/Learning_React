import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';
import Error from './components/Error';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import RestaurentMenu from './components/RestaurentMenu'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app ">
      <Header />
      <Outlet />
    </div>
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
      path:"/contact",
      element:<Contact />
    },
    {
      path:"/",
      element:<Body />
    },
    {
      path:"restaurent/:name",
      element:<RestaurentMenu />
    }
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes}/>);
