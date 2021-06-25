import React, { useState, useEffect } from 'react';
import { StyleSheet , Text, View, Button , Image , TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import  * as ImagePicker from 'expo-image-picker';
//import { Button } from 'react-native-paper';

  export default function Post({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture  = async() => {
     if (camera){
       const data = await camera.takePictureAsync(null) ;
       setImage (data.uri) ;
       const i = data.uri ;
       navigation.navigate('Save' ,{i} ) 
     }
  }
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const i = result.uri ;
      navigation.navigate('Save' ,{i} ) 
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return<Text> No access to camera </Text> ;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.CameraContainer}>
           <Camera style={styles.camera} type={type} ratio= {'4:3'} ref = { ref=>setCamera(ref)}/>   
      </View>
      <View style={styles.space}></View>
      <View style={styles.bottom}>
          <TouchableOpacity 
            style={styles.button}
            onPress = {() => pickImage() }>
            <Image 
              source={require('../Photos/galery.png')} 
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress = {() => takePicture() }>
            <Image 
              source={require('../Photos/cam.png')} 
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Image 
              source={require('../Photos/rotate.png')} 
              style={styles.image}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection:'column',
    backgroundColor:'#FAB30F',
  },
  camera : {
    flex : 1 ,
    aspectRatio : 1,
  },
  CameraContainer :{
    flex : 4,
    flexDirection : 'column',
    alignItems:'center',
  },
  bottom:{
    flex : 1,
    flexDirection:'row',
  },
  button:{
    flex:1,
    justifyContent:'center',
  },
  image:{
    alignSelf:'center',    
  },
});