import React, { useContext } from 'react';
import { DashboardContext } from '../../../contexts/DashboardContext';
import './Dashboard.css';

function Dashboard() {
  const { dashboardData, loading, error } = useContext(DashboardContext);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  if (error) {
    return <div>오류 발생: {error}</div>; // 에러 메시지 표시
  }

  return (
    <div className="dashboard">
      <h1>대시보드</h1>
      <div className="dashboard-summary">
        {dashboardData.map((item, index) => (
          <div key={index} className="dashboard-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span>{item.count}개</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
