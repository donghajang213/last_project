import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberInfo from './MemberInfo/MemberInfo';
import PermissionManagement from './PermissionManagement/PermissionManagement';
import ProductAdd from './ProductManagement/ProductAdd/ProductAdd';
import ProductDetails from './ProductManagement/ProductDetails/ProductDetails';
import ProductEditDelete from './ProductManagement/ProductEditDelete/ProductEditDelete';
import Payments from './Payments/Payments';
import ChatInfo from './ChatInfo/ChatInfo';
import Dashboard from './Dashboard/Dashboard';
import './AdminPage.css';

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState(null); // 열려있는 메뉴 상태

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu)); // 같은 메뉴 클릭 시 닫기
  };

  return (
    <div className="admin-page">
      {/* 좌측 네비게이션 바 */}
      <nav className="admin-sidebar">
        <ul>
          <li>
            <Link to="dashboard">대시보드</Link>
          </li>
          <li>
            <Link to="memberinfo">회원정보</Link>
          </li>
          <li>
            <Link to="permissionmanagement">권한 관리</Link>
          </li>

          {/* 상품 관리 */}
          <li className="menu-item">
            <div onClick={() => toggleMenu('productManagement')} className="menu-title">
              상품 관리
            </div>
            {activeMenu === 'productManagement' && (
              <ul className="submenu">
                <li>
                  <Link to="productmanagement/add">상품 등록</Link>
                </li>
                <li>
                  <Link to="productmanagement/detail">상품 상세 정보 보기</Link>
                </li>
                <li>
                  <Link to="productmanagement/editdelete">상품 수정 및 삭제</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="contentmanagement">콘텐츠 관리</Link>
          </li>
          <li>
            <Link to="payments">결제 관리</Link>
          </li>
          <li>
            <Link to="chatinfo">상담내역 관리</Link>
          </li>
        </ul>
      </nav>

      {/* 중앙 콘텐츠 영역 */}
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="memberinfo" element={<MemberInfo />} />
          <Route path="permissionmanagement" element={<PermissionManagement />} />
          {/* 상품 관리 하위 라우트 */}
          <Route path="productmanagement/add" element={<ProductAdd />} />
          <Route path="productmanagement/detail" element={<ProductDetails />} />
          <Route path="productmanagement/editdelete" element={<ProductEditDelete />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
