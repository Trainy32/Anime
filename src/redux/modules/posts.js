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


//미들웨어



// 초기값
const initialState = {
  posts: [
    {
      "post_id" : 0,
      "created_at": "2022-06-10T09:54:11.076Z",
      "title": "만화 제목이에요",
      "thumbnail_url":"https://mblogthumb-phinf.pstatic.net/20151210_192/whanfwn7_1449729673781P3BFn_PNG/pokemon_card___ash__misty__brock_y_pikachu_by_adfpf1-d6jexcj.png?type=w2",
      "onair_year": 1997,
      "content": "피카츄 귀여워!",
      "ost_url": "https://www.youtube.com/watch?v=mPaNK28VSoI",
      "user_id": "user123",
      "likes" : 12
      },
  ]
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'posts/LOAD': {
      return { posts: action.post_list }
    }

    case 'posts/CREATE': {
      const new_post_list = [...state.list, action.post_data]
      return { posts: new_post_list }
    }
    
    case 'posts/UPDATE': {
      const new_post_list = state.list.map((e, i) =>
        parseInt(action.post_data.post_id) === e.id ? { ...action.post_data } : e);
      return { posts: new_post_list }
    }


    default:
      return state;

  }
}



