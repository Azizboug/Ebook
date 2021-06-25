import React ,{useState ,useEffect} from 'react'
import { View , StyleSheet , Text , Image ,FlatList ,SafeAreaView, TouchableOpacity  , ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
require ('firebase/firestore')

function Profile(props) {
    const [user ,setUser] = useState(null)
    const [post , setPost] = useState ([])
    const [follow ,setFollow] = useState(false)
    const [profilePic , setprofilePic] = useState ([])
 
    useEffect (() =>{
        const {currentUser ,posts} = props;
        //console.log({posts}) ;

        if (props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser);
            setPost(posts);
            //console.log(posts)
            //console.log(currentUser);
        }
        else {
            firebase
            .firestore()
            .collection("Users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    console.log(snapshot)
                    setUser(snapshot.data())
                }
                else{
                    console.log('does not existe')
                }
            })
            firebase.firestore()
            .collection("Posts")
            .doc(props.route.params.uid)
            .collection("UsersPosts")
            .orderBy("creation" , "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data }
                })
                setPost(posts)
            });
        }
        if (props.followings.indexOf(props.route.params.uid) > -1){
            setFollow(true);
        }else {
            setFollow(false);
        }
        firebase.firestore()
            .collection("Users")
            .doc(props.route.params.uid)
            .collection("ProfilePic")
            .get()
            .then((snapshot) => {
                console.log(snapshot)
                let Prof = snapshot.docs.map(doc  =>{
                    const data = doc.data()
                    const id = doc.id 
                    return { id , ...data }
                })
                console.log(Prof)
                setprofilePic(Prof)
            })
    }, [props.route.params.uid , props.followings])


    //console.log(props.route.params.uid);
    const onFollow = () =>{
        firebase.firestore()
        .collection('Following')
        .doc(firebase.auth().currentUser.uid)
        .collection('UsersFollowing')
        .doc(props.route.params.uid)
        .set({})
    }

    const unFollow = () =>{
        firebase.firestore()
        .collection('Following')
        .doc(firebase.auth().currentUser.uid)
        .collection('UsersFollowing')
        .doc(props.route.params.uid)
        .delete()
    }
    const onLogout = () =>{
        firebase.auth().signOut();
    }

    return (
        <View style = {styles.container}>
            {user ?<View style =  {styles.containerr}>
            <LinearGradient
                colors={['#ab7c18', '#FAB30F']}
                style={styles.profile}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.profilepic}>
                    
                    {user ? <Image
                        style={styles.image}
                        source = {{ uri : user.downloadURL}} 
                     /> : <Image/>}
                </View>
                
                    {props.route.params.uid != firebase.auth().currentUser.uid ? 
                    (<View>
                        <View style={styles.info2}> 
                            <Text style={styles.text2}>  {user ? user.name : "unknown user"} </Text>
                            <Text style={styles.text2}>  Books : {user ? user.publication : "undifined"}</Text>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress ={()=> {!follow ?  onFollow() : unFollow() } }
                            >
                               <Text style={styles.btntext}>{!follow? "follow " : "unfollow" }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ):
                    (<View style={styles.all}>
                        <View style={styles.info}>
                            <View style={styles.infos}>
                                <View style={styles.book}>
                                <View>
                                <Text style={styles.titles}>Name:</Text>
                                <Text style={styles.text}>{user ? user.name : "unknown user"} </Text>
                                <Text style={styles.titles}>Email:</Text>
                                <Text style={styles.text}>{user ? user.email : "unknown user"} </Text>
                                </View>
                                <View style={styles.bookstl}>
                                <Text style={styles.booktxt}>Books: {user ? user.publication : "unknown user"}</Text>
                                </View>
                                </View>
                                
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress ={()=> props.navigation.navigate( 'EditProf' ) }
                                >
                                    <Text style={styles.btntext}>Edit infos</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.logout}>
                            <TouchableOpacity
                                style={styles.logoutbtn}
                                onPress ={()=> onLogout() }>
                                <Image
                                style={styles.logoutimage}
                                source={require('../Photos/logout.png')}
                                />    
                            </TouchableOpacity>
                        </View></View>)
                    }
                
            </LinearGradient>
             <View style={styles.posts}>
                <SafeAreaView style = {styles.PostContainer} > 
                    <FlatList 
                    numColumns ={1}
                    horizontal = {false}
                    data = {post}
                    renderItem = {({item}) =>(
                        <View style={styles.postimage}>
                            <View style={styles.posttop}>
                            {user ? <Image   style={styles.postprofilepic}  source = {{ uri : user.downloadURL}} 
                                           
                       
                     /> : <Image/>}
                            <Text style={styles.posttext}>{user ? user.name : "unknown user"}</Text>
                            </View>
                            <Image source = {{ uri : item.downloadURL}} style = {styles.imageContainer} />
                        </View>
                    )}
                    //renderItem = {renderItem}
                // keyExtractor={item => item.id}  
                />
                </SafeAreaView>
            </View>
            </View>
             : 
             <View>
                 <View style={styles.image}>
            <Image  
              source={require('../Photos/loading.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text}>LOADING...</Text>
            <ActivityIndicator size="50%" color="black" style={styles.rotate} />
          </View>
             </View> }
        </View>
    )
}



const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    posts : store.userState.posts ,
    followings : store.userState.followings
})

const styles = StyleSheet.create ({
    container: {
        flex : 1 ,
        backgroundColor:'#FAB30F',
    },
    profile:{
        flex:1,
        flexDirection:'row',
        borderBottomLeftRadius:30,
    },
    all:{
        flex:2,
        flexDirection:'row',
        marginTop:'10%',
        alignItems:'center',
    },
    profilepic:{
        flex:1,
        justifyContent:'center',
        marginTop:'5%',
    },
    image:{
        height:100,
        width:100,
        borderRadius:50,
        alignSelf:'flex-start',
        marginLeft:'5%',
    },
    info:{
        flex:3,
    },
    book:{
        flexDirection:'row',
    },
    bookstl:{
        justifyContent:'center',
    },
    booktxt:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
    },
    info2:{
        flex:2,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    infos:{
        flex:2,
    },
    titles:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
    },
    text:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
    },
    text2:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
    },
    btn:{
        flex:1,
    },
    button:{
        backgroundColor:'#212121',
        padding:'3%',
        marginRight:'40%',
        borderRadius:40,
    },
    btntext:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    },
    logout:{
        flex:1,
    },
    logoutbtn:{
    },
    logoutimage:{
        width:50,
        height:50,
    },
    posts:{
        flex:3,
        backgroundColor:'#FAB30F',
    },
    PostContainer : {
        flex :1,
    },
    postimage :{
        flex : 1,
        marginRight:'1%',
        marginLeft:'1%',
    },
    posttop:{
        flexDirection:'row',
        alignItems:'center',
        margin:'3%',
    },
    postprofilepic:{
        height:40,
        width:40,
        borderRadius:20,
    },
    posttext:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
        marginLeft:'2%',
    },
    imageContainer : {
         flex :1 ,
         borderRadius:20,
         aspectRatio : .7,
    },
    containerr: {
        flex : 1 ,
        //backgroundColor:'#FAB30F',
    },
})
export default connect(mapStateToProps , null)(Profile);

