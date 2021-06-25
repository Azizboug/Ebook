import React from 'react'
import { View ,Image ,Button ,StyleSheet , Text , TextInput , TouchableOpacity} from 'react-native'
import * as firebase from 'firebase';
import { connect } from 'react-redux'
function EditProf(props,{navigation})  {
const currentUser = props.currentUser
console.log(props)

const user = props.currentUser.downloadURL 
    return (
        <View style={styles.container}>
                <Image source={{uri : user }} style={styles.image} />
                <Text style={styles.text}>{currentUser ? currentUser.name : "unknown"}</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => props.navigation.navigate('ChangePic')}
                    >
                    <Text style={styles.btntext}>Change Image</Text>
                    </TouchableOpacity>
                    <View style={styles.flexx}>
                        <Text style={styles.textinput}>
                            {currentUser ? currentUser.email : "unknown"}
                        </Text>
                        <TouchableOpacity
                        style={styles.passbutton}
                        onPress = {() => props.navigation.navigate('ChangeEmail')}
                        >
                        <Text style={styles.passtext}>Change Email</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                    style={styles.button}
                    onPress = {() => props.navigation.navigate('ChangePassword')}
                    >
                    <Text style={styles.btntext}>Change Password</Text>
                    </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex : 1 ,
        backgroundColor:'#FAB30F',
    },
    image:{
        marginTop:'5%',
        height:250,
        width:250,
        borderRadius:125,
        alignSelf:'center',
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        margin:'3%',
    },
    flexx:{
        flexDirection:'row',
        alignItems:'center',
        maxHeight:'100%',
        maxWidth:'70%',
    },
    textinput:{
        fontSize:18,
        margin:'5%',
        fontWeight:'bold',

    },
    button:{
        backgroundColor:'#212121',
        padding:'3%',
        borderRadius:40,
        marginTop:'5%',
        marginLeft:'20%',
        marginRight:'20%',
    },
    passbutton:{
        borderWidth:1,
        borderColor:'#212121',
        padding:'3%',
        borderRadius:40,
        marginTop:'5%',
        marginLeft:'20%',
        marginRight:'20%',
    },
    btntext:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    },
    passtext:{
        textAlign:'center',
        color:'#212121',
        fontSize:16,
        fontWeight:'bold',
    },
});
const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
})
export default connect(mapStateToProps , null)(EditProf);
