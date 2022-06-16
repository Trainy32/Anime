import React from "react";
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

// 프로필 이미지 improt
import profile1 from "../img/1.jpg";
import profile2 from "../img/2.jpg";
import profile3 from "../img/3.jpg";
import logo from "../img/logo.png";


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
  console.log(login_user.nickname)
  return (

    is_login === false ?
      <HeaderWrap>
        <Info>
          <div className="infoBox">
            <Circle background="#FB8B8C" />
            <Circle background="#FFEEEF" />
            <Circle background="#FAE209" />
          </div>
          <div className="navBtn">
            <Link to='/login' className="loginBtn">로그인</Link>
            <Link to='/signup'>회원가입</Link>
          </div>
        </Info>
        <TitleBox>
          <h1><img src={logo} alt="" /></h1>
        </TitleBox>
      </HeaderWrap> :
      <HeaderWrap>
        <Info>
          <div className="infoBox">
            <UserBox>
              <div><img src={login_user.profile_img} alt="프로필 이미지" /></div>
              <p>{login_user.nickname}</p>
            </UserBox>
          </div>
          <div className="navBtn">
            <Link
              to='/login'
              className="loginBtn"
              onClick={() => {
                localStorage.clear();
                alert("로그아웃 되셨습니다. 감사합니다")
              }}>로그아웃
            </Link>
            <Link to='/write/new'>작성하기</Link>
          </div>
        </Info>
        <TitleBox>
          <h1><img src={logo} alt="" /></h1>
        </TitleBox>
      </HeaderWrap>
  );
}

const Info = styled.div`
position: relative;
height: 70px;
.infoBox {
  position: absolute;
  top: 50%; left: 30px;
  transform: translateY(-50%);
}
.navBtn {
  position: absolute;
  top: 50%; right: 30px;
  transform: translateY(-50%);
  
}
a {
  font-family: '양진체';
  border: 3px solid #000;
  display: inline-block;
  color:#000;
  background: #E6F4F4;
  margin-left:10px;
  padding: 10px 30px 8px;
  border-radius: 10px;
  }
`

const Circle = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 5px solid #000;
  margin-right : 10px;
  background-color: ${(props) => props.background};
  `


const HeaderWrap = styled.div`

h1 {
  position: absolute;
  top: 50%; left:50%;
  transform: translate(-50%,-50%);
  text-align: center;
  margin: 0;
  width: 260px;
}
img {
  width:100%;
  height:100%;
}
`
const TitleBox = styled.div`
  width: 100%;
  height: 180px;
  background: #4AAEAA; 
  position: relative;
  box-sizing: border-box;
  border-top:5px solid #000;
  border-bottom:5px solid #000;


`
const UserBox = styled.div`
  width: 160px;
  height: 45px;
  font-family: '양진체';
  border: 3px solid #000;
  border-radius: 10px;
  background: #FFEEEF;

  div{
    position: absolute;
    left:7%; top:50%;
    transform: translateY(-50%);
    width: 35px;
    height:35px;
    border-radius: 50%;
  }
  p{
    margin:0;
    margin-left: 30px;
    line-height: 48px;
  }
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export default Header_home;
