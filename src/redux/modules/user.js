import axios from 'axios'
import instance from '../../shared/Request'



// 액션
// const LOAD = 'user/LOAD'
const CREATE = 'user/CREATE'
const SET_USER = 'user/SET_USER'
// const UPDATE = 'user/UPDATE'


// 액션생성함수
// export function load_posts(post_list) {
//   return { type: LOAD, post_list }
// }

export function add_user(post_info) {
  return { type: CREATE, post_info }
}

export function set_user(user_info) {
  return { type: SET_USER, user_info }
}

// export function update_post(post_data) {
//   return { type: UPDATE, post_data }
// }


//미들웨어
// export const load_posts_AX = () => {
//   return function (dispatch) {
//     axios.get('http://localhost:5001/posts')
//       .then(response => dispatch(load_posts(response.data)))

//   }
// }





// 미들웨어

// 회원정보 저장
export const add_user_AX = (post_info) => {
  return function (dispatch) {
    axios.post('http://54.180.121.151/api/user/signup', post_info)
      .then((response) => {
        console.log(response);
        dispatch(add_user(post_info))
      })
      // 응답 메세지(회원가입 완료 or 닉네임 또는 패스워드를 확인하세요) 추가 예정
      .catch((error) => console.log(error));
  }
}

// 로그인 요청 확인
export const LoginDB = (login_info) => {
  return function (dispatch) {
    axios.post('http://54.180.121.151/api/user/login', login_info)
      .then((response) => {
        localStorage.setItem("user_token", response.data.token);

      })
      .catch((error) => console.log(error));
  }
}

// 현재 유저 정보 확인
export const loginCheckDB = () => {
  return function (dispatch) {
    instance.get('/api/user/me')
      .then((response) => {
        // dispatch(set_user({
        //   nickname: response.data.user.nickname,
        //   profile_img: response.data.user.profile_img,
        //   user_id: response.data.user.user_id,
        //   // is_login: true,
        // }))
        console.log(response.data.user.nickname)
      })
      .catch((error) => console.log(error));
  }
}


// 초기값
const initialState = {
  list: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case 'posts/LOAD': {
    //   return { is_loaded: true, list: action.post_list }
    // }

    case 'user/CREATE': {
      const new_user_list = [...state.list, action.post_info]
      return { list: new_user_list };
    }


    case 'user/SET_USER': {
      // // console.log(action.user_info)
      // const user_info = [action.user_info]
      // return { user_info: user_info };
    }


    // case 'posts/UPDATE': {
    //   const new_post_list = state.posts.map((e, i) =>
    //     parseInt(action.post_data.id) === e.id ? { ...action.post_data } : e);
    //   return { ...state, list: new_post_list }
    // }


    default:
      return state;

  }
}



