import React, { useEffect } from "react";
import {
  ScrollView,
  FlatList,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";

import PlaceItem from "../Components/PlaceItem";
import { useSelector, useDispatch } from "react-redux";
import { setPlaces } from "../store/places-actions";

function PlacesPage(props) {
  const availablePlaces = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);

  props.navigation.setOptions({
    headerRight: () => (
      <Icon
        name="plus-circle"
        type="feather"
        size={30}
        color="#fff"
        onPress={() => props.navigation.navigate("Add Place")}
      />
    ),
  });
  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.screen}>
        {availablePlaces.length === 0 ? (
          <View style={styles.altTextScreen}>
          <Text style={styles.textAlt}>
            No Places to show, try adding some...
          </Text></View>
        ) : (
          <FlatList
            data={availablePlaces}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <PlaceItem
                onTouch={() =>
                  props.navigation.navigate("Details", {
                    placeTitle: itemData.item.title,
                    placeId: itemData.item.id,
                  })
                }
                title={itemData.item.title}
                address={itemData.item.address}
                img={itemData.item.imagePath}
              />
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 80
  },
  textAlt: {
    fontSize: 20,
    color: "#024249",
    fontFamily: "rajdhani-semibold",
  },
  altTextScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlacesPage;
