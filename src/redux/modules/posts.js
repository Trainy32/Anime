import axios from 'axios'


// 액션
const LOAD = 'posts/LOAD'
const LOADONE = 'posts/LOADONE'
const CREATE = 'posts/CREATE'
const UPDATE = 'posts/UPDATE'


// 액션생성함수
export function load_posts(post_list) {
  return { type: LOAD, post_list }
}

export function load_one(post_data) {
  return { type: LOAD, post_data }
}

export function create_post(post_data) {
  return { type: CREATE, post_data }
}

export function update_post(post_data) {
  return { type: UPDATE, post_data }
}


//미들웨어
export const load_posts_AX = () =>{
  return function (dispatch) {
    axios.get('http://localhost:5001/posts')
    .then(response => dispatch(load_posts(response.data)))
  }
}

export const load_one_AX = (post_id) =>{
  return function (dispatch) {
    axios.get('http://localhost:5001/posts')
    .then(response => response.find((p) => p.id === post_id))
    .then(response => dispatch(load_posts(response.data)))
  }
}

export const create_post_AX = (post_data) => {
  return function (dispatch) {
    axios.post('http://localhost:5001/posts', post_data)
    .then(() => dispatch(create_post(post_data)))
  }
}

export const update_post_AX = (post_data) => {
  return function (dispatch) {
    console.log(post_data)
  }
}


// 초기값
const initialState = {
  list: [{}],
  post_selected: {}, 
  is_loaded: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'posts/LOAD': {
      return { is_loaded : true, list: action.post_list }
    }

    case 'posts/LOADONE': {
      return { is_loaded : true, post_selected: action.post_data }
    }

    case 'posts/CREATE': {
      const new_post_list = [...state.posts, action.post_data]
      return { ...state, list: new_post_list }
    }
    
    case 'posts/UPDATE': {
      const new_post_list = state.posts.map((e, i) =>
        parseInt(action.post_data.id) === e.id ? { ...action.post_data } : e);
      return { ...state, list: new_post_list }
    }


    default:
      return state;

  }
}



