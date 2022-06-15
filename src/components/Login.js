import React, { useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { LoginDB } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();

  // 로그인 정보 가져오기
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  // 로그인 버튼 클릭시
  const login = (e) => {
    e.preventDefault();

    const login_info = {
      user_id: email,
      password: pw,
    }

    // 빈 항목 체크
    if (email === "" || pw === "") {
      window.alert("아이디 혹은 비밀번호가 입력되지 않았습니다.")
      return;
    }
    dispatch(LoginDB(login_info));
  }



  return (
    <LoginWrap>
      <Title>로그인</Title>
      <Form>
        <label htmlFor="user_email">
          <p>이메일</p>
          <input type="text" id="user_id" placeholder="아이디를 입력해주세요." onChange={(e) => { setEmail(e.target.value); }} />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요." onChange={(e) => { setPw(e.target.value); }} />
        </label>
        <InputBtn onClick={login}>로그인하기</InputBtn>
      </Form>
    </LoginWrap>
  )
}

const LoginWrap = styled.div`
  position: absolute;
  top:50%; left: 50%;
  transform: translate(-50%, -50%);
  
`

const Title = styled.h1`
margin: 0  0 70px 0;
font-size: 36px;
text-align: center;
`

const Form = styled.form`
width: 465px;
margin: 0 auto;
  
label{
  display: block;
  text-align: left;
  margin-bottom: 20px;
}
p{
  margin:0;
  font-weight: 700;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 16px;
  margin-top: 10px;
  border: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}
input::placeholder {
  color: #C2C2C2;
}
`;

const InputBtn = styled.button`
  font-family: 'IM_Hyemin-Regular';
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 70px;
  background: #000;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
`;
export default Login;
