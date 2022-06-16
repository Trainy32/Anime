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

  // 로그인된 유저가 아니라면, 뒤로 돌려보냅니다.
  React.useEffect(() => {
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
      axios.get('http://54.180.121.151/api/post/detail/' + params.post_id)
        .then(response => {
          setThisPost(response.data)
          setImgUrl(response.data.thumbnail_url)
          if (is_login && user_info.user_id !== response.data.user_id) {
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
    if (title_ref.current.value.length > 0 && content_ref.current.value.length > 0 && imgUrl) {
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
    } else {
      const msg =
        !title_ref.current.value.length > 0 ? '만화 제목을 등록해주세요' :
          !content_ref.current.value.length > 0 ? '만화를 소개해주세요' : '이미지를 등록해주세요'
      window.alert(msg)
    }
  }


  // 수정하기 버튼 눌렀을 때
  const EditPost = () => {
    if (title_ref.current.value.length > 0 && content_ref.current.value.length > 0 && imgUrl) {
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
    } else {
      const msg =
        !title_ref.current.value.length > 0 ? '만화 제목을 등록해주세요' :
          !content_ref.current.value.length > 0 ? '만화를 소개해주세요' : '이미지를 등록해주세요'
      window.alert(msg)
    }
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
    <Wrap>
      <ImgPreview htmlFor="post_thumb" imgUrl={imgUrl}> 이미지를 <br /> 선택해주세요 </ImgPreview>

      <InputAreas>
        <label>만화제목 </label>
        <input type='text' id="title" ref={title_ref} placeholder="추억 속 만화 제목을 적어주세요"
          defaultValue={thisPost ? thisPost.title : ''} />

        <label>방영연도</label>
        <input type='number' ref={onair_year_ref}
          defaultValue={thisPost ? thisPost.onair_year : '2000'} />
        <input type='file' id="post_thumb" ref={thumbnail_ref} onChange={uploadImg} />
        <div id="description">
          <label> 만화소개 </label>
          <textarea ref={content_ref} placeholder="당신의 추억 속 이 만화는 어떤 만화였나요?"
            defaultValue={thisPost ? thisPost.content : ''} />
        </div>

        <label htmlFor={ost_url_ref}>만화 OST</label>
        <input type='url' ref={ost_url_ref}
          defaultValue={thisPost ? thisPost.ost_url : ''} placeholder="클릭하면 자동 검색 ! (직접 입력도 가능)"
          onClick={youtubeSearch} />


        <ListTitle>유튜브에서 찾아보세요! (만화 제목 기준 검색)</ListTitle>
        <YoutubeList>
          {searchResult ?
            searchResult.map((v, i) => {
              return (
                <ListItem key={i} onClick={() => setOstUrl('https://www.youtube.com/watch?v=' + v.id.videoId)} >
                  <VideoThumb video_thumb={v.snippet.thumbnails.default.url} />
                  <VideoText>
                    {v.snippet.title}
                  </VideoText>
                  <button> 선택 </button>
                </ListItem>
              )
            })
            : <p>검색 결과가 없어요. <br /> (만화 제목 입력 후 OST 입력창 클릭!)</p>
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
      </InputAreas>

      {isNew ?
        <Button onClick={writePost}> 등록하기 </Button>
        : <Button onClick={EditPost}> 수정하기 </Button>
      }

    </Wrap>
  )
}

const Wrap = styled.div`
  margin: 50px auto 20px auto;
  padding: 50px;
  display:flex;
  flex-direction: column;
  align-items:center;
  width: 90%;
  max-width: 600px;
  text-align: left;

  border: 3px solid black;
  border-radius: 30px;
  box-shadow: 3px 8px 0px #000;
`
const InputAreas = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 80%;

  input {
    height: 30px;
    padding: 10px 20px;
    width: 90%;
    margin: 10px 0px 30px 0px;
    outline: none;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 15px;

    &:focus {
      border: 2px solid #49b0ab;
      background-color:#e6f4f4;
      color: #49b0ab;
    }
  }

  input[type='file'] {
    width: 0px;
    height:0px;
    margin: -1px;
    padding: 0px;
    border: 0px;
    overflow:hidden;
  }

  label {
    text-align: left;
    font-weight: 600;
    
    font-family: '양진체';
  }

  #description {
    display:flex;
    flex-direction: column;
    text-align: left;
    gap: 10px;
  }

  textarea {
    height: 90px;
    padding: 20px;
    width: 90%;
    border: 2px solid black;
    border-radius: 15px;
    margin-bottom: 30px;
    font-size: 15px;
    font-family: '';

    &:focus {
      outline: none;
      border: 2px solid #49b0ab;
      background-color:#e6f4f4;
      color: #49b0ab;
    }
  }
`

const ImgPreview = styled.label`
  background: ${(props) => props.imgUrl ? 'url(' + props.imgUrl + ')' : '#eee'};
  background-size: cover;
  height: 250px;
  width: 180px;
  border-radius: 20px;
  border: 2px solid #000;
  margin: 30px;
  box-shadow: 2px 5px 0px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  line-height: 200%;
  font-size: 18px;
  font-weight: 500;
  font-family: '양진체';
  color: ${(props) => props.imgUrl ? 'transparent' : '#000'};

  cursor: pointer;
`


const ListTitle = styled.div`
  width:100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
  font-family: '양진체';
`

const YoutubeList = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  border-radius: 20px;
  height: 250px;
  overflow: auto;
  width: 100%;
  margin: 10px 0px ;

  &::-webkit-scrollbar {
    width: 0px;
  }

  p {
    margin : 20px;
    line-height: 200%;
    color: #999;
  }
`
const ListItem = styled.div`
  padding : 10px;
  display: flex;
  margin: 10px 10px 0px 10px;
  border-radius: 20px;
  cursor:pointer;

  &:hover {
    background-color:#ffeeef;
    color: #000;

    button{
    background-color:#fb8b8c;
    color: #000;
    }
  }

  button {
    margin-top: 15px;
    width: 60px;
    height: 40px;
    outline: none;
    border: 2px solid black;
    border-radius: 50px;
    box-shadow: 1px 3px 0px #000;
    font-size: 12px;
    font-weight: 600;
    color: #fb8b8c;
    background-color:#ffeeef;
    cursor:pointer;
  }
`

const VideoThumb = styled.div`
  height: 70px;
  width: 100px;
  min-width: 100px;
  background: url(${(props) => props.video_thumb}) center;
  background-size: cover;
  border-radius: 5px;
`

const VideoText = styled.div`
  margin: 0px 10px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  width: 70%;
`

const GoToYoutube = styled.div`
  display:flex;
  align-items: center;

  p {
    margin : 0px 10px;
    color: #999;
    font-size: 16px;    
    font-family: '양진체';
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
  padding : 4px 10px 0px 10px;
  height: 30px;
  font-size: 14px;
  font-family: '양진체';

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
  padding: 16px;
  width: 60%;
  margin: 80px 0px 20px 0px;
  outline: none;
  border: 3px solid black;
  border-radius: 50px;
  box-shadow: 2px 5px 0px #000;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  cursor:pointer;
  background-color:#49b0ab;

  &:hover {
    background-color:#fae209;
    color: #000;
  }
`

export default Write;
