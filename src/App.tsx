import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import IndexPage from './pages/index';

function App(): React.ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
