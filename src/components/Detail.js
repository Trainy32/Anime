import React,{useState, useRef} from "react";
import axios from 'axios';
// CSS 관련 Imports
import styled from 'styled-components'
//post정보
import {useParams, useNavigate} from 'react-router-dom';
// 리덕스 관련 
import {useDispatch, useSelector} from 'react-redux'
import { createCommentAX, loadCommentAX, deleteCommentAX, updateCommnetAX, likeAX } from '../redux/modules/comments'
import { delete_post_AX, load_posts_like_AX } from "../redux/modules/posts";
// 영상보여주기
import ReactPlayer from 'react-player';
//스크롤 관련
import ScrollRestore from "./ScrollRestore";


const Detail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const is_login = props.is_login
    const user_info = props.user_info[0]
    

    //페이지 인덱스값 받아오기
    const params = useParams();
    const id = params.id;
    
    //데이터 가져오기
    const[posts, setPosts]= useState([]);
    // console.log(posts);
    React.useEffect(()=>{
         axios.get(`http://54.180.121.151/api/post/detail/${id}`
         )
         .then(response => {
                setPosts(response.data);
                
             });
            },[]);
            
    //게시글 삭제하기
    const delete_post = ()=>{
    dispatch(delete_post_AX(id))
    dispatch(load_posts_like_AX())
    navigate('/')}
    //댓글 수정하기
    // const[recomment, setrecomments]= useState(null);
   
    // React.useEffect(()=>{
    //     axios.get(`http://localhost:5001/comments`)
    //     .then(response=> {setrecomments(response.data)})
        
    // },[])
    // const updatePost =()=> {
    //     const renew_comment= {comment: comment_ref.current.value}
    //     dispatch(updateCommnetAX(recomment.id, renew_comment))
    //      console.log(recomment)
    // }

        
    //댓글 데이터 가져오기
        const comments =useSelector((state)=>state.comments.comments)
        // console.log(comments);
        React.useEffect(()=>{
            dispatch(loadCommentAX(id))
        },[])
    //댓글 입력창 정보 받아오기
        const comment_ref = useRef(null);
    //댓글 등록시 실행되는 함수
    const addComment= () => {
        const new_commnet ={
            comment: comment_ref.current.value,
            nickname : user_info.nickname,
        }
        dispatch(createCommentAX(id,new_commnet))
    }

    const addlike=()=>{
        if (is_login) {
        dispatch(likeAX(id))
        } else {
            window.alert('먼저 로그인해 주세요!')           
        }
    }

   
    return (
    <Container>
            <ScrollRestore/>
        <Div>
            
            <Img src={posts?.thumbnail_url}></Img>
            <Box>

            <label>작성자</label>
            <div><h2>{posts?.nickname}</h2></div>

            <label>만화 제목</label>
            <div><h2>{posts?.title}</h2></div>

            <label>방영연도</label>
            <div><h2>{posts?.onair_year}</h2></div>

            <label>이 만화는 몇 살일까요?</label>
            <div><h2>{posts?.period}살</h2></div>
           
            
            </Box>
            <Likebtn onClick={addlike}><Heart/> 좋아요 </Likebtn>
            
        </Div>
        
        
        <Intro>
            <label>소개글</label>
            <h2>{posts?.content}</h2>    
        </Intro>
        <Movie>
            <h2>OST 들어보기</h2>
            <ReactPlayer url={posts?.ost_url}></ReactPlayer>
        </Movie>
        <div style={{display: 'flex'}}>
            <Button onClick={delete_post}>글 삭제하기</Button>
            <Button onClick={() => navigate('/write/' + id)}>글 수정하기</Button>
        </div>

        <Content>
            <h2>댓글</h2>
                <input type='text' ref={comment_ref}></input>
                <Btn onClick={addComment}>등록</Btn>
        </Content>
    {/* 맵함수 이용해서 댓글뿌려주기 */}
            {
                comments.map((c,i)=>{
                    return(
                <Comments key={i}>
                    <h4>{c.nickname}</h4>
                    <h6>{c.created_at}</h6>
                    <div>
                    <h3>{c.comment}</h3>
                    
                    <Btn onClick={()=>{dispatch(deleteCommentAX(c.id))
                    }}>삭제</Btn>
                    </div>
                    {/* <button onClick={updatePost}>수정하기</button> */}
                </Comments>
                    )
                })
            }
        

    </Container>
    )
}

const Div = styled.div`
display: flex;
flex-direction: row;
margin: 30px auto;
`

const Img= styled.img`

  background-size: cover;
  height: 350px;
  width: 250px;
  border-radius: 20px;
  border: 2px solid #000;

  box-shadow: 2px 5px 0px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  line-height: 200%;
  font-size: 18px;
  font-weight: 600;
 
`

const Box = styled.div`
margin: auto;
text-align: left;
div{
   h2{
    margin: 10px;
   }
   /* background: #E6F4F4; 연한색
   background: #4AAEAA; 진한색 */
    text-align: center;
    margin: 5px;
    width: 400px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 20px;

}
`
const Intro =styled.div`
text-align: left;
font-size: 18px;
h2{
border: 2px solid #000;
border-radius: 10px;
padding: 20px;

}`

const Movie = styled.div`
margin: 50px 150px;
color: #4AAEAA;
`

const Button = styled.button`
font-family: '양진체';
border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
  border-radius: 10px;

  :after{
    content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #4AAEAA;
  -webkit-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }
  :hover::after{
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
  }

`

const Content = styled.div`

margin: 50px auto;
text-align: left;
width: 70vh;
display: flex;
input{
    margin: auto;
    width: 500px;
    height: 50px;
    border: 2px solid black;
    border-radius: 10px;
}

`
const Btn =styled.button`
font-family: '양진체';
    font-size: 20px;
    background: #000;
  color: #fff;
  line-height: 42px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  :hover {
  background: transparent;
  color: #000;
   box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
}
`

const Comments = styled.div`
width: 70vh;
margin: auto;
text-align: left;
div{
    display: flex;
    margin: auto;
    text-align: center
}

h3{
    border: 2px solid black;
    border-radius:5px;
    padding: 10px;
    margin: 20px;
    width: 500px;
    }
`

const Container=styled.div`
width: 100vh;
height: 100vw;
margin: auto;
font-family: '양진체';
`

const Likebtn = styled.button`
border: 0;
outline: 0;
background-color: white;
`

const Heart =styled.div`
  height: 50px;
  width: 50px;
  background: url('https://firebasestorage.googleapis.com/v0/b/mymagazinepjt.appspot.com/o/animeImg%2F1655315827434?alt=media&token=ca9a6660-b19a-49c2-bb13-30e58a488e7c') no-repeat center;
  background-size: contain;
`

export default Detail;