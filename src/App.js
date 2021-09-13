import './App.css';
import Header from './components/Header/Header';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';
import Manage from './components/Manage/Manage.js';
import NotFound from './components/NotFount/NotFount'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductDetails from './components/Product Details/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivetRoute';
export const UserContext = createContext();

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState({});

  return (
    <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      {
        userLoggedIn.email &&
        <div className="mt-3 text-center w-100">
          <img style={{ width: '100px', borderRadius: '50%' }} src={userLoggedIn.photoURL} alt="" />
          <h3 className="mb-1 mt-1" style={{ fontStyle: 'italic' }} >Welcome, Mr. {userLoggedIn.displayName}</h3>
          <h4>Email : {userLoggedIn.email}</h4>
        </div>
      }

      <Router>
        <Header></Header>
        <Switch>

          <Route path="/shop" >
            <Shop />
          </Route>

          <Route path="/review" >
            <Review />
          </Route>

          <PrivateRoute path="/manage" >
            <Manage />
          </PrivateRoute>

          <Route path="/login" >
            <Login />
          </Route>

          <PrivateRoute path="/shipment" >
            <Shipment />
          </PrivateRoute>

          <Route exact path="/" >
            <Shop />
          </Route>

          <Route path="/product/:productkey" >
            <ProductDetails />
          </Route>

          <Route path="*" >
            <NotFound />
          </Route>

        </Switch>

      </Router>


    </UserContext.Provider>
  );
}

export default App;
