import React, {useState} from 'react';
import {connect} from 'react-redux'
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';
import firebase from 'firebase/app'
import "firebase/storage"
import "firebase/firestore"
import * as DocumentPicker from 'expo-document-picker';

import PDFReader from 'rn-pdf-reader-js'

function Pdff (props){
  const [PdfUri, setPdfUri] = useState(null);
  const  files = props.files
  //console.log(props)
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
    });
    console.log(result);
    setPdfUri(result.uri);
  }
   const PDF = {uri : PdfUri}
   const Uplaod = async() =>{
    const uri = PdfUri ;
    const Cpath = `Files/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
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
    
    const SaveData = (downloadPDFURL) =>{
         firebase.firestore()
        .collection("Files")
        .doc(firebase.auth().currentUser.uid)
        .collection("UsersFiles")
        .doc(`${props.currentUser.publication}${firebase.auth().currentUser.uid}`)
        .set({
            downloadPDFURL ,
            creation : firebase.firestore.FieldValue.serverTimestamp()  ,

        })
        .then(( function () {
          firebase.firestore()
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            publication : firebase.firestore.FieldValue.increment(1)
          });
          props.navigation.navigate('Feed') 
        }))
    }
  }
 

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress = {()=> pickDocument()}
          >
          <Text style={styles.btntext}>Pick Pdf</Text>
        </TouchableOpacity>
        {PdfUri ?<PDFReader
        source = {PDF}
        />: <View/>}
        <TouchableOpacity
          style={styles.button2}
          onPress ={()=> Uplaod()}
          >
          <Text style={styles.btntext2}>Share</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1 ,
    backgroundColor:'#FAB30F',
},
button:{
  backgroundColor:'#212121',
  padding:'3%',
  borderRadius:40,
  margin:'3%',
  alignSelf:'center',
},
button2:{
  padding:'2%',
  borderRadius:40,
  margin:'3%',
  marginLeft:'20%',
  marginRight:'20%',
  borderWidth:2,
  borderColor:'#212121',
},
btntext:{
  textAlign:'center',
  color:'white',
  fontSize:16,
  fontWeight:'bold',
},
btntext2:{
  textAlign:'center',
  color:'black',
  fontSize:20,
  fontWeight:'bold',
},
});
const mapStateToProps = (store) => ({
  currentUser : store.userState.currentUser,
})
export default connect(mapStateToProps , null)(Pdff)