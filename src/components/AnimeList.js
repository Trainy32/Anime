import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch, useSelector } from 'react-redux'
import { load_posts_AX } from '../redux/modules/posts'

// CSS 관련 Imports
import styled from 'styled-components'

function AnimeList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.list)

  // 리덕스에 포스트 리스트를 로딩해옵니다.
  React.useEffect(() => {
    dispatch(load_posts_AX())
  }, [])


  return (
    <>
      <ListingOption>
        <button onClick={() => navigate('/write/new')}>(임시) 작성페이지 가기 버튼</button>
        <span> 추천순 </span> / <span> 연도순 </span>
      </ListingOption>

      <ListWrap>
        {
          posts.map((p, i) => {
            return (
              <Cards key={i}>
                <CardThumb onClick={() => navigate('/detail/' + p.id)} thumbImg={p.thumbnail_url} />
                <Texts>
                  <h5>{p.onair_year}~</h5>
                  <h3>{p.title}</h3>
                  <span>❤️ {p.likes} </span>
                  <button onClick={() => navigate('/write/' + p.id)}>(임시) 수정</button>
                </Texts>
              </Cards>
            )
          })
        }
      </ListWrap>
    </>
  );
}

const ListingOption = styled.div`
margin: 30px;
font-weight: 600;
font-size: 26px;

span {
  cursor:pointer;
}
`

const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: center;
  margin-top: 20px;
  width:100%;
`

const Cards = styled.div`
  border: 1px solid #ddd;
  width: 300px;
  height: 450px;
  margin: 10px;
  box-sizing: border-box;
`
const Texts = styled.div`
  line-height: 10px;
  padding: 0px 10px;

  h5 {
    margin: 15px 0px;
  }
`

const CardThumb = styled.div`
  border: 1px solid #ddd;
  width: 300px;
  height: 350px;
  margin: -1px 0px 0px -1px;
  box-sizing: border-box;
  background:url(${(props) => props.thumbImg});
  background-size: cover;
  cursor: pointer;
`

export default AnimeList;
