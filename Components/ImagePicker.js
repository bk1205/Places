import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (response.status !== "granted") {
      Alert.alert("Sorry!", "We need Camera permissions to make this work!");
      return false;
    }
    return true;
  };

  const imagePickerHandler = async () => {
    const permissionResult = await verifyPermissions();
    if (!permissionResult) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? <Text style={{fontFamily: "rajdhani-medium",}} >No Image Selected yet</Text>
        : <Image style={styles.image} source={{ uri: pickedImage }} />}
      </View>
      <Button title="Take Picture" onPress={imagePickerHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
