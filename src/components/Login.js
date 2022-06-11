import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

function Login() {
  return (
    <LoginWrap>
      <Form>
        <label htmlFor="user_id">
          <p>아이디</p>
          <input type="text" id="user_id" placeholder="아이디를 입력해주세요" />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요" />
        </label>
      </Form>
      <InputBtn to='/'>로그인</InputBtn>
    </LoginWrap>
  )
}

const LoginWrap = styled.div`

`
const Form = styled.form`
  
label{
  display: block;
  text-align: left;
}
input {
  outline: none;
  width:100%;
  background: rgba(255,255,255,1);
  border: none;
  padding: 10px 3px;
  font-size: 16px;
  margin-top: 10px;
}
`;

const InputBtn = styled(Link)`
  font-family: 'IM_Hyemin-Regular';
  display: inline-block;
  width: 100%;
  padding: 10px 0;
  background: #5563a1;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
`;
export default Login;
