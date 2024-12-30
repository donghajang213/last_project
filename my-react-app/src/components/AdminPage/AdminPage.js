import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberInfo from './MemberInfo/MemberInfo';
import PermissionManagement from './PermissionManagement/PermissionManagement';
import ProductManagement from './ProductManagement/ProductManagement';
import ContentManagement from './ContentManagement/ContentManagement';
import Payments from './Payments/Payments';
import ChatInfo from './ChatInfo/ChatInfo';
import Dashboard from './Dashboard/Dashboard';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="admin-page">
      {/* 좌측 네비게이션 바 */}
      <nav className="admin-sidebar">
        <ul>
          <li><Link to="dashboard">대시보드</Link></li>
          <li><Link to="memberinfo">회원정보</Link></li>
          <li><Link to="permissionmanagement">권한정보</Link></li>
          <li><Link to="productmanagement">상품정보</Link></li>
          <li><Link to="contentmanagement">콘텐츠 관리</Link></li>
          <li><Link to="payments">결제 관리</Link></li>
          <li><Link to="chatinfo">상담내역 관리</Link></li>
        </ul>
      </nav>

      {/* 중앙 콘텐츠 영역 */}
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="memberinfo" element={<MemberInfo />} />
          <Route path="permissionmanagement" element={<PermissionManagement />} />
          <Route path="productmanagement" element={<ProductManagement />} />
          <Route path="contentmanagement" element={<ContentManagement />} />
          <Route path="payments" element={<Payments />} />
          <Route path="chatinfo" element={<ChatInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
