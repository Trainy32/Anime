import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch, useSelector } from 'react-redux'
import { load_posts_like_AX, load_posts_year_AX } from '../redux/modules/posts'

// CSS 관련 Imports
import styled from 'styled-components'

// 헤더 import
import Header_home from "./Header_home"

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
  const makeItem = useCallback((data) => {
    const item = data.data[0]
    const rowLength = data.data[1]
    const columnIndex = data.columnIndex
    const rowIndex = data.rowIndex
    const style = data.style

    const itemIndex = columnIndex + (rowIndex * rowLength)

    return itemIndex < item.length ? (
      <GridBox style={style}>
        <Cards>
          <CardThumb onClick={() => navigate('/detail/' + item[itemIndex].post_id)} thumbImg={item[itemIndex].thumbnail_url} />
          <CardLabel>
            <div>
              <h3>{item[itemIndex].title}</h3>
              <p>{item[itemIndex].onair_year} ~</p>
            </div>
            <span> {item[itemIndex].likes}  <Heart/> </span>
          </CardLabel>
        </Cards>
      </GridBox>
    ) : (null)
  })

  // 스크롤 꼭대기로 가기 버튼
  const listRef = React.useRef()
  
  const scrollToTop = () => {
    listRef.current.scrollToItem({
      columnIndex:0,
      rowIndex: 0
    })

    console.log(listRef)
  }

  // 컴포넌트 리턴
  return (
    <>
      <Header_home />

      <Wrap>
        
      <ListingOption>
          <ToTop onClick={scrollToTop}> UP </ToTop>
          <OrderByLike onClick={orderby_like} list_order={listOrder}> 추천순 </OrderByLike>
          <OrderByYear onClick={orderby_year} list_order={listOrder}> 연도순 </OrderByYear>
        </ListingOption >

        <ContentsArea>
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={Math.floor(width / 340)}
                columnWidth={340}
                height={height}
                rowCount={Math.ceil(posts.length / Math.floor(width / 340))}
                rowHeight={530}
                width={width + 80}
                itemData={[posts, Math.floor(width / 340)]}
                ref={listRef}
              >
                {makeItem}
              </Grid>
            )}
          </AutoSizer>
        </ContentsArea>
      </Wrap>
    </>
  );
}


const Wrap = styled.div`
display: flex;
flex-direction: column;
padding: 0px;
background-image: url('https://firebasestorage.googleapis.com/v0/b/mymagazinepjt.appspot.com/o/animeImg%2F1655318752651?alt=media&token=fd310dd0-8c16-43e2-ac33-60733fa82791');
background-size: 800px;
`
const ListingOption = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
font-size: 30px;
/* background-color: #49b0ab; */
width: 100%;
box-sizing: border-box;
padding: 10px 20px 0px 00px;

button {
  cursor:pointer;
  max-width: 170px;
  margin: 0px 10px;
  padding: 14px 20px 12px 20px;
  outline: none;
  border: 3px solid #000;
  border-radius: 50px;
  box-shadow: 2px 5px 0px #000;
  font-size: 16px;
  text-align:center;
  font-family: '양진체';
}
`
const ToTop = styled.button`
  background-color: #fb8b8c;
`

const OrderByLike = styled.button`
  background-color: ${(props) => props.list_order === 'like' ? '#fae209' : '#ffeeef'};
`
const OrderByYear = styled.button`
  background-color: ${(props) => props.list_order === 'like' ? '#ffeeef' : '#fae209'};
`

const ContentsArea = styled.div`
width: 88vw;
min-width: 380px;
box-sizing: border-box;
padding: 2vh 0px 0px 5vw;
height: 63vh;
margin: 0px;
font-family: '양진체';
`

const GridBox = styled.div`
  display:flex; 
  justify-content:center;
`

const Cards = styled.div`
  border: 3px solid #000;
  width: 280px;
  height: 450px;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 25px;
  box-shadow: 3px 8px 0px #000;
  background-color: #fff;
`
const CardLabel = styled.div`
  margin: 10px 10px;
  line-height: 200%;
  padding: 0px 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0px;
    font-weight: 500;
    font-size: 22px;
    letter-spacing: 2px;
  }

  p {
    margin-top: 2px;
    font-size: 16px;
  }

  span{
    display: flex;
    align-items: center;
    margin: 30px 0px;
    gap: 5px;
    font-size: 16px;
  }
`
const Heart =styled.div`
  height: 26px;
  width: 26px;
  background: url('https://firebasestorage.googleapis.com/v0/b/mymagazinepjt.appspot.com/o/animeImg%2F1655315827434?alt=media&token=ca9a6660-b19a-49c2-bb13-30e58a488e7c') no-repeat center;
  background-size: contain;
  margin-bottom: 10px;
`

const CardThumb = styled.div`
  border: 3px solid #000;
  width: 240px;
  height: 320px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 25px;
  background:url(${(props) => props.thumbImg});
  background-size: cover;
  background-position:center;
  cursor: pointer;
`

export default AnimeList;
