import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const Header = React.lazy(() => import('./components/Header'));
const IndexPage = React.lazy(() => import('./pages/index'));
const NoMatchPage = React.lazy(() => import('./pages/nomatch'));
const WorksNearStationPage = React.lazy(
  () => import('./pages/works/nearstation')
);
const WorksTeamKittenPage = React.lazy(
  () => import('./pages/works/teamkitten')
);
const WorksTrainLCDPage = React.lazy(() => import('./pages/works/trainlcd'));

function App(): React.ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
