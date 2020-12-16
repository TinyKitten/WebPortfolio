import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import IndexPage from './pages/index';
import NoMatchPage from './pages/nomatch';
import WorksNearStationPage from './pages/works/nearstation';
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
        <Route path="/works/nearstation">
          <WorksNearStationPage />
        </Route>
        <Route>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
