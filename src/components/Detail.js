import React,{useState, useRef} from "react";
import axios from 'axios';
// CSS 관련 Imports
import styled from 'styled-components'
//post정보
import {useParams, useNavigate} from 'react-router-dom';
// 리덕스 관련
import {useDispatch, useSelector} from 'react-redux'
import { createCommentAX, loadCommentAX, deleteCommentAX } from '../redux/modules/comments'
// 영상보여주기
import ReactPlayer from 'react-player';
//스크롤 관련
import ScrollRestore from "./ScrollRestore";

const Detail = () => {
    const dispatch = useDispatch();

    //페이지 인덱스값 받아오기
    const params = useParams();
    const id = params.id;
   
    //데이터 가져오기
    const[posts, setPosts]= useState([]);
    React.useEffect(()=>{
         axios.get(`http://localhost:5001/posts/${id}`
          
         )
         .then(response => {
                setPosts(response.data);
                
             });
            },[]);
    //댓글 데이터 가져오기
        const comments =useSelector((state)=>state.comments.comments)
        // console.log(comments);
        React.useEffect(()=>{
            dispatch(loadCommentAX())
        },[])
    //댓글 입력창 정보 받아오기
        const comment_ref = useRef(null);
    //댓글 등록시 실행되는 함수
    const addComment= () => {
        const new_commnet ={
            comment: comment_ref.current.value,
            nickname : "김상선",
            created_at: "2020-04-10T20:02:20.686"
        }
        dispatch(createCommentAX(new_commnet))
    }
    // 댓글 삭제하기
    // const delComment=()=>{
    //     dispatch(deleteCommentAX())
    // }
    
    return (
        <Container>
            <ScrollRestore/>
        <Div>
            
            <Img src={posts?.thumbnail_url}></Img>
            <div>
            <p>작성자명:{posts?.user_id}</p>
            <h3>만화제목:{posts?.title}</h3>
            <h3>방영연도:{posts?.onair_year}</h3>
        
            </div>
            
        </Div>
        
        
        <div>
            <h3>소개글</h3>
            <p>{posts?.content}</p>    
        </div>
            <div>만화주제가(동영상)
            <ReactPlayer url={posts?.ost_url}></ReactPlayer>
            </div>
            <div >
            댓글 작성하기
                <input type='text' ref={comment_ref}></input>
                <button onClick={addComment}>등록하기</button>

    {/* 맵함수 이용해서 댓글뿌려주기 */}
            {
                comments.map((c,i)=>{
                    return(
                <div key={i}>
                    <h4>{c.nickname}</h4>
                    <h4>{c.comment}</h4>
                    <h5>{c.created_at}</h5>
                    <button onClick={()=>{ dispatch(deleteCommentAX(c.id))}}>삭제하기</button>
                    <button>수정하기</button>
                </div>
                    )
                })
            }
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