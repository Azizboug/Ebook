//import { StatusBar } from 'expo-status-bar';
import React , {Component}from 'react'
import {View , Text , ActivityIndicator, StyleSheet, Image} from 'react-native'

import firebase from 'firebase/app'



//import firebase from 'firebase' 
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './Component/Auth/Landing'
import RegisterScreen from './Component/Auth/Register'
import {Provider} from 'react-redux'
import {createStore , applyMiddleware} from 'redux'
import rootReducer from './Redux/Reducer'
import thunk from 'redux-thunk'
import MainScreen from './Component/Main'
import LoginScreen from './Component/Auth/Login'
import PostScreen from './Component/MAIN/Post'
import PdffScreen from './Component/MAIN/Pdf'
import SaveScreen from './Component/MAIN/Save'
import EditProfScreen from './Component/MAIN/EditProfile/EditProf'
import ChangePicScreen from './Component/MAIN/EditProfile/ChangePic'
import SavePicScreen from './Component/MAIN/EditProfile/SavePic'
import ChangePasswordScreen from './Component/MAIN/EditProfile/ChangePassword'
import ChangeEmailScreen from './Component/MAIN/EditProfile/ChangeEmail'
import DetailsScreen from './Component/MAIN/Details'
export const store = createStore(rootReducer , applyMiddleware(thunk) ) ;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyDWEFcrTuuiExgUrCpVQh590nT4CN9E_kw",
  authDomain: "my-app-6cf83.firebaseapp.com",
  projectId: "my-app-6cf83",
  storageBucket: "my-app-6cf83.appspot.com",
  messagingSenderId: "462283492156",
  appId: "1:462283492156:web:3601e990d3d3dc80d96c39",
  measurementId: "G-HTP1VY9ZQS"
};*/
/*// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBceXobwjdpbHi1oo7rza1gmmZQCUD9vNM",
  authDomain: "tomorrowapp-ceebd.firebaseapp.com",
  projectId: "tomorrowapp-ceebd",
  storageBucket: "tomorrowapp-ceebd.appspot.com",
  messagingSenderId: "377334043088",
  appId: "1:377334043088:web:e32d87e03ec0a5ab4569d5",
  measurementId: "G-J5H86ZDVWV"
};
*/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWEFcrTuuiExgUrCpVQh590nT4CN9E_kw",
  authDomain: "my-app-6cf83.firebaseapp.com",
  projectId: "my-app-6cf83",
  storageBucket: "my-app-6cf83.appspot.com",
  messagingSenderId: "462283492156",
  appId: "1:462283492156:web:3601e990d3d3dc80d96c39",
  measurementId: "G-HTP1VY9ZQS"
};

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
firebase.firestore();
}


const Stack = createStackNavigator() ;

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false ,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded:true ,
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded:true ,
        })
      }
    })
  }
  render() {
    const  {loaded , loggedIn } = this.state;
    if(!loaded){
      return(
        <View style = {styles.container}>
          <View style={styles.image}>
            <Image  
              source={require('./Component/Photos/loading.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text}>LOADING...</Text>
            <ActivityIndicator size="50%" color="black" style={styles.rotate} />
          </View>
        </View>
      )
      }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing" >
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown : false}}/>
            <Stack.Screen name = "Register" component = {RegisterScreen} />
            <Stack.Screen name = "Login" component = {LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {MainScreen} options = {{headerShown : false}}/>
            <Stack.Screen name = "Post" component = {PostScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Save" component = {SaveScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Pdf" component = {PdffScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "EditProf" component = {EditProfScreen} navigation = {this.props.navigation}  options = {{title:'Edit profile'}}/>
            <Stack.Screen name = "ChangePassword" component = {ChangePasswordScreen} navigation = {this.props.navigation} options = {{title:'Change password'}}/>
            <Stack.Screen name = "ChangeEmail" component = {ChangeEmailScreen} navigation = {this.props.navigation} options = {{title:'Change Email'}}/>
            <Stack.Screen name = "ChangePic" component = {ChangePicScreen} navigation = {this.props.navigation} options = {{title:'Change Image'}}/>
            <Stack.Screen name = "SavePic" component = {SavePicScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Details" component = {DetailsScreen} navigation = {this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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
    marginTop:'10%',
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:'15%',
  },
  img:{
    height:'95%',
    width:'95%',
    flex:1,
    resizeMode:'contain',
  },
  bottom:{
    flex:1,
    alignItems:'center',
  },
  text:{
    textAlign:'center',
    fontSize:36,
    color:'white',
    fontWeight:'bold',
  },
  rotate:{
    margin:'10%',
    height:'50%',
    width:'50%',
    resizeMode:'contain',
  },
});
export default App

