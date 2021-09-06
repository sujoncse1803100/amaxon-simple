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

function App() {

  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>

          <Route path="/shop" >
            <Shop />
          </Route>

          <Route path="/review" >
            <Review />
          </Route>

          <Route path="/manage" >
            <Manage />
          </Route>

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


    </div>
  );
}

export default App;
