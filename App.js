import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
let [selectedImage, setSelectedImage] = React.useState(null);

let openImagePickerAsync = async () => {
let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

if (permissionResult.granted === false) {
alert('Permission to access camera roll is required!');
return;
}

let pickerResult = await ImagePicker.launchImageLibraryAsync();

if (pickerResult.cancelled === true) {
return;
}

setSelectedImage({ localUri: pickerResult.uri });
};

if (selectedImage !== null) {
return (
<View style={styles.container}>
<Image
source={{ uri: selectedImage.localUri }}
style={styles.thumbnail}
/>
</View>
);
}

return (
<View style={styles.container}>
<Text style={styles.title}>Photo Share</Text>
<Text style={styles.instructions}>画像をアップロードしてみんなと共有しよう</Text>

<TouchableOpacity
onPress={openImagePickerAsync}
style={styles.button}>
<Text style={styles.buttonText}>画像を選択</Text>
</TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
title: {
color: '#9370DB',
fontSize: 50,
},
instructions: {
color: '#888',
fontSize: 18,
marginHorizontal: 15,
margin: 10,
},
button: {
backgroundColor: "#9370DB",
padding: 20,
margin: 20,
borderRadius: 5,
},
buttonText: {
fontSize: 20,
color: '#fff',
},
thumbnail: {
width: 300,
height: 300,
resizeMode: "contain"
}
});
