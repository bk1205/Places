import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

function PlaceItem(props) {
  return (
    <TouchableNativeFeedback onPress={props.onTouch}>
      <View style={styles.placeItem}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: props.img }}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.address}>
            <Text style={{ color: "#1b1b2f" }}>Address:</Text> {props.address}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    backgroundColor: "#CCFF0000",
    margin: 2,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  detailsContainer: {
    marginLeft: 10,
    width: 250,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 22,
    color: "#4cd3c2",
    textAlign: "center",
  },
  address: {
    fontSize: 16,
    color: "#e4e4e4",
  },
});

export default PlaceItem;
