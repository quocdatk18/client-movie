import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import DetailsListVideoPage from './pages/DetailsListVideoPage';
import DetailsVideoPage from './pages/DetailsVideoPage';
import FilterPage from './pages/FilterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyVideoPage from './pages/MyVideoPage';
import ProfilePage from './pages/ProfilePage';
import SigupPage from './pages/SigupPage';
import { loadUser } from './store/reducer/users/userSlice';
import Loading from '../src/components/loading/Loading'

function App() {
  const { loading } = useSelector(state => state.loading)

  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      await dispatch(loadUser())

    })()
  }, [dispatch])

  return (
    <div className="App">
      {loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<FilterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<SigupPage />} />
          <Route path='/myvideo' element={<MyVideoPage />} />
          <Route path='/video/:id' element={<DetailsVideoPage />} />
          <Route path='/videoID/:id/:chapter' element={<DetailsListVideoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
