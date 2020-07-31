import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../Components/MapPreview";

function PlaceDetails(props) {
  const placeId = props.route.params?.placeId;
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };
  props.navigation.setOptions({
    headerTitle: props.route.params?.placeTitle,
  });


  const mapScreenHandler = () => {
    props.navigation.navigate("Map", {readOnly: true, placeLocation: selectedLocation})
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: selectedPlace.imagePath }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>

        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={mapScreenHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    textAlign: "center",
    fontFamily: "rajdhani-semibold"
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetails;
