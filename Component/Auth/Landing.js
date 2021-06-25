import React from 'react'
import { StyleSheet,View, Button, Image, Text, TouchableOpacity} from 'react-native'

export default function Landing({navigation}) {
    return (
        <View style = {styles.container}>
            <View style = {styles.image}>
                <Image
                    source={require('../Photos/landing.png')}
                    style={styles.img}
                />
            </View>
            <View style = {styles.bottom}>
                <Text style={styles.text}>Welcome User!</Text>
                <TouchableOpacity 
                    style={styles.register}
                    onPress = {() => navigation.navigate("Register")}
                    >
                        <Text style={[styles.regtext,{color:'white'}]}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.login}
                    onPress = {() => navigation.navigate("Login")}
                    >
                        <Text style={[styles.regtext,{color:'#212121'}]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
        flex:1,
        resizeMode:'contain',

    },
    bottom:{
        flex:1,
    },
    text:{
        fontSize:36,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    },
    register:{
        padding:'3%',
        backgroundColor:'#212121',
        borderRadius:40,
        marginLeft:'20%',
        marginRight:'20%',
        marginTop:'20%',
    },
    regtext:{
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
    },
    login:{
        padding:'3%',
        borderRadius:40,
        marginLeft:'20%',
        marginRight:'20%',
        marginTop:'5%',
        borderWidth:3,
        borderColor:'#212121',
    }
});
