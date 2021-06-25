import React, { Component } from 'react'
import {View , TextInput, StyleSheet, Image, TouchableOpacity, Text} from 'react-native' 

import firebase from 'firebase'

export class Login extends Component {
    constructor (props){
        super(props);

        this.props = {
            email: '' ,
            password: ' '
        }
        
        this.onSignUp = this.onSignUp.bind(this)  
    }

    onSignUp (){
         const { email , password } = this.state ;
         firebase.auth().signInWithEmailAndPassword(email , password)
               .then((result) => {
                   console.log(result)
               })
               .catch((error) => {
                   console.log(error)
               })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={require('../Photos/login.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.bottom}>
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
                        <Text style={styles.text}>Sign In</Text>
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
        justifyContent:'flex-end',
        alignItems:'center',
    },
    img:{
        height:'95%',
        width:'95%',
        resizeMode:'contain',
    },
    bottom:{
        flex:1,
    },
    textinput:{
        padding:'3%',
        borderBottomWidth:1,
        borderColor:'#212121',
        marginTop:'10%',
        marginLeft:'3%',
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
export default Login
