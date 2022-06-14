import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// 리덕스 관련 Imports

import {useDispatch, useSelector} from 'react-redux'
import { load_posts_like_AX, load_posts_year_AX } from '../redux/modules/posts'

// CSS 관련 Imports
import styled from 'styled-components'

function AnimeList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.list)

  // 리덕스에 포스트 리스트를 로딩해옵니다. (기본값 : 추천순 정렬)
  React.useEffect(() => {
    dispatch(load_posts_like_AX())
  }, [])

  // 추천순, 연도순 눌렀을 때 리스트를 로딩하도록 합니다 && 현재 정렬을 State로 저장해둡니다.
  const [listOrder, setListOrder] = React.useState('like')

  const orderby_like = () => {
    dispatch(load_posts_like_AX())
    setListOrder('like')
  } 

  const orderby_year = () => {
    dispatch(load_posts_year_AX())
    setListOrder('year')
  } 


  return (
    <>
      <ListingOption>
        <button onClick={() => navigate('/write/new')}>(임시) 작성페이지 가기 버튼</button>
        <OrderByLike onClick={orderby_like} list_order={listOrder}> 추천순 </OrderByLike> / 
        <OrderByYear onClick={orderby_year} list_order={listOrder}> 연도순 </OrderByYear>
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
                  <button onClick={() => navigate('/write/' + p.post_id)}>(임시) 수정</button>
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
const OrderByLike = styled.span`
  color: ${(props) => props.list_order === 'like' ? '#fc9700' : '#000'};
`
const OrderByYear = styled.span`
  color: ${(props) => props.list_order === 'year' ? '#fc9700' : '#000'};
`


const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: center;
  margin: 20px auto;
  width:80%;
`

const Cards = styled.div`
  border: 1px solid #ddd;
  width: 300px;
  height: 470px;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 2px 2px 5px #0000001f;
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
