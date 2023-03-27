import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CameraHandler from '../cameraHandler';
import ProductDisplay from '../productDisplay';
import ProductNotFound from '../productNotFound';
import { HistoryDisplay } from '../history';

const Scanner = () => (
  <main className="main__wrapper">
    <Switch>
      <Route exact path='/ProductScanner' component={CameraHandler}/>
      <Route exact path='/Kitchen/product/not-found' component={ProductNotFound} />
      <Route exact path='/Kitchen/product/:id' component={ProductDisplay}/>
      <Route exact path='/history' component={HistoryDisplay} />
    </Switch>
  </main>
);

export default Scanner;
