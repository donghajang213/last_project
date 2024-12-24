import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Clinic from './components/Clinic/Clinic';
import Store from './components/Store/Store';
import MyPage from './components/MyPage/MyPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* 메인페이지 */}
          <Route path="/signup" element={<Signup />} /> {/* 회원가입 */}
          <Route path="/login" element={<Login />} /> {/* 로그인 */}
          <Route path="/clinic" element={<Clinic />} /> {/* 클리닉 */}
          <Route path="/store" element={<Store />} /> {/* 스토어 */}
          <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
