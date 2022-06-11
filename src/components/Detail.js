import React from "react";
import axios from 'axios';
// CSS 관련 Imports
import styled from 'styled-components'



const Detail = () => {

    //데이터 가져오기
    const loadpost = () => {
        // axios({
        //     method:'get',
        //     url: 'http://localhost:5001/posts'
        // }).then(response => {
        //     console.log(response)
        // });

        axios.get('http://localhost:5001/posts').then(response => {
                 console.log(response)
             });
    

    }

    React.useEffect(()=>{
        loadpost();
    })


    return (
        <Container>
        <Div>
            <Img>만화 이미지</Img>
            <div>
            <p>작성자명</p>
            <h3>만화제목</h3>
            <h3>방영연도</h3>
            </div>
        </Div>
        
        <h3>소개글</h3>
        

        </Container>
    )
}

const Img= styled.div`
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