import {USER_STATE_CHANGE , USER_POST_STATE_CHANGE , USER_FOLLOWING_STATE_CHANGE , USER_FILE_STATE_CHANGE} from '../Consttants/index'

const initialState = {
    currentUser : null,
    posts : [],
    followings : [] ,
    files : [] ,
}

export const user = (state = initialState , action) => {
    switch(action.type){
        case USER_STATE_CHANGE :
            return {
                ...state,
                currentUser : action.currentUser
            }
        case USER_POST_STATE_CHANGE :
            return {
                ...state,
                posts : action.posts
            }
        case USER_FILE_STATE_CHANGE :
            return {
                    ...state,
                    files : action.files
            }
        case USER_FOLLOWING_STATE_CHANGE :
            return {
                    ...state,
                    followings : action.followings
            }
        default  : return state ;
    }            
}