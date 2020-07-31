import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";

import CustomHeaderButton from "../Components/HeaderButton";

function MapScreen(props) {
  const initialLocation = props.route.params?.placeLocation;
  const readOnly = props.route.params?.readOnly;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 25.0085,
    longitude: initialLocation ? initialLocation.lng : 72.2625,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };
  const saveLocationHandler = () => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("Add Place", {
      selectedLocation: selectedLocation,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  if (!readOnly) {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="save"
            iconName="save"
            color="#3E5151"
            onPress={saveLocationHandler}
          />
        </HeaderButtons>
      ),
    });
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Selected Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerBtn: {
    marginHorizontal: 10,
  },
});

export default MapScreen;
