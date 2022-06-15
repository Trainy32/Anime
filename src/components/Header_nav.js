import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Header_nav = () => {
  if (window.location.pathname === '/') return null;
  if (window.location.pathname === '/login')
    return (
      <HeaderWrap>
        <HomeBtn className="btn" to='/'>로고</HomeBtn>
        <Title>로그인</Title>
        <RightBtn className="btn" to='/signup'>회원가입</RightBtn>
      </HeaderWrap>
    )
  if (window.location.pathname === '/signup')
    return (
      <HeaderWrap>
        <HomeBtn className="btn" to='/'>로고</HomeBtn>
        <Title>회원가입</Title>
        <RightBtn className="btn" to='/login'>로그인</RightBtn>
      </HeaderWrap>
    )
}


const HeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  background: #000;
  position: relative;

  .btn {
    position: absolute;
    /* line-height: 80px; */
    background: #eee;
    border-radius: 5px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 30px;
    text-decoration: none;
  }
`
const Title = styled.h1`
  position: absolute;
  display: inline-block;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color:#fff
`

const HomeBtn = styled(Link)`
left:0;
margin-left: 30px;
`

const RightBtn = styled(Link)`
right:0;
margin-right: 30px;

`


export default Header_nav;
