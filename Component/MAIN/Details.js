import React , { useState , useEffect}from 'react'
import { View , StyleSheet} from 'react-native'
import firebase from 'firebase'
import {connect} from 'react-redux'
import PDFReader from 'rn-pdf-reader-js'
require ('firebase/firestore')
function Details(props) {
    const [pdf , setPdf] = useState (null)

    //console.log(props)
    
    //const pdf = {uri : props.feedP[props.route.params.i].downloadPDFURL}
    useEffect (() =>{
    firebase.firestore()
    .collection('Files')
    .doc(props.route.params.j)
    .collection('UsersFiles')
    .doc(props.route.params.i)
    .get()
    .then((snapshot) => {
        console.log(snapshot);
        
        setPdf( {uri : snapshot._delegate._document.data.value.mapValue.fields.downloadPDFURL.stringValue}  ) 
    })
    //console.log(pdf)
    },[props.route.params.j , props.route.params.i])
    //console.log(pdff)
    return (
        <View style = {styles.constainer}>
            {pdf && <PDFReader source = {pdf} />}
        </View>
    )
}

const styles = StyleSheet.create({
    constainer :{
        flex : 1 
    }
})
const mapStateToProps = (store) => ({
    feedP : store.usersState.feedP
})
export default connect(mapStateToProps , null)(Details);