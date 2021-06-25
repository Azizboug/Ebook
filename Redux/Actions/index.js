import firebase from 'firebase'
import {
    USER_STATE_CHANGE ,
    USER_POST_STATE_CHANGE , 
    USER_FOLLOWING_STATE_CHANGE ,
    USERS_DATA_STATE_CHANGE ,
    USERS_POST_STATE_CHANGE ,
    //USERS_LIKES_STATE_CHANGE, 
    USER_FILE_STATE_CHANGE ,
    USERS_FILE_STATE_CHANGE
                         } from '../Consttants/index'

export function fetchUser () {
    return ((dispatch) =>{
            firebase
            .firestore()
            .collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            //.get()
            .then((snapshot) => {
                if(snapshot.exists){
                    //console.log(snapshot.data())
                    dispatch({ type : USER_STATE_CHANGE  , currentUser : snapshot.data()});
                }
                else{
                    console.log('does not existe')
                }
            })
    })
}

export function fetchPostUser () {
    return ((dispatch) =>{
        firebase.firestore()
            .collection("Posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("UsersPosts")
            .orderBy("creation" , "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data }
                })
                //console.log(posts)
                dispatch({ type : USER_POST_STATE_CHANGE , posts })
            })
    })
}

export function fetchPdfUser () {
    return ((dispatch) =>{
        firebase.firestore()
            .collection("Files")
            .doc(firebase.auth().currentUser.uid)
            .collection("UsersFiles")
            .orderBy("creation" , "asc")
            .limit(1)
            .get()
            .then((snapshot) => {
                //console.log(snapshot)
                let files = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data }

                })  
                dispatch({ type : USER_FILE_STATE_CHANGE , files });
            }
                
            
           )
    })
}

export function fetchFollowingUser () {
    return ((dispatch) =>{
        firebase.firestore()
            .collection("Following")
            .doc(firebase.auth().currentUser.uid)
            .collection("UsersFollowing")
            .onSnapshot((snapshot) => {
                //console.log(snapshot.docs)
                let followings = snapshot.docs.map(doc  =>{
                    const id = doc.id 
                    return  id 
                })
               // console.log({followings})
                dispatch({ type : USER_FOLLOWING_STATE_CHANGE , followings });
                for (let i = 0 ; i < followings.length ; i++){
                    dispatch(fetchDataUser(followings[i] , true , true))
                }
            })
    })
}

export function fetchDataUser (uid , getposts , getpdfs) {
    return((dispatch , getState) =>{
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase
            .firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                //console.log(snapshot.exists)
                if(snapshot.exists){
                    //console.log(snapshot)
                    let user = snapshot.data()
                    user.uid = snapshot.id;
                    dispatch({ type : USERS_DATA_STATE_CHANGE  , user });
                    
                }
                else{
                    console.log('does not existe')
                }
            })
            if (getposts ){
                dispatch(fetchFollowingPostUser(uid));
                
            }
            if (getpdfs){
                dispatch (fetchFollowingPdfUser(uid)) ;
            }
        }
    })
}

export function fetchFollowingPostUser (uid) {
    return ((dispatch , getState) =>{
        firebase.firestore()
            .collection("Posts")
            .doc(uid)
            .collection("UsersPosts")
            .orderBy("creation" , "asc")
            .get()
            .then((snapshot) => {
              // if(snapshot.exists){
                    const uid = snapshot.query._delegate._query.path.segments[1] ;
                    //const uid = getState().usersState.users[0].uid
                    //console.log(snapshot);
                    console.log({uid}) ;
                    const user = getState().usersState.users.find(el => el.uid === uid) ;

                let posts = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data , user }
                })
                //console.log(posts)
                /*for (let i =0 ; i< posts.length ; i++){
                    dispatch(fetchFollowingLikesUser(uid , posts[i].id))
                }*/
                dispatch({ type : USERS_POST_STATE_CHANGE , posts , uid });
                //console.log(getState())
                }
                
            
           )
    })
}

export function fetchFollowingPdfUser (uid) {
    return ((dispatch , getState) =>{
        firebase.firestore()
            .collection("Files")
            .doc(uid)
            .collection("UsersFiles")
            .orderBy("creation" , "asc")
            .get()
            .then((snapshot) => {
              // if(snapshot.exists){
                    const uid = snapshot.query._delegate._query.path.segments[1] ;
                    //const uid = getState().usersState.users[0].uid
                    //console.log(snapshot);
                    //console.log({uid}) ;
                    const user = getState().usersState.users.find(el => el.uid === uid) ;

                let files = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data , user }
                })
                console.log(files)
                dispatch({ type : USERS_FILE_STATE_CHANGE , files , uid });
                //console.log(getState())
                }
                
            
           )
    })
}


/*export function fetchFollowingLikesUser (uid , postId) {
    return ((dispatch , getState) =>{
        firebase.firestore()
            .collection("Posts")
            .doc(uid)
            .collection("UsersPosts")
            .doc(postId)
            .collection("PostLikes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
              // if(snapshot.exists){
                    const PostId = snapshot.id ;
                    //console.log({ snapshot})
                    let currentUserLikes = false ;
                    
                    if (snapshot.exists){
                        currentUserLikes = true ;
                    }
                    
                dispatch({ type : USERS_LIKES_STATE_CHANGE , PostId , currentUserLikes });
                console.log(getState())
                }
                
            
           )
    })
}*/



