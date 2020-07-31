import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

import PlacesPage from "../Screens/PlacesScreen";
import PlaceDetails from "../Screens/PlaceDetailsScreen";
import AddPlace from "../Screens/AddPlaceScreen";
import MapScreen from "../Screens/MapScreen";

const Stack = createStackNavigator();

const defaultNavigationOptions = {
  headerRightContainerStyle: { padding: 10 },
  headerTransparent: true,
  headerTitleContainerStyle: { alignItems: "center", width: "90%" },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "rajdhani-bold",
    fontSize: 25,
  },
};

function PlaceNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Places"
        component={PlacesPage}
        options={defaultNavigationOptions}
      />
      <Stack.Screen
        name="Details"
        component={PlaceDetails}
        options={{
          headerTintColor: "#3797a4",
          headerTitleContainerStyle: { marginLeft: -20 },
          headerBackground: () => (
            <LinearGradient
              colors={["#6DD5FA", "#FFFFFF"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTitleStyle: {
            fontFamily: "rajdhani-bold",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Add Place"
        component={AddPlace}
        options={{
          headerBackground: () => (
            <LinearGradient
              colors={["#a13388", "#10356c"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "rajdhani-bold",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTintColor: "#fff",
          headerBackground: () => (
            <LinearGradient
              colors={["#FC5C7D", "#6A82FB"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTitleStyle: {
            fontFamily: "rajdhani-bold",
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default PlaceNavigator;
