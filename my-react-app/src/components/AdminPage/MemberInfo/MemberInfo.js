import React, { useState, useEffect } from 'react';
import './MemberInfo.css';

function MemberInfo() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'general', 'vet', 'seller'

  useEffect(() => {
    // 백엔드 API 호출로 회원 데이터 가져오기
    async function fetchMembers() {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/members`);
      const data = await response.json();
      setMembers(data);
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    if (filter === 'all') return true;
    return member.role === filter;
  });

  return (
    <div className="member-info">
      <h2>회원정보</h2>
      <div className="filter">
        <button onClick={() => setFilter('all')}>전체</button>
        <button onClick={() => setFilter('general')}>일반 회원</button>
        <button onClick={() => setFilter('vet')}>수의사</button>
        <button onClick={() => setFilter('seller')}>판매자</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>아이디</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.userId}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberInfo;
