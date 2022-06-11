import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import profile1 from "../img/1.jpg"
import profile2 from "../img/2.jpg"
import profile3 from "../img/3.jpg"

function Signup() {
  return (
    <SignWrap>
      <Form>
        <label htmlFor="user_id">
          <p>아이디</p>
          <input type="text" id="user_id" placeholder="아이디를 입력해주세요" />
          <button>중복 확인</button>
        </label>
        <label htmlFor="user_nick">
          <p>닉네임</p>
          <input type="text" id="user_nick" placeholder="닉네임을 입력해주세요" />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요" />
        </label>
        <p>프로필 선택</p>
        <ProfileBox>
          <input type="radio" id="user_profile" name="profile" value="one" />
          <img src={profile1} alt=""></img>
          <input type="radio" id="user_profile" name="profile" value="two" />
          <img src={profile2} alt=""></img>
          <input type="radio" id="user_profile" name="profile" value="three" />
          <img src={profile3} alt=""></img>
        </ProfileBox>
      </Form>
      <InputBtn to='/login'>회원가입 하기</InputBtn>
    </SignWrap>
  )
}


const SignWrap = styled.div`
img{
  width: 100px; 
  height: 100px;
}
`
const ProfileBox = styled.div`
img{
  
}
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
export default Signup;
