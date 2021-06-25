import React, { Component } from 'react'
import {connect } from 'react-redux' 
import {bindActionCreators} from 'redux'
import {fetchUser , fetchPostUser , fetchFollowingUser , fetchPdfUser} from '../Redux/Actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './MAIN/Feed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileScreen from './MAIN/Profile'
import SearchScreen from './MAIN/Search'
import firebase from 'firebase'

const Tab = createMaterialBottomTabNavigator();
export const EmptyScreen = () =>{
    return (null)
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser() ;
        this.props.fetchPostUser() ;
        this.props.fetchPdfUser() ;
        this.props.fetchFollowingUser() ;
    }
    render() {
        return (
            <Tab.Navigator initialRouteName = 'Feed' labeled = {false} >
                 <Tab.Screen name="Feed" component={FeedScreen} 
                 options={{
                     tabBarIcon : ({color , size}) => (
                         <MaterialCommunityIcons name =  'home' color = {color} size = {26} />
                     ),
                 }} labeled = {false}/>
                 <Tab.Screen name="Search" component={SearchScreen}  navigation = {this.props.navigation}
                 options={{
                     tabBarIcon : ({color , size}) => (
                         <MaterialCommunityIcons name =  'magnify' color = {color} size = {26} />
                     ),
                 }} labeled = {false}/>
                 <Tab.Screen name="APost" component={EmptyScreen}  
                 listeners = {({navigation }) => ({
                    tabPress : event => {
                        event.preventDefault();
                        navigation.navigate("Post")
                    }
                 })}
                 options={{
                     tabBarIcon : ({color , size}) => (
                         <MaterialCommunityIcons name =  'book-open-page-variant' color = {color} size = {26} />
                     ),
                 }}/>
                 <Tab.Screen name="Profile" component={ProfileScreen} 
                 listeners = {({navigation }) => ({
                    tabPress : event => {
                        event.preventDefault();
                        navigation.navigate("Profile" ,  { uid : firebase.auth().currentUser.uid })
                    }
                 })}
                 options={{
                     tabBarIcon : ({color , size}) => (
                         <MaterialCommunityIcons name =  'account-circle' color = {color} size = {26} />
                     ),
                 }}/>
            </Tab.Navigator>
        )
    }
}



const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser 
})


const mapDispatchToProps = (dispatch) => bindActionCreators( {fetchUser , fetchPostUser , fetchFollowingUser , fetchPdfUser} , dispatch) ;


export default connect(mapStateToProps , mapDispatchToProps )(Main);
