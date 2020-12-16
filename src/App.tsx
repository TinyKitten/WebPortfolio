import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import IndexPage from './pages/index';
import WorksTrainLCDPage from './pages/works/trainlcd';

function App(): React.ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/works/trainlcd">
          <WorksTrainLCDPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
