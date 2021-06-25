import React  from 'react'
import {View , TextInput ,Text ,Image , StyleSheet, TouchableOpacity} from 'react-native'
import 'firebase/storage';
import 'firebase/firestore'
import firebase from 'firebase';
 
export default function SavePic (props) {
    console.log(props)
    console.log(props.route.params.i) ;
    const Uplaod = async() =>{
        const uri = props.route.params.i ;
        const Cpath = `ProfilePic/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const respons = await fetch(uri)
        const blob = await respons.blob() ;
        const T = firebase.storage()
        .ref()
        .child(Cpath)
        .put(blob)
        const TProg = snapshot => {
            console.log(`transferred : ${snapshot.bytesTransferred}`)
        }
        const TComp = () => {
            T.snapshot.ref.getDownloadURL()
            .then((snapshot) => {
                SaveData(snapshot) ;
                //console.log(snapshot)
            })
        }
        const TErr = snapshot => {
            console.log(snapshot)
        }
        T.on("state_changed" ,TProg ,TErr ,TComp ) ;
        const SaveData = (downloadURL) =>{
            const userPostLike = firebase.firestore()
            .collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                downloadURL ,
            })
            .then(( function () {
                props.navigation.popToTop()
            }))
        }
    }
    return (
        <View style = {styles.container}>    
            <Image source ={{uri : props.route.params.i}} style = {styles.ImageContainer}/>
            <TouchableOpacity 
                style={styles.button}
                onPress ={() => Uplaod() }>
                <Text style={styles.text}>Change picture</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FAB30F',
    },
    ImageContainer : {
        flex : 1,
        height:'95%',
        width:'95%',
        resizeMode:'contain',
        alignSelf:'center',
    },
    button:{
        padding:'3%',
        backgroundColor:'#212121',
        borderRadius:40,
        marginLeft:'25%',
        marginRight:'25%',
        marginTop:'1%',
        marginBottom:'2%',
    },
    text:{
        textAlign:'center',
        fontSize:24,
        color:'white',
        fontWeight:'bold',
    },
})