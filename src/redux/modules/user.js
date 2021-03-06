import axios from 'axios'
import instance from '../../shared/Request'


// 액션
const CREATE = 'user/CREATE'
const SET_USER = 'user/SET_USER'


export function add_user(post_info) {
  return { type: CREATE, post_info }
}

export function set_user(user_info) {
  return { type: SET_USER, user_info }
}




// 미들웨어

// 회원정보 저장
export const add_user_AX = (post_info) => {
  return function (dispatch) {
    axios.post('http://54.180.121.151/api/user/signup', post_info)
      .then((response) => {
        dispatch(add_user(post_info))
        window.alert("회원가입 완료!")
        window.location.replace('/login')
      })
      .catch((error) => {
        error.response.data.alert === "이미 가입된 이메일 또는 닉네임이 있습니다." ?
          alert("이미 가입된 닉네임이 있습니다.") : console.log(error.response.data.alert)
      })
  }
}

// 로그인 요청 확인
export const LoginDB = (login_info) => {
  return function (dispatch) {
    axios.post('http://54.180.121.151/api/user/login', login_info)
      .then((response) => {
        localStorage.setItem("user_token", response.data.token);
        window.alert("로그인 완료!")
        window.location.replace('/')
      })
      .catch((error) => alert(error.response.data.alert));
  }
}

// 현재 유저 정보 확인
export const loginCheckDB = () => {
  return function (dispatch) {
    instance.get('/api/user/me')
      .then((response) => {
        dispatch(set_user({
          nickname: response.data.user.nickname,
          profile_img: response.data.user.profile_img,
          user_id: response.data.user.user_id,
        }))
      })
      .catch((error) => console.log(error));
  }
}


// 초기값
const initialState = {
  user_info: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case 'user/SET_USER': {
      const user_info = [action.user_info]
      console.log(user_info)
      return { user_info: user_info };
    }


    default:
      return state;

  }
}



