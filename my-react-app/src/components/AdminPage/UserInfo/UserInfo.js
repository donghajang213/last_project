import React, { useState, useEffect } from "react";
import "./UserInfo.css"; // 스타일 파일

function UserInfo() {
  const [users, setUsers] = useState([]); // 전체 사용자 데이터
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상세 정보
  const [filter, setFilter] = useState("all"); // 필터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 전체 사용자 데이터를 가져오는 함수
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/userinfo`);
        if (!response.ok) {
          throw new Error("회원 정보를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUsers(data.users || []); // 예상 구조에 맞게 데이터 설정
      } catch (err) {
        setError(err.message);
        setUsers([]); // 오류 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 특정 사용자 상세 데이터를 가져오는 함수
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/userinfo/${userId}`);
      if (!response.ok) {
        throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setSelectedUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // 필터링된 사용자 데이터
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        if (filter === "all") return true;
        return user.userRole === filter;
      })
    : [];

  return (
    <div className="user-info">
      <h1>회원 정보 관리</h1>

      {/* 필터 버튼 */}
      <div className="filter">
        <button onClick={() => setFilter("all")}>전체</button>
        <button onClick={() => setFilter("general")}>일반 회원</button>
        <button onClick={() => setFilter("vet")}>수의사</button>
        <button onClick={() => setFilter("seller")}>판매자</button>
      </div>

      {/* 로딩 상태 */}
      {loading && <p>데이터를 불러오는 중입니다...</p>}

      {/* 에러 상태 */}
      {error && <p className="error">오류 발생: {error}</p>}

      {/* 사용자 테이블 */}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>역할</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.userRole}</td>
                  <td>
                    <button onClick={() => fetchUserDetails(user.userId)}>자세히 보기</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  조건에 맞는 회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* 선택된 사용자 상세 정보 */}
      {selectedUser && (
        <div className="user-details">
          <h2>회원 상세 정보</h2>
          <p>
            <strong>이름:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>아이디:</strong> {selectedUser.userId}
          </p>
          <p>
            <strong>이메일:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>전화번호:</strong> {selectedUser.phoneNumber}
          </p>
          <p>
            <strong>주소:</strong> {selectedUser.address}
          </p>
          <p>
            <strong>상세 주소:</strong> {selectedUser.detailedAddress}
          </p>
          <p>
            <strong>역할:</strong> {selectedUser.userRole}
          </p>
          <p>
            <strong>가입일:</strong> {selectedUser.userRegdate}
          </p>
          <button onClick={() => setSelectedUser(null)}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
