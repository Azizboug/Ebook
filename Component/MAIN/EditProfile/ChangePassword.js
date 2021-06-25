import React, { useState } from 'react'
import { View ,Image ,Button ,StyleSheet , Text , TextInput , TouchableOpacity , Alert} from 'react-native'
import * as firebase from 'firebase';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPassword: "",
          newPassword: "",
        };
      }
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }
    
      // Changes user's password...
      onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(this.state.newPassword).then(() => {
            Alert.alert("Password was changed");
          }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
      }
      render(){ 
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <TextInput
                style={styles.input}
                placeholder = "Current password"
                onChangeText={(text) => { this.setState({currentPassword: text}) }}
                autoCapitalize="none" secureTextEntry={true}
                />
                <TextInput
                style={styles.input}
                placeholder = "New password"
                onChangeText={(text) => { this.setState({newPassword: text}) }}
                autoCapitalize="none" secureTextEntry={true}
                />
                <TouchableOpacity  
                    style={styles.button}
                    onPress={this.onChangePasswordPress}>
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

export default ChangePassword;