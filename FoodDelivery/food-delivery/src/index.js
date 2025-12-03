import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Body from './components/Body';
import Error from './components/Error';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app ">
      <Header />
      <Body />
    </div>
  );
}

const appRoutes = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout />,
    errorElement:<Error />
  },
  {
    path:"/about-us",
    element:<AboutUs />
  },
  {
    path:"/contact",
    element:<Contact />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes}/>);
