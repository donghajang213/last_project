import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <p>관리자를 위한 다양한 데이터를 시각화하여 표시합니다.</p>
      {/* 하위 컴포넌트가 렌더링되는 영역 */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
