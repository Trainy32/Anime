import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

function Header_nav() {
  return (
    <HeaderWrap>
      <HomeBtn className="btn" to='/'>로고</HomeBtn>
      {/* if문 사용해서 parmas확인?,  */}
      <Title>로그인</Title>
      <RightBtn className="btn" to='/signup'>회원가입</RightBtn>
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
