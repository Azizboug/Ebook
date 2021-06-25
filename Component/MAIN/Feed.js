import React ,{useState ,useEffect} from 'react'
import { View , StyleSheet , Text , Image ,FlatList ,SafeAreaView, TouchableOpacity , ActivityIndicator, Button } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
require ('firebase/firestore')

function Feed(props ) {
    const [post , setPost] = useState ([])

    useEffect (() =>{
   
        
        if (props.userLoaded == props.followings.length && props.followings.length !==0){
            props.feed.sort(function(x,y) {
                return x.creation - y.creation;
            })
            setPost(props.feed) ;
            
        }
        //console.log(post)
    }, [props.userLoaded , props.feed ])
    //console.log(props.feed)
    const onShowDetails = (i , j ) =>{
       // const i = {uri : props.feedP.downloadPDFURL}
        props.navigation.navigate( 'Details' , {i , j} )
    }
    return (
        <View style = {styles.container}>
                <SafeAreaView style = {styles.PostContainer} > 
                    <FlatList 
                    numColumns ={1}
                    horizontal = {false}
                    data = {post}
                    renderItem = {({item}) =>(
                        <View style={styles.postimage}>
                                <TouchableOpacity 
                                onPress ={()=> props.navigation.navigate("Profile" ,{uid : item.user.uid})}
                                style={styles.posttop}
                                >
                                   <Image style={styles.postprofilepic} source = {{ uri : item.user.downloadURL}}/>
                                   <Text style={styles.text2}>  {item ? item.user.name : "unknown user"} </Text>
                                </TouchableOpacity> 
                            <Text style={styles.caption}>  {item ? item.caption : "unknown user"} </Text>
                            <Image source = {{ uri : item.downloadURL}} style = {styles.imageContainer} />
                                <View>
                                     <TouchableOpacity
                                        style={styles.buttonfollow}
                                        onPress ={()=> onShowDetails(item.id , item.user.uid) }
                                      >
                                     <Text style={styles.btntext} >Read Book</Text>
                                     </TouchableOpacity> 
                               </View>
                        </View>
                    )}
                    //renderItem = {renderItem}
                // keyExtractor={item => item.id}  
                />
                </SafeAreaView>
        </View>
    )
}



const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    followings : store.userState.followings,
    feed : store.usersState.feed,
    feedP : store.usersState.feedP ,
    userLoaded : store.usersState.userLoaded
})

const styles = StyleSheet.create ({
    container: {
        flex : 1 ,
        backgroundColor:'#FAB30F',
    },
    PostContainer : {
        flex :1,
        marginTop:'10%',
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
    text2:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
    },
    caption:{
        fontSize:16,
        color:'black',
        marginBottom:'2%',
        marginRight:'2%',
        marginLeft:'2%',
    },
    imageContainer : {
         flex :1 ,
         borderTopRightRadius:20,
         borderTopLeftRadius:20,
         aspectRatio : .7,
    },
    buttonfollow:{
        backgroundColor:'#212121',
        padding:'4%',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40, 
    },
    btntext:{
        textAlign:'center',
        color:'white',
        fontSize:22,
        fontWeight:'bold',
    },

})
export default connect(mapStateToProps , null)(Feed);

