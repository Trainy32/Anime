import React,{useState} from "react";
import axios from 'axios';
// CSS 관련 Imports
import styled from 'styled-components'
//post정보
import {useParams, useNavigate} from 'react-router-dom';
// 리덕스 관련
import {useDispatch, useSelector} from 'react-redux'
import { load_posts_AX } from '../redux/modules/posts'
// 영상보여주기
import ReactPlayer from 'react-player';

const Detail = () => {

    //페이지 인덱스값 받아오기
    const params = useParams();
    const index = params.index;
   
    //데이터 가져오기
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.list)
    React.useEffect(() => {
        dispatch(load_posts_AX())
        
    }, [])

    // console.log(posts);


    return (
        <Container>
        <Div>
            
            <Img src={posts[index]?.thumbnail_url}></Img>
            <div>
            <p>작성자명:{posts[index]?.user_id}</p>
            <h3>만화제목:{posts[index]?.title}</h3>
            <h3>방영연도:{posts[index]?.onair_year}</h3>
        
            </div>
            
        </Div>
        
        
        <div>
            <h3>소개글</h3>
            <p>{posts[index]?.content}</p>    
        </div>
            <div>만화주제가(동영상)
            <ReactPlayer url={posts[index]?.ost_url}></ReactPlayer>
            </div>
            <div>댓글
                <input></input>
                <div>댓글내용</div>
            </div>

        </Container>
    )
}

const Img= styled.img`
width: 200px;
height: 300px;
background-color: #ddd;
text-align: center;
`
const Container=styled.div`
width: 100vh;
height: 100vw;
margin: auto;
`
const Div = styled.div`
display: flex;
flex-direction: row;
`
export default Detail;