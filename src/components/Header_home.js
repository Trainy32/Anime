import React from "react";
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

// 프로필 이미지 improt
import profile1 from "../img/1.jpg";
import profile2 from "../img/2.jpg";
import profile3 from "../img/3.jpg";


// 토큰 유무 확인 후 레이아웃 변경
const Header_home = () => {
  // 토큰 유무 확인
  const is_login = localStorage.getItem("user_token") ? true : false;
  // 유저의 정보 가져오기
  const user_info = useSelector(state => state.user.user_info);
  const login_user = {
    profile_img: user_info[0]?.profile_img === 1 ? profile1 : user_info[0]?.profile_img === 2 ? profile2 : profile3,
    nickname: user_info[0]?.nickname,
    user_id: user_info[0]?.user_id,
  }

  return (
    is_login === false ?
      <HeaderWrap>
        <TitleBox>
          <h1>추억의 만화 영화</h1>
          <Link to='/login' className="loginBtn">로그인</Link>
          <Link to='/signup'>회원가입</Link>
        </TitleBox>
      </HeaderWrap> :
      <HeaderWrap>
        <TitleBox>
          <h1>추억의 만화 영화</h1>
          <Link to='/write/new'>작성 페이지</Link>
        </TitleBox>
        <UserBox>
          <div><img src={login_user.profile_img} alt="프로필 이미지" /></div>
          <div className="myPage">
            <p>{login_user.nickname}</p>
            <Link to='/login' onClick={() => {
              localStorage.clear();
              alert("로그아웃 되셨습니다. 감사합니다")
            }}>로그아웃</Link>
          </div>
        </UserBox>
      </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  height: 180px;
  background: #000;
  position: relative;
  box-sizing: border-box;

  h1 {
    font-size: 40px;
    text-align: center;
    color: #fff;
    margin: 0;
  }
`
const TitleBox = styled.div`
  position: absolute;
  top: 50%; left:50%;
  transform: translate(-50%,-50%);

  .loginBtn {
    margin-right: 10px;
  }
  

  a {
    display: inline-block;
    padding: 10px 30px;
    color:#fff;
    background: #848383;
    margin-top: 10px;
  }
`
const UserBox = styled.div`
  position: absolute;
  top: 50%; right:0;
  transform: translateY(-50%);
  width: 200px;
  height: 90px;
  background: #eee;
  margin-right:30px;

  div:first-child{
    position: absolute;
    left:7%; top:50%;
    transform: translateY(-50%);
    width: 60px;
    height:60px;
    border-radius: 50%;
    line-height: 80px;
  }
  .myPage{
    position: absolute;
    transform: translateY(-50%);
    left:50%; top:50%; // 포지션 수정 필요
    text-align: left;
  }
  p{
    margin:0;
  }
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export default Header_home;
