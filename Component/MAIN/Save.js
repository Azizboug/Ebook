import React , {useState} from 'react'
import {View , TextInput ,Button ,Image, StyleSheet, TouchableOpacity, Text} from 'react-native'
import firebase from 'firebase/app'
//import { NavigationContainer } from '@react-navigation/native'
import "firebase/storage"
import "firebase/firestore"
import {connect} from 'react-redux'
 
function Save (props) {
    const [caption, setcaption] = useState("");
    const Uplaod = async() =>{
        const uri = props.route.params.i ;
        const Cpath = `Posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const respons = await fetch(uri)
        const blob = await respons.blob() ;
        const T = firebase
        .storage()
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
                console.log(snapshot)
            })
        }
        const TErr = snapshot => {
            console.log(snapshot)
        }
        T.on("state_changed" ,TProg ,TErr ,TComp ) ;
        const SaveData = (downloadURL) =>{
            firebase.firestore()
            .collection("Posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("UsersPosts")
            .doc(`${props.currentUser.publication}${firebase.auth().currentUser.uid}`)
            .set({
                downloadURL,
                caption,
                creation : firebase.firestore.FieldValue.serverTimestamp() , 
            }).then(( function () {
                props.navigation.navigate('Pdf')
            }))
        }
    }
    return (
        <View style = {styles.container}>
            <View style={styles.textflex}>
                <TextInput 
                    multiline={true}
                    style={styles.input}
                    placeholder = "Write a coption about your book . . ."
                    onChangeText ={(caption)=> setcaption(caption)}
                />
            </View>    
            <View style={styles.imgflex}>
                <Image source ={{uri : props.route.params.i}} style = {styles.ImageContainer}/>
            </View>
            <View style={styles.btnflex}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress ={() => Uplaod() }>
                    <Text style={styles.text}>Upload Pdf file</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FAB30F',
    },
    textflex:{
        flex:1,
    },
    imgflex:{
        flex:4,
    },
    btnflex:{
        flex:1,
    },
    input:{
        borderBottomWidth:1,
        margin:'5%',
        padding:'2%',
        justifyContent:'flex-start',
        fontSize:16,
        borderBottomColor:'#212121',
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
        marginTop:'10%',
    },
    text:{
        textAlign:'center',
        fontSize:24,
        color:'white',
        fontWeight:'bold',
    },
});
const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
})
export default connect(mapStateToProps , null)(Save);