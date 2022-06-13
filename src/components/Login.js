import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const Login = () => {

  // 로그인 정보 가져오기
  const email_ref = React.useRef(null);
  const pw_ref = React.useRef(null);


  // 로그인 버튼 클릭시
  const login = (e) => {
    e.preventDefault();

    const login_info = {
      user_id: email_ref.current.value,
      password: pw_ref.current.value,
    }

    axios.post('http://localhost:5001/user', login_info)
      .then((response) => { alert(response) })
      .catch((error) => console.log(error));
  }





  const user_list = useSelector((state) => state.user.list)
  console.log(user_list)
  return (
    <LoginWrap>
      <Title>로그인</Title>
      <Form>
        <label htmlFor="user_email">
          <p>이메일</p>
          <input type="text" id="user_id" ref={email_ref} placeholder="아이디를 입력해주세요." />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" ref={pw_ref} placeholder="비밀번호를 입력해주세요." />
        </label>
        <InputBtn to='/' onClick={login}>로그인하기</InputBtn>
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

const InputBtn = styled(Link)`
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
