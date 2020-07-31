import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.route.params?.selectedLocation;

  const {onLocationSelected} = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationSelected(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationSelected]);

  const verifyPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    if (response.status !== "granted") {
      Alert.alert("Sorry!", "We need Location permissions to make this work!");
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationSelected({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map!",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };
  const pickLocationHandler = () => {
    props.navigation.navigate("Map");
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickLocationHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{fontFamily: "rajdhani-medium",}} >No Location picked yet</Text>
        )}
      </MapPreview>
      <View style={styles.btnContainer}>
        <Button title="Get User Location" onPress={getLocationHandler} />
        <Button title="Pick on Map" onPress={pickLocationHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    marginTop: 20,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default LocationPicker;
