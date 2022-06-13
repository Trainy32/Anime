import axios from 'axios'


// 액션
// const LOAD = 'user/LOAD'
const CREATE = 'user/CREATE'
// const UPDATE = 'user/UPDATE'


// 액션생성함수
// export function load_posts(post_list) {
//   return { type: LOAD, post_list }
// }

export function add_user(post_info) {
  return { type: CREATE, post_info }
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
    axios.post('http://localhost:5001/user', post_info)
      .then((response) => {
        dispatch(add_user(post_info))
      })
      // 응답 메세지(회원가입 완료 or 닉네임 또는 패스워드를 확인하세요) 추가 예정
      // .catch(function (error) { console.log("에러", error.response.data); })
      .catch((error) => console.log(error));
  }
}



// export const update_post_AX = (post_data) => {
//   return function (dispatch) {
//     axios.put('http://localhost:5001/posts', post_data)
//       .then(() => dispatch(update_post(post_data)))
//   }
// }


// 초기값
const initialState = {
  list: [{
    user_id: "test3@naver.com",
    profile_img: 3,
    nickname: "test3",
    password: "123",
    confirm_password: "123",
    id: 3,
  }],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case 'posts/LOAD': {
    //   return { is_loaded: true, list: action.post_list }
    // }

    case 'user/CREATE': {
      console.log(state.list)
      const new_user_list = [...state.list, action.post_info]
      return { list: new_user_list };
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



