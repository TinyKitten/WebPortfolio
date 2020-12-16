import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import IndexPage from './pages/index';
import WorksTeamKittenPage from './pages/works/teamkitten';
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
        <Route path="/works/teamkitten">
          <WorksTeamKittenPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
