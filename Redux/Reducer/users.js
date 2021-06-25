import {USERS_DATA_STATE_CHANGE , USERS_POST_STATE_CHANGE , USERS_FILE_STATE_CHANGE} from '../Consttants/index'

const initialState = {
    users : [],
    userLoaded: 0 ,
    feed : [] ,
    feedP : [] ,
}

export const users = (state = initialState , action) => {
    switch(action.type){
        case USERS_DATA_STATE_CHANGE :
            return {
                ...state,
                users : [ ...state.users , action.user]
            }
        case USERS_POST_STATE_CHANGE :
            return {
                ...state,
                userLoaded : state.userLoaded + 1 ,
                feed : [...state.feed , ...action.posts ]
            }
        case USERS_FILE_STATE_CHANGE :
            return {
                ...state,
                userLoaded : state.userLoaded  ,
                feedP : [...state.feedP , ...action.files]
            }
        /*case USERS_LIKES_STATE_CHANGE :
            return {
                ...state,
                feed : state.feed.map(posts => posts.id == action.PostId ? 
                    {...posts , currentUserLikes : action.currentUserLikes } : posts )
            }*/
        default  : return state ;
    }            
}