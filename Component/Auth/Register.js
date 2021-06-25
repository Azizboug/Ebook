import React, { Component } from 'react'
import {View , Button , TextInput, Image, StyleSheet, TouchableOpacity, Text} from 'react-native' 
import firebase from 'firebase/app'
import "firebase/firestore"
//import {fetchUser} from '../../'
export class Register extends Component {
    constructor (props){
        super(props);

        this.state = {
            email: '' ,
            password: '',
            name: '' ,
            downloadURL : 'https://firebasestorage.googleapis.com/v0/b/tomorrowapp-ceebd.appspot.com/o/Posts%2F8FFZLMVtzbPqEcMyrN66OnywmFu2%2F0.u0mtec4njk?alt=media&token=60692882-d1a7-47d2-9e52-a23d330e5518',
            publication : 0
        }
        
        this.onSignUp = this.onSignUp.bind(this) 
    }
    onSignUp (){
         const { email , password , name , downloadURL , publication } = this.state ;
         firebase.auth().createUserWithEmailAndPassword( email ,password)
               .then((result) => {
                firebase.firestore()
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                    password,
                    downloadURL ,
                    publication ,
                })
                console.log(result)
               }).catch((error) => {
                   console.log(error)
               })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={require('../Photos/register.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.bottom}>
                    <TextInput
                        style={styles.textinput}
                        placeholder = "name"
                        onChangeText = {(name) => this.setState({name})} 
                    />
                    <TextInput
                        style={styles.textinput}
                        placeholder = "email"
                        onChangeText = {(email) => this.setState({email})} 
                    />
                    <TextInput
                        style={styles.textinput}
                        placeholder = "password"
                        secureTextEntry = {true} 
                        onChangeText = {(password) => this.setState({password})} 
                    />
                    <TouchableOpacity 
                    style={styles.button}
                    onPress = {()=> this.onSignUp()}
                    >
                    <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#FAB30F',
   },
   image:{
    flex:1,
    marginTop:'1%',
    justifyContent:'flex-start',
    alignItems:'center',
   },
   img:{
    height:'95%',
    width:'95%',
    flex:1,
    resizeMode:'contain',
   },
   bottom:{
    flex:2,
   },
   textinput:{
    padding:'3%',
    borderBottomWidth:1,
    borderColor:'#212121',
    marginTop:'5%',
    marginLeft:'5%',
    marginRight:'5%',
    textAlign:'center',
    fontSize:16,
   },
   button:{
    padding:'3%',
    backgroundColor:'#212121',
    borderRadius:40,
    marginLeft:'20%',
    marginRight:'20%',
    marginTop:'10%',
},
text:{
    textAlign:'center',
    fontSize:24,
    color:'white',
    fontWeight:'bold',
},
});

export default Register;
