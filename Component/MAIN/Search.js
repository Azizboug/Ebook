import React , {useState} from 'react'
import { View , Text, TextInput ,FlatList, TouchableOpacity , StyleSheet , Image } from 'react-native'
import firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
require ('firebase/firestore')
export default function Search(props) {
    const [users , setUsers] = useState([])
    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('Users')
        .where('name', '>=' , search)
        .get ()
        .then((snapshot) =>{
            let users = snapshot.docs.map(doc  =>{
                const data = doc.data()
                const id = doc.id 
                return { id , ...data }
         })
         setUsers (users);
        })
    }
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder = 'Search..' 
                onChangeText ={(search) => fetchUsers(search)} 
                style = {styles.input}
            />
            <FlatList 
                numColumns = {1}
                horizontal ={false}
                data = {users}
                renderItem = {({item}) =>(
                    <TouchableOpacity
                    onPress ={()=> props.navigation.navigate("Profile" ,{uid : item.id})}>
                    <LinearGradient
                        colors={['#ab7c18', '#FAB30F']}
                        style={styles.user}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}>
                    <Image source = {{ uri : item.downloadURL}} style={styles.image} />
                    <View style={styles.text}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.name}>Books: {item.publication}</Text>
                    </View>
                    </LinearGradient>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex : 1 ,
        backgroundColor:'#FAB30F',
        paddingLeft:'10%',
        paddingRight:'10%',
    },
    input:{
        fontSize:16,
        borderWidth:1,
        borderRadius:40,
        marginTop:'20%',
        padding:'2%',
        textAlign:'center',
    },
    user:{
        flexDirection:'row',
        margin:'3%',
        padding:'2%',
        borderRadius:40,
    },
    image:{
        height:50,
        width:50,
        borderRadius:25,
        alignSelf:'center',
        
    },
    text:{
        flexDirection:'column',
        marginLeft:'5%',
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
    },
})