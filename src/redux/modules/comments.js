import axios from 'axios';

const LOAD ='comment/LOAD'
const CREATE ="comment/CREATE"
const DELETE = "comment/DELETE"


//액션생성함수
export function loadComments(commentData){
    return {type:LOAD, commentData}
}

export function createComment (comment){
    return {type:CREATE,comment};
}

export function deleteComment(comment_id){
    return{type: DELETE, comment_id};
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

  export const deleteCommentAX = (comment_id)=> {
    return function (dispatch, getState) {
        axios.delete(`http://localhost:5001/comments`)
        .then((response) => console.log(response))
        const comment_list = getState().comments.comments
        console.log(comment_list)
        const comment_index = comment_list.findIndex((c)=>{
            return c.id === comment_id;
        });
        // console.log(comment_index)
        dispatch(deleteComment(comment_index));
    }

  }

//초기값

const initialState = {
    comments:[]
};

//리듀서

export default function reducer(state = initialState, action ={}) {
    switch(action.type){
        //로드 리듀서
        case 'comment/LOAD':{
            // console.log(action)
            return{comments: action.commentData}
        }
        // 댓글생성 리듀서
        case 'comment/CREATE':{
            const new_comment =[...state.comments, action.comment];
            return {comments: new_comment};
        }
        //댓글 삭제 리듀서
        case 'comment/DELETE':{ 
            const new_comments_list = state.comments.filter((c,idx)=>{
                // console.log(new_comments_list)
             return parseInt(action.comment_id) !==idx   
            });
            return {comments: new_comments_list};
        }

        default:
            return state;
    }
}