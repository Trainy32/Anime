import React, { useRef } from "react";
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch } from 'react-redux'
import { create_post_AX, update_post_AX } from '../redux/modules/posts'

// 이미지 저장 DB
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

// CSS 관련 Imports
import styled from 'styled-components'
import { BsYoutube } from 'react-icons/bs'


function Write(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  // 유저 정보를 받아옵니다.
  const is_login = props.is_login
  const user_info = props.user_info[0]

  console.log(user_info)

  // 로그인된 유저가 아니라면, 뒤로 돌려보냅니다.
  React.useEffect(()=> {
    if (!is_login) {
      window.alert('글 작성전에 먼저 로그인 해주세요!')
      navigate(-1)
    }
  }, [])

  // 게시물 수정인지, 새로 쓰는것인지 판별합니다 :)
  const isNew = params.post_id === 'new' ? true : false

  // 수정이라면 : 현재 포스트의 데이터를 불러와 state로 저장합니다
  const [thisPost, setThisPost] = React.useState(null)

  React.useEffect(() => {
    if (!isNew) {
      // axios.get('http://localhost:5001/posts?id=' + params.post_id)
      // .then(response => {
      //   setThisPost(...response.data)
      //   setImgUrl(response.data[0].thumbnail_url)
      // })
      axios.get('http://54.180.121.151/api/post/detail/' + params.post_id)
        .then(response => {
          setThisPost(response.data)
          setImgUrl(response.data.thumbnail_url)
          if(user_info.user_id !== response.data.user_id) {
            window.alert('작성자만 수정할 수 있어요!')
            navigate(-1)
          }
        })
    }
  }, [])

  // 입력창 정보 받아오기
  const title_ref = useRef(null);
  const onair_year_ref = useRef(null);
  const thumbnail_ref = useRef(null);
  const ost_url_ref = useRef(null);
  const content_ref = useRef(null);

  // 이미지 파이어베이스 DB에 업로드 & url을 state에 imgUrl 이름으로 저장
  const [imgUrl, setImgUrl] = React.useState(null)

  const uploadImg = async (e) => {
    const file_path = 'animeImg/' + new Date().getTime()
    const uploaded_file = await uploadBytes(ref(storage, file_path), e.target.files[0])
    const file_url = await getDownloadURL(uploaded_file.ref)
    thumbnail_ref.current = { url: file_url }
    setImgUrl(thumbnail_ref.current.url)
  }

  // 작성하기 버튼 눌렀을때 :)
  const writePost = () => {
    const new_post = {
      title: title_ref.current.value,
      thumbnail_url: imgUrl,
      onair_year: onair_year_ref.current.value,
      content: content_ref.current.value,
      ost_url: ost_url_ref.current.value,
      user_id: user_info.user_id,
    }
    dispatch(create_post_AX(new_post))
    navigate('/')
  }


  // 수정하기 버튼 눌렀을 때
  const EditPost = () => {
      const new_post = {
        title: title_ref.current.value,
        thumbnail_url: imgUrl,
        onair_year: onair_year_ref.current.value,
        content: content_ref.current.value,
        ost_url: ost_url_ref.current.value,
        user_id: user_info.user_id,
      }
      dispatch(update_post_AX(params.post_id, new_post))
      navigate('/')
  }

  // 유튜브 검색 리스트 받아오기
  const [searchResult, setSearchResult] = React.useState(null)

  const youtubeSearch = () => {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&type=video&key=AIzaSyD_hQpysmQWmeZ7v_cwKCxVPy1YIOkn9WU&q=' + title_ref.current.value + 'ost')
      .then(response => response.data.items)
      .then(response => setSearchResult(response))
  }

  // 검색된 리스트에서 선택 버튼 클릭하면 URL이 입력창에 반영됩니다
  const setOstUrl = (url) => {
    ost_url_ref.current.value = url
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>임시버튼 : 리스트 가기</button>

      <InputAreas>
        <ImgPreview htmlFor="post_thumb" imgUrl={imgUrl}> 이미지를 <br /> 선택해주세요 </ImgPreview>

        <Right>
          <label>만화제목
            <input type='text' ref={title_ref} placeholder="추억 속 만화 제목을 적어주세요"
              defaultValue={thisPost ? thisPost.title : ''} /></label>

          <label>방영연도
            <input type='number' ref={onair_year_ref}
              defaultValue={thisPost ? thisPost.onair_year : '2000'} /></label>

          <input type='file' id="post_thumb" ref={thumbnail_ref} onChange={uploadImg} />

          <div id="description">
            <label> 만화소개 </label>
            <textarea ref={content_ref} placeholder="당신의 추억 속 이 만화는 어떤 만화였나요?"
              defaultValue={thisPost ? thisPost.content : ''} />
          </div>

          <label>만화 OST
            <input type='url' ref={ost_url_ref}
              defaultValue={thisPost ? thisPost.ost_url : ''} placeholder="클릭하면 자동 검색 ! (직접 입력도 가능)" 
              onClick={youtubeSearch}/></label>


          <ListTitle>유튜브에서 찾아보세요! (만화 제목 기준 검색)</ListTitle>
          <YoutubeList>
            {searchResult ?
              searchResult.map((v, i) => {
                return (
                  <ListItem key={i}>
                    <VideoThumb video_thumb={v.snippet.thumbnails.default.url} />
                    <VideoText>
                      <h5> {v.snippet.title} </h5>
                      {/* <p> { v.snippet.description } </p> */}
                      <button onClick={() => setOstUrl('https://www.youtube.com/watch?v=' + v.id.videoId)}> 선택 </button>
                    </VideoText>
                  </ListItem>
                )
              })
              : <p>검색 결과가 없어요. <br/> (만화 제목 입력 후 OST 입력창 클릭!)</p>
            }
          </YoutubeList>

          <GoToYoutube>
            <p> 그래도 못 찾으셨다면..?</p>
            <YoutubeBtn target='blank' href="https://www.youtube.com/">
              <YoutubeIcon>
                <BsYoutube />
              </YoutubeIcon>  유튜브 바로가기
            </YoutubeBtn>
          </GoToYoutube>
        </Right>

      </InputAreas>

      {isNew ?
        <Button onClick={writePost}> 등록하기 </Button>
        : <Button onClick={EditPost}> 수정하기 </Button>
      }
    </div>
  )
}

