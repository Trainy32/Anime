import React from "react";

import { useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import {useDispatch, useSelector} from 'react-redux'

// CSS 관련 Imports
import styled from 'styled-components'

function AnimeList() {
  const navigate = useNavigate()


  return (
    <>
      <div>
        <button onClick={() => navigate('/write')}>(임시) 작성페이지 가기 버튼</button>
        추천순 / 연도순
      </div>

      <ListWrap>
        <Cards>
          <CardThumb />
          <h5>1999~</h5>
          <h3>카드캡터 체리</h3>
          <span> 00명이 추천했어요 </span>
        </Cards>
      </ListWrap>
    </>
  );
}

const ListWrap = styled.div`
display: flex;
`

const Cards = styled.div`
border: 1px solid #ddd;
width: 300px;
height: 450px;
margin: 20px;
box-sizing: border-box;
line-height: 10px;

`

const CardThumb = styled.div`
border: 1px solid #ddd;
width: 300px;
height: 350px;
margin: -1px 0px 0px -1px;
box-sizing: border-box;
background:url('https://newsimg.sedaily.com/2022/04/05/264KQDPTYX_1.jpg');
background-size: cover;
`

export default AnimeList;
