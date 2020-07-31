import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk"
import * as Font from "expo-font";
import { AppLoading } from "expo";

import PlaceNavigator from "./Navigation/PlacesNavigator";
import placesReducer from "./store/places-reducers";
import { init } from "./database/db";
import { useState } from "react";

init().then(() => { 
  console.log("database initialized...");
}).catch(err => {
  console.log("database initialization failed");
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function fetchFonts() {
  return Font.loadAsync({
    "rajdhani-bold": require("./assets/Fonts/Rajdhani-Bold.ttf"),
    "rajdhani-light": require("./assets/Fonts/Rajdhani-Light.ttf"),
    "rajdhani-medium": require("./assets/Fonts/Rajdhani-Medium.ttf"),
    "rajdhani-regular": require("./assets/Fonts/Rajdhani-Regular.ttf"),
    "rajdhani-semibold": require("./assets/Fonts/Rajdhani-SemiBold.ttf")
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlaceNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
