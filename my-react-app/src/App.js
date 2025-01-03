import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // 전역 사용자 상태 관리를 위한 Context
import { DashboardProvider } from './contexts/DashboardContext'; // 대시보드 데이터를 관리하는 Context

// 메인
import MainPage from './components/MainPage/MainPage'; // 메인 페이지 컴포넌트
import Header from './components/Header/Header'; // 공통 헤더
import Login from './components/Login/Login'; // 로그인 페이지
import Clinic from './components/Clinic/Clinic'; // 클리닉 메인 페이지
import VetSelectWithGps from './components/Clinic/VetSelect/VetSelectWithGps' // 상담사 선택 페이지
import GPTConsult from './components/Clinic/GPTConsult/GPTConsult'; // GPT 상담 페이지
import VetConsult from './components/Clinic/VetConsult/VetConsult'; // 수의사 상담 페이지

// 마이페이지
import MyPage from './components/MyPage/MyPage'; // 마이페이지

// 스토어
import Store from './components/Store/Store'; // 스토어 메인 페이지
import Products from './components/Store/Products/Products'; // 스토어 - 전체 제품
import Best from './components/Store/Best/Best'; // 스토어 - 베스트 제품
import Event from './components/Store/Event/Event'; // 스토어 - 이벤트
import Cart from './components/Store/Cart/Cart'; // 스토어 - 장바구니

// 회원가입
import SignupSelection from './components/Signup/SignupSelection/SignupSelection'; // 회원가입 유형 선택 페이지
import SignupGeneral from './components/Signup/SignupGeneral/SignupGeneral'; // 일반 회원가입 페이지
import SignupVet from './components/Signup/SignupVet/SignupVet'; // 수의사 회원가입 페이지
import SignupSeller from './components/Signup/SignupSeller/SignupSeller'; // 판매자 회원가입 페이지

// 관리자
import AdminPage from './components/AdminPage/AdminPage'; // 관리자 메인 페이지
import MemberInfo from './components/AdminPage/MemberInfo/MemberInfo'; // 회원 정보 관리
import PermissionManagement from './components/AdminPage/PermissionManagement/PermissionManagement'; // 권한 관리
import ProductManagement from './components/AdminPage/ProductManagement/ProductManagement'; // 상품 정보 관리
import ContentManagement from './components/AdminPage/ContentManagement/ContentManagement'; // 콘텐츠 관리
import Payments from './components/AdminPage/Payments/Payments'; // 결제 관리
import ChatInfo from './components/AdminPage/ChatInfo/ChatInfo'; // 대화 내역 관리
import Dashboard from './components/AdminPage/Dashboard/Dashboard'; // 대시보드
import ProtectedRoute from './components/ProtectedRoute'; // 인증된 사용자를 위한 보호된 라우트

import './App.css'; // 스타일링

function App() {
  return (
    <UserProvider> {/* UserProvider로 전역 상태를 감쌈 */}
      <DashboardProvider> {/* DashboardProvider로 관리자 페이지 관련 데이터를 감쌈 */}
        <div className="App">
          <Header /> {/* 모든 페이지에서 공통으로 사용되는 헤더 */}
          <Routes>
            {/* 메인 관련 라우팅 */}
            <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}
            <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
            <Route path="/clinic" element={<Clinic />} /> {/* 클리닉 메인 페이지 */}
            <Route path="/clinic/vetselect" element={<VetSelectWithGps />} /> {/* 수의사 선택 페이지*/}
            <Route path="/clinic/gpt" element={<GPTConsult />} /> {/* GPT 상담 페이지 */}
            <Route path="/clinic/vet" element={<VetConsult />} /> {/* 수의사 상담 페이지 */}
            <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}

            {/* 회원가입 관련 라우팅 */}
            <Route path="/signup" element={<SignupSelection />} /> {/* 회원가입 선택 페이지 */}
            <Route path="/signup/general" element={<SignupGeneral />} /> {/* 일반 회원가입 페이지 */}
            <Route path="/signup/vet" element={<SignupVet />} /> {/* 수의사 회원가입 페이지 */}
            <Route path="/signup/seller" element={<SignupSeller />} /> {/* 판매자 회원가입 페이지 */}

            {/* 스토어 관련 라우팅 */}
            <Route path="/store" element={<Store />}>
              <Route path="products" element={<Products />} /> {/* 전체 제품 페이지 */}
              <Route path="best" element={<Best />} /> {/* 베스트 제품 페이지 */}
              <Route path="event" element={<Event />} /> {/* 이벤트 페이지 */}
              <Route path="cart" element={<Cart />} /> {/* 장바구니 페이지 */}
            </Route>

            {/* 관리자 페이지 */}
            <Route path="/admin/*" element={<ProtectedRoute element={<AdminPage />} />}>
              <Route path="dashboard" element={<Dashboard />} /> {/* 대시보드 */}
            </Route>
          </Routes>
        </div>
      </DashboardProvider>
    </UserProvider>
  );
}

export default App;