const InputAreas = styled.div`
  margin: 120px auto 20px auto;
  display:flex;
  flex-direction: row;
  width: 90%;
  max-width: 900px;
  text-align: left;
`
const Right = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-left: 5%;
  width: 60%;

  input {
    height: 30px;
    width: 70%;
    margin: 10px;
  }

  input[type='file'] {
    width: 0px;
    height:0px;
    margin: -1px;
    padding: 0px;
    overflow:hidden;
  }

  label {
    text-align: left
  }

  #description {
    margin: 10px 0px;
    display:flex;
    text-align: left;
    gap: 10px;
  }

  textarea {
    height: 80px;
    width: 70%;
  }
`

const ImgPreview = styled.label`
  background-color: #ddd;
  background: ${(props) => props.imgUrl ? 'url(' + props.imgUrl + ')' : '#ddd'};
  background-size: cover;
  height: 400px;
  width: 50%;
  max-width:300px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  line-height: 200%;
  font-size: 24px;
  color: ${(props) => props.imgUrl ? 'transparent' : '#999'};


  cursor: pointer;
`


const ListTitle = styled.div`
  width:100%;
  margin: 10px 10px -1px 10px;
  padding: 0px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
  background-color: #ddd;
`

const YoutubeList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  height: 150px;
  box-sizing: border-box;
  overflow: auto;
  width:100%;
  margin: 0px 0px 10px 10px ;

  p {
    margin : 0px;
    line-height: 200%;
    color: #999;
  }
`

const ListItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const VideoThumb = styled.div`
  height: 70px;
  width: 100px;
  min-width: 100px;
  background: url(${(props) => props.video_thumb}) center;
  background-size: cover;
`

const VideoText = styled.div`
  margin: 0px 10px;
  text-align: left;
  font-size: 10px;
`

const GoToYoutube = styled.div`
  display:flex;
  align-items: center;

  p {
    margin : 0px 10px;
    color: #999;
    font-size: 14px;
  }
`

const YoutubeBtn = styled.a`
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid #999;
  border-radius: 10px;
  margin-left: 10px;
  width: 130px;
  padding : 0px 10px;
  height: 30px;
  font-size: 12px;

  &:visited{
    color: #999;
}
`

const YoutubeIcon = styled.span`
  font-size: 30px;
  margin: 0px 10px 3px 0px;
  padding: 0px;
  padding-top: 10px;
  color: red;
`

const Button = styled.button`
  height: 50px;
  width: 80%;
  max-width: 800px;
  margin-top: 20px;
`

export default Write;
