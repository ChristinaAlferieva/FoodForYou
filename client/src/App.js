import React from 'react';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainNavbar from './components/MainNavbar.js'
import MainFooter from './components/MainFooter.js'
import Auth from './components/Auth.js';
import Blogs from './components/blogs/Blogs.js';
import UserBlogs from './components/blogs/UserBlogs.js';
import BlogDetail from './components/blogs/BlogDetail.js';
import AddBlog from './components/blogs/AddBlog.js';
import UserKitchens from './components/kitchen/UserKitchens.js';
import KitchenDetail from './components/kitchen/KitchenDetail.js';
import AddKitchen from './components/kitchen/AddKitchen.js';
import ProductScanner from './pages/ProductScanner';
import ProductDisplay from './components/productDisplay';
import ProductNotFound from './components/productNotFound';
import Main from './pages/Main';
import Recipe from './pages/Recipe';
import Find from './components/Find';
import Found from './pages/Found';
import { HistoryDisplay } from './components/history';

import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <React.Fragment>
        <header>
          <MainNavbar />
        </header>
        <main>
          <Switch>
            {!isLoggedIn ? (
              <Route path="/auth">
                <Auth />
              </Route>
            ) : (
              <>
                <Route exact path="/blogs">
                  <Blogs />
                </Route>
                <Route exact path="/blogs/add">
                  <AddBlog />
                </Route>
                <Route exact path="/myBlogs">
                  <UserBlogs />
                </Route>
                <Route exact path="/myBlogs/:id">
                  <BlogDetail />
                </Route>
                <Route exact path="/kitchens/add">
                  <AddKitchen />
                </Route>
                <Route exact path="/myKitchens">
                  <UserKitchens />
                </Route>
                <Route exact path="/myKitchens/:id">
                  <KitchenDetail />
                </Route>
                <Route exact path="/Find">
                  <Find />
                </Route>
                <Route exact path="/ProductScanner">
                  <ProductScanner />
                </Route>
              </>
            )}
            <Route exact path="/ProductScanner">
              <ProductScanner />
            </Route>
            <Route exact path="/Find">
              <Find />
            </Route>
          </Switch>

          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path='/history' component={HistoryDisplay} />
            <Route exact path='/product/not-found' component={ProductNotFound} />
            <Route exact path='/product/:id' component={ProductDisplay} />
            <Route exact path="/Recipe/:name" component={Recipe} />
            <Route exact path="/Found/:find" component={Found} />
          </Switch>
        </main>
        <footer>
          <MainFooter />
        </footer>
      </React.Fragment>
    </div>
  );
}

export default App;
