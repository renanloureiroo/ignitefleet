import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";

type GetAddressLocationParams = {
  latitude: number;
  longitude: number;
};

export const getAddressLocation = async (params: GetAddressLocationParams) => {
  try {
    const addressResponse = await reverseGeocodeAsync(params);
    return addressResponse[0]?.street;
  } catch (error) {
    console.log("Error getting address location", error);
    throw new Error("Error getting address location");
  }
};
