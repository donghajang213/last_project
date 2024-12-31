import React from 'react';

function SignupRanking() {
  const signupData = [
    { month: '1월', count: 150 },
    { month: '2월', count: 200 },
    { month: '3월', count: 180 },
    { month: '4월', count: 220 },
    { month: '5월', count: 300 },
  ];

  return (
    <div>
      <h1>회원가입 랭킹</h1>
      <ul>
        {signupData.map((data, index) => (
          <li key={index}>
            {index + 1}. {data.month} - {data.count}명
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignupRanking;
