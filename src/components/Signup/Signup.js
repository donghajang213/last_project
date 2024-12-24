import React, { useState } from 'react'; // React와 useState 훅을 가져옵니다.
import './Signup.css'; // Signup 컴포넌트에 사용할 스타일을 불러옵니다.

function Signup() { // Signup 컴포넌트를 정의합니다.
  // formData는 사용자 입력 데이터를 저장하는 객체이고, setFormData는 이 데이터를 업데이트하는 함수입니다.
  const [formData, setFormData] = useState({
    user_id: '', // 사용자 아이디
    password: '', // 비밀번호
    name: '', // 이름
    birth_date: '', // 생년월일
    email: '', // 이메일 주소
    phone_number: '', // 전화번호
    address: '', // 주소
    detailed_address: '', // 상세 주소
    gender: '', // 성별
  });

  // 에러 메시지를 저장하는 상태 변수와 이를 업데이트하는 함수입니다.
  const [errorMessage, setErrorMessage] = useState('');

  // 성공 메시지를 저장하는 상태 변수와 이를 업데이트하는 함수입니다.
  const [successMessage, setSuccessMessage] = useState('');

  // 입력 필드 값이 변경될 때 호출되는 함수입니다.
  const handleChange = (e) => {
    const { name, value } = e.target; // 이벤트 객체에서 name과 value를 추출합니다.
    setFormData({
      ...formData, // 기존 formData를 복사합니다.
      [name]: value, // name에 해당하는 필드의 값을 업데이트합니다.
    });
  };

  // 폼이 제출될 때 호출되는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 막습니다.
    setErrorMessage(''); // 이전 에러 메시지를 초기화합니다.
    setSuccessMessage(''); // 이전 성공 메시지를 초기화합니다.

    try {
      // Fetch API를 사용하여 백엔드로 POST 요청을 보냅니다.
      const response = await fetch('http://172.30.1.35:8080/api/signup', { // 백엔드 URL
        method: 'POST', // HTTP 메서드를 POST로 설정
        headers: {
          'Content-Type': 'application/json', // 요청 본문의 데이터 형식을 JSON으로 설정
        },
        body: JSON.stringify(formData), // formData를 JSON 형식으로 변환하여 요청 본문에 포함
      });

      if (!response.ok) { // 응답 상태 코드가 200-299 범위가 아니라면 오류 처리
        const errorData = await response.json(); // 응답 본문을 JSON으로 파싱
        setErrorMessage(`회원가입 실패: ${errorData.message}`); // 에러 메시지를 상태에 저장
      } else {
        setSuccessMessage('회원가입 성공!'); // 성공 메시지를 상태에 저장
      }
    } catch (error) { // 네트워크 오류 또는 기타 예외 처리
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.'); // 에러 메시지를 설정
      console.error('Error during signup:', error); // 디버깅용 오류 로그 출력
    }
  };

  // JSX로 구성된 UI를 반환합니다.
  return (
    <div className="signup-container"> {/* 회원가입 폼을 감싸는 컨테이너 */}
      <h2>회원가입</h2> {/* 페이지 제목 */}
      <form onSubmit={handleSubmit}> {/* 폼 제출 시 handleSubmit 호출 */}
        {/* 각각의 입력 필드와 라벨 */}
        <label>
          아이디:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} required />
        </label>
        <label>
          비밀번호:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          이름:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          생년월일:
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
        </label>
        <label>
          이메일:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          전화번호:
          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </label>
        <label>
          주소:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          상세 주소:
          <input type="text" name="detailed_address" value={formData.detailed_address} onChange={handleChange} />
        </label>
        <label>
          성별:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">선택</option> {/* 기본값 */}
            <option value="male">남성</option> {/* 남성 선택 */}
            <option value="female">여성</option> {/* 여성 선택 */}
          </select>
        </label>
        <button type="submit">회원가입</button> {/* 폼 제출 버튼 */}
      </form>
      {/* 에러 메시지가 있으면 화면에 표시 */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {/* 성공 메시지가 있으면 화면에 표시 */}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Signup; // Signup 컴포넌트를 기본으로 내보냅니다.
