import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="admin-page-container">
      <nav className="admin-sidebar">
        <ul>
          <li><Link to="/admin/members">회원 정보</Link></li>
          <li><Link to="/admin/products">상품 정보</Link></li>
          <li><Link to="/admin/content">콘텐츠 관리</Link></li>
          <li><Link to="/admin/payments">결제 관리</Link></li>
          <li><Link to="/admin/chats">대화 정보</Link></li>
          <li><Link to="/admin/dashboard">대시보드</Link></li>
        </ul>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
