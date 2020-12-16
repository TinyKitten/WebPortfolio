import React from 'react';
import Header from './components/Header';
import IndexPage from './pages/index';

function App(): React.ReactElement {
  return (
    <>
      <Header />
      <IndexPage />
    </>
  );
}

export default App;
