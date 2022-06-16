import React, { useRef, useState, useEffect } from "react";
import profile1 from "../img/1.jpg";
import profile2 from "../img/2.jpg";
import profile3 from "../img/3.jpg";
import axios from 'axios';


import { useDispatch, useSelector } from 'react-redux'
import { add_user_AX } from '../redux/modules/user'
import styled from 'styled-components'


function Signup() {
  const dispatch = useDispatch()

  // 프로필 이미지 저장
  const [profile, setProfile] = useState('');

  // 선택한 프로필 이미지 불러오기
  const profile_checked = (e) => {
    if (e.target.checked) {
      setProfile(Number(e.target.value));
    }
  };

  // 회원가입 정보 가져오기
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [repwd, setRepwd] = useState('');



  const [checkId, setCheckId] = useState('dfa');


  // 이메일 중복 체크
  const id_check = (e) => {
    e.preventDefault();

    // 5~ 17글자
    const email_check = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    // const email_check = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;




    if (email_check.test(email)) {
      axios.post('http://54.180.121.151/api/user/id_check', { user_id: email })
        .then((response) => {
          console.log(response)
          setCheckId(email);
          alert("사용가능한 이메일입니다");
        })
        .catch((error) =>
          error.response.data.alert === "아이디가 중복되었습니다" ?
            alert("이미 가입된 이메일이 있습니다.") : console.log(error.response.data.alert)
        )
    } else {
      alert('이메일 형식으로 입력해주세요!')
    }
  }

  // 회원가입 버튼 클릭시
  const signup = () => {
    const user_info = {
      user_id: email,
      profile_img: profile,
      nickname: nickName,
      password: pw,
      confirm_password: repwd
    }


    //최소 8자 이상으로 숫자, 특수문자가 각각 최소 1개이상
    const pw_check = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,8}$/;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    // 유효성 검사
    if (email === "" || profile === "" || nickName === "" || pw === "" || repwd === "") {
      window.alert("모든 항목은 필수입니다😊");
      return;
    }
    if (email !== checkId) {
      window.alert("이메일 중복확인을 해주세요!")
      return
    }
    if (nickName.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) !== -1) {
      window.alert("닉네임에 특수 문자는 안돼요!");
      return;
    } else if (nickName.length < 3 || nickName.length > 8) {
      window.alert("닉네임은 3글자 ~ 8자리 이내로 입력해주세요.");
      return false;
    }
    if (pw.length < 4 || pw.length > 8) {
      window.alert("비밀번호는 4자리 ~ 8자리 이내로 입력해주세요.");
      return false;
    } else if (pw.search(/\s/) != -1) {
      window.alert("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      window.alert("영문, 숫자, 특수문자를 최소 1개씩 혼합하여 입력해주세요");
      return false;
    }
    if (pw !== repwd) {
      window.alert("비밀번호가 일치하지 않습니다.");
      pw.focus();
      return;
    }

    dispatch(add_user_AX(user_info));
  }


  return (
    <SignWrap>
      <Title>회원가입</Title>
      <Form>
        <label htmlFor="user_id">
          <p>이메일</p>
          <input type="text" id="user_id" placeholder="이메일을 입력해주세요" onChange={(e) => { setEmail(e.target.value); }} />
          <button className="checkBtn" onClick={id_check}>중복 확인</button>
        </label>
        <label htmlFor="user_nick">
          <p>닉네임</p>
          <input type="text" id="user_nick" placeholder="닉네임을 입력해주세요" onChange={(e) => { setNickName(e.target.value); }} />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요" onChange={(e) => { setPw(e.target.value); }} />
        </label>
        <label htmlFor="user_pw_confirm">
          <p>비밀번호 확인</p>
          <input type="password" id="user_pw_confirm" placeholder="비밀번호를 다시 입력해주세요" onChange={(e) => { setRepwd(e.target.value); }} />
        </label>
        <ProfileBox>
          <p>프로필 선택</p>
          <label htmlFor="user_profile1">
            <img src={profile1} alt=""></img>
            <input type="radio" id="user_profile1" name="profile" value="1" onChange={profile_checked} />
          </label>
          <label htmlFor="user_profile2">
            <img src={profile2} alt=""></img>
            <input type="radio" id="user_profile2" name="profile" value="2" onChange={profile_checked} />
          </label>
          <label htmlFor="user_profile3">
            <img src={profile3} alt=""></img>
            <input type="radio" id="user_profile3" name="profile" value="3" onChange={profile_checked} />
          </label>
        </ProfileBox>
        <InputBtn type="button" onClick={signup}>회원가입 하기</InputBtn>
      </Form>
    </SignWrap>
  )
}


const SignWrap = styled.div`
font-family: '양진체';
padding: 50px;
width: 578px;
border: 3px solid #000;
margin-top: 40px;
margin: 40px auto;
border-radius: 22px;
box-shadow: 0px 10px 0px 0px;

`

const Title = styled.h1`
margin: 0 0 70px 0;
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
input#user_id {
  width: 70%;
}
input::placeholder {
  color: #C2C2C2;
}
button.checkBtn {
  border: none;
  padding: 17px 11px;
  width: 27%;
  margin-left: 3%;
  background: #49B0AB;
  color: #fff;
  border-radius: 2px;
  font-family: '양진체';
}
`;

const ProfileBox = styled.div`
p{
  text-align: left;
  margin-bottom: 30px;
}
label{
  width: 33%;
  display: inline-block;
  text-align : center;
  margin: 0;
}
img {
  border-radius: 50%;
  width: 70px; 
  height: 70px;
}
`

const InputBtn = styled.button`
  font-family: 'IM_Hyemin-Regular';
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 30px;
  background: #49B0AB;
  border: none;
  border-radius: 5px;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  font-family: '양진체';
  
`;
export default Signup;
