import React, { useState, useCallback, lazy, Suspense, useEffect} from 'react';
import './App.css';
import IndexPage from './components/IndexPage';
import List from './pages/List';
import AppHeadBar from './components/Header';
import Loading from './components/Loading';
import { getToken } from './utils';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [alreadyLogin, setAlreadyLogin] = useState(getToken() ? true : false);
  return (
    <BrowserRouter>    
      <div className="App">
          <AppHeadBar loginStatus={alreadyLogin} />
            <Suspense fallback={<Loading />}>
              {
                !alreadyLogin ? <IndexPage changeLoginStatus={setAlreadyLogin} /> : <List />
              }
            </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
