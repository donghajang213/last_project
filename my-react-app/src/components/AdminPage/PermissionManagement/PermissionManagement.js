import React, { useState, useEffect } from 'react';
import './PermissionManagement.css';

function PermissionManagement() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 권한 요청 데이터 가져오기
    async function fetchRequests() {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/permissions`);
      const data = await response.json();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/permissions/${id}/approve`, { method: 'POST' });
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'approved' } : req)));
  };

  const handleReject = async (id) => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/permissions/${id}/reject`, { method: 'POST' });
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req)));
  };

  return (
    <div className="permission-management">
      <h2>권한정보</h2>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>역할</th>
            <th>인증번호</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.role}</td>
              <td>{request.role === 'vet' ? request.vetLicense : request.businessNumber}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(request.id)}>승인</button>
                    <button onClick={() => handleReject(request.id)}>거부</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionManagement;
