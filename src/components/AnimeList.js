import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports

import {useDispatch, useSelector} from 'react-redux'
import { load_posts_like_AX, load_posts_year_AX } from '../redux/modules/posts'

// CSS 관련 Imports
import styled from 'styled-components'

// 스크롤
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

// 리스트 아이템 만들기 : 윈도잉용으로 인덱싱하는 함수 
  const makeItem = useCallback ((data) => {
    const item = data.data[0]
    const rowLength = data.data[1]
    const columnIndex = data.columnIndex
    const rowIndex = data.rowIndex
    const style = data.style

    const itemIndex = columnIndex + (rowIndex*rowLength)
    
    // console.log('데이터 :: ', data)
    // console.log('item :: ', item)
    // console.log('rowLength :: ', rowLength)
    // console.log('columnIndex :: ', columnIndex)
    // console.log('rowIndex :: ', rowIndex)

    return itemIndex < item.length ? (
        <div style={style}>
          <Cards>
          <CardThumb onClick={() => navigate('/detail/' + item[itemIndex].post_id)} thumbImg={item[itemIndex].thumbnail_url} />
          <Texts>
            <h5>{item[itemIndex].onair_year}~</h5>
            <h3>{item[itemIndex].title}</h3>
            <span>❤️ {item[itemIndex].likes} </span>
            <button onClick={() => navigate('/write/' + item[itemIndex].post_id)}>(임시) 수정</button>
          </Texts>
          </Cards>
        </div>
      ) : (null)
  })

  return (
    <>
      <ListingOption>
        <OrderByLike onClick={orderby_like} list_order={listOrder}> 추천순 </OrderByLike> / 
        <OrderByYear onClick={orderby_year} list_order={listOrder}> 연도순 </OrderByYear>
      </ListingOption>

      <ListWrap>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              columnCount={Math.floor(width/300)}
              columnWidth={320}
              height={height}
              rowCount={Math.ceil(posts.length/(width/300))}
              rowHeight={490}
              width={width}
              itemData={[posts, Math.floor(width/300)]}
            >
              {makeItem}
            </Grid>
          )}
        </AutoSizer>
      </ListWrap>
    </>
  );
}

const ListingOption = styled.div`
margin: 20px;
font-weight: 600;
font-size: 20px;

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
width: 90vw;
height: 70vh;
margin: 0px 10vw;
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
