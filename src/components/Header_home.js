import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";


// 토큰 유무 확인 후 레이아웃 변경
function Header_home() {
  return (
    <HeaderWrap>
      <TitleBox>
        <h1>추억의 만화 영화</h1>
        <Link to='/write'>작성 페이지</Link>
      </TitleBox>
      <UserBox>
        <div><img src='' alt="" /></div>
        <div className="myPage">
          <p>닉네임</p>
          <Link to='/login'>로그아웃</Link>
        </div>
      </UserBox>
    </HeaderWrap>
  )
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
    background-color: #ddd;
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
`

export default Header_home;
