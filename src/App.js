import React from "react";
import './App.css';
import axios from "axios";

import { Route, Routes, useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch, useSelector } from 'react-redux'

// CSS 관련 Imports
import styled from 'styled-components'

// 컴포넌트 Imports
import AnimeList from "./components/AnimeList";
import Write from "./components/Write";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";

// 연결 예정
import Header_home from "./components/Header_home";
import Header_nav from "./components/Header_nav";

import { loginCheckDB } from "./redux/modules/user";




function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const is_login = localStorage.getItem("user_token") ? true : false;

  React.useEffect(() => {
    if (is_login) {
      dispatch(loginCheckDB());
    }
    // else {
    //   navigate("/login");
    // }
  }, [])

  // const is_login = useSelector(state => state.user.user_info[0].is_login);
  // 로그인 완료 -> 메인 페이지 (콘솔:false) -> 새로고침(콘솔:true)
  // 문제 해결 예정!
  console.log(is_login)

  return (
    <div className="App">
      {/* if문 사용해서 Header_home, Header_nav 보여주기 */}
      <Header_home />
      <Routes>
        <Route path='/' element={<AnimeList />} />
        <Route path='/write/:post_id' element={<Write />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}


export default App;
