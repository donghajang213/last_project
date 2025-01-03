import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function SignupRanking() {
  const [signupData, setSignupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ranking/signup`);
        if (!response.ok) {
          throw new Error('회원가입 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setSignupData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSignupData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <h1>회원가입 랭킹</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={signupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="signupCount" stroke="#8884d8" activeDot={{ r: 8 }} name="가입자 수" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SignupRanking;
