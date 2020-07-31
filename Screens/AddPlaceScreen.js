import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";

import { addPlace } from "../store/places-actions";
import ImgPicker from "../Components/ImagePicker";
import CustomHeaderButton from "../Components/HeaderButton";
import LocationPicker from "../Components/LocationPicker";

function AddPlace(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const inputChangeHandler = (text) => {
    setTitle(text);
  };

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    dispatch(addPlace(title, image, location));
    props.navigation.goBack();
  };

  const locationSelectedHandler = useCallback((loc) => {
    setLocation(loc)
  }, [])

  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="save" iconName="save" color="#fff" onPress={savePlaceHandler} />
      </HeaderButtons>
    ),
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Name of the Place"
          onChangeText={inputChangeHandler}
          value={title}
        />
        <ImgPicker onImageTaken={(imageUri) => setImage(imageUri)} />
        <LocationPicker onLocationSelected={locationSelectedHandler} navigation={props.navigation} route={props.route} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default AddPlace;
