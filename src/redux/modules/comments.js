import axios from 'axios';

const LOAD ='comment/LOAD'
const CREATE ="comment/CREATE"


//액션생성함수
export function loadComments(commentData){
    return {type:LOAD, commentData}
}

export function createComment (comment){
    return {type:CREATE,comment};
}

//미들웨어
export const loadCommentAX = () =>{
    return function(dispatch){
        axios.get('http://localhost:5001/comments')
        .then(response =>dispatch(loadComments(response.data)))
    }
}

export const createCommentAX = (comments) => {
    return function (dispatch) {
      axios.post('http://localhost:5001/comments', comments)
      .then(() => dispatch(createComment(comments)))
    }
  }

//초기값

const initialState = {
    comments:[]
};

//리듀서

export default function reducer(state = initialState, action ={}) {
    switch(action.type){
        case 'comment/LOAD':{
            // console.log(action)
            return{comments: action.commentData}
        }

        case 'comment/CREATE':{
            const new_commnet =[...state.comments, action.comment];
            return {comments: new_commnet};
        }
        default:
            return state;
    }
}