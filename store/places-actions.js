import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../database/db";
import ENV from "../env"

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {

    const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations/${location.lat},${location.lng}?key=${ENV.bingAPIKey}`)
    if(!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    // console.log(resData);
    const addressObj = resData.resourceSets[0].resources[0].address;
    // console.log(addressObj);
    const {addressLine, locality, adminDistrict2, adminDistrict, postalCode} = addressObj;
    const address = addressLine.concat(" ", locality, " ", adminDistrict2, " ", adminDistrict, " ", postalCode);
    // console.log(address);
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const fetchedData = await fetchPlaces();
      // console.log(fetchedData);
      dispatch({
        type: FETCH_PLACES,
        places: fetchedData.rows._array
      });
    } catch (error) {
      throw error;
    }
  };
};
