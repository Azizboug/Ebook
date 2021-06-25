import React, { useState } from 'react'
import { View ,Image ,Button ,StyleSheet , Text , TextInput , TouchableOpacity , Alert} from 'react-native'
import * as firebase from 'firebase';
import 'firebase/auth'
class ChangeEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPassword: "",
          newEmail: "",
        };
      }
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }
    
      onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updateEmail(this.state.newEmail).then(() => {
            Alert.alert("Email was changed");
          }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
      }
      render(){ 
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <TextInput
                style={styles.input}
                placeholder = "New Email"
                keyboardType="email-address"
                onChangeText={(text) => { this.setState({newEmail: text}) }}
                autoCapitalize="none" 
                />
                <TextInput
                style={styles.input}
                placeholder = "Retype Current Password"
                onChangeText={(text) => { this.setState({currentPassword: text}) }}
                autoCapitalize="none" secureTextEntry={true}
                />
                <TouchableOpacity  
                    style={styles.button}
                    onPress={this.onChangeEmailPress}>
                    <Text style={styles.text}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );}
}
const styles = StyleSheet.create({
    container:{
        flex : 1 ,
        backgroundColor:'#FAB30F',
    },
    body:{
        margin:'10%',
    },
    input:{
        borderRadius:40,
        marginBottom:'10%',
        padding:'3%',
        borderWidth:1,
    },
    button:{
        padding:'3%',
        backgroundColor:'#212121',
        borderRadius:40,
        marginLeft:'25%',
        marginRight:'25%',
    },
    text:{
        textAlign:'center',
        fontSize:24,
        color:'white',
        fontWeight:'bold',
    },

});

export default ChangeEmail;