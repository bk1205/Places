import { ADD_PLACE, FETCH_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };

    case FETCH_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lon
            )
        ),
      };
    default:
      return state;
  }
};
