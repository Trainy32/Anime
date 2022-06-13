import axios from 'axios';

const CREATE ="comment/CREATE"


//액션생성함수

export function createComment (comment){
    return {type:CREATE,comment};
}

//초기값

const initialState = {
    comments:[]
};
//미들웨어
export const createCommentAX = (comments) => {
    return function (dispatch) {
      axios.post('http://localhost:5001/comments', comments)
      .then(() => dispatch(createComment(comments)))
    }
  }



//리듀서

export default function reducer(state = initialState, action ={}) {
    switch(action.type){
        case 'comment/CREATE':{
            const new_commnet =[...state.comments, action.comment];
            return {comments: new_commnet};
        }
        default:
            return state;
    }
}