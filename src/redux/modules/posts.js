import axios from 'axios'


// 액션
const LOAD = 'posts/LOAD'
const CREATE = 'posts/CREATE'
const UPDATE = 'posts/UPDATE'


// 액션생성함수
export function load_posts(post_list) {
  return { type: LOAD, post_list }
}

export function create_post(post_data) {
  return { type: CREATE, post_data }
}

export function update_post(post_data) {
  return { type: UPDATE, post_data }
}

// http://54.180.121.151/api

//미들웨어
export const load_posts_like_AX = () => {
  return function (dispatch) {
    // axios.get('http://localhost:5001/posts')
    // .then(response => dispatch(load_posts(response.data)))
    axios.get('http://54.180.121.151/api/posts/likes')
    .then(response => dispatch(load_posts(response.data.posts)))
  }
}

export const load_posts_year_AX = () => {
  return function (dispatch) {
    // axios.get('http://localhost:5001/posts/')
    // .then(response => dispatch(load_posts(response.data.reverse())))
    axios.get('http://54.180.121.151/api/posts/release_year')
    .then(response => dispatch(load_posts(response.data.posts)))
  }
}

export const create_post_AX = (post_data) => {
  return function (dispatch) {
    // axios.post('http://localhost:5001/posts', post_data)
    // .then(() => dispatch(create_post(post_data)))
    axios.post('http://54.180.121.151/api/post', post_data, {headers:{'authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibXV5YWhvQG5hdmVyLmNvbSIsImlhdCI6MTY1NTE5MDQwN30.PzU19ESXQlKUtYC-m8zcmjEoizFYbB2jX5D7SFVl8rU'}})
    .then((response) => {
      console.log(response)
      dispatch(create_post(post_data))
    })
  }
}

export const update_post_AX = (post_id, post_data) => {
  return function (dispatch) { 
    // axios.patch('http://localhost:5001/posts/'+post_id, post_data)
    // .then(() => { dispatch(update_post(post_data))

    axios.patch('http://54.180.121.151/api/post/'+post_id, post_data, {headers:{'authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibXV5YWhvQG5hdmVyLmNvbSIsImlhdCI6MTY1NTE5MDQwN30.PzU19ESXQlKUtYC-m8zcmjEoizFYbB2jX5D7SFVl8rU'}})
    .then((response) => {
      dispatch(update_post(post_data))
    })
  }
}


// 초기값
const initialState = {
  list: [{}],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'posts/LOAD': {
      return { is_loaded: true, list: action.post_list }
    }

    case 'posts/CREATE': {
      const new_post_list = [...state.list, action.post_data]
      return { ...state, list: new_post_list }
    }

    case 'posts/UPDATE': {
      const new_post_list = state.list.map((a) =>
        parseInt(action.post_data.id) === a.id ? { ...action.post_data } : a);
      return { ...state, list: new_post_list }
    }


    default:
      return state;

  }
}



