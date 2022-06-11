import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import {useDispatch, useSelector} from 'react-redux'

// CSS 관련 Imports
import styled from 'styled-components'

// 컴포넌트 Imports
import AnimeList from "./AnimeList";
import Write from "./Write";
import Detail from "./Detail";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<AnimeList/>}/> 
      <Route path='/write/:post_id' element={<Write/>}/> 
      <Route path='/detail' element={<Detail/>}/> 
      </Routes>
    </div>
  );
}

export default App;
