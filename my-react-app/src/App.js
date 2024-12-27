import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Clinic from './components/Clinic/Clinic';
import GPTConsult from './components/GPTConsult/GPTConsult';
import VetConsult from './components/VetConsult/VetConsult';
import MyPage from './components/MyPage/MyPage';
import Header from './components/Header/Header';
import Store from './components/Store/Store';
import Products from './components/Store/Products/Products';
import Best from './components/Store/Best/Best';
import Event from './components/Store/Event/Event';


import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clinic" element={<Clinic />} />
        <Route path="/clinic/gpt" element={<GPTConsult />} />
        <Route path="/clinic/vet" element={<VetConsult />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 스토어 관련 라우팅 */}
        <Route path="/store" element={<Store />}>
          <Route path="/store/products" element={<Products />} />
          <Route path="/store/best" element={<Best />} />
          <Route path="/store/event" element={<Event />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
