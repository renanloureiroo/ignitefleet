import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@ignitefleet:location";

type Location = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export async function getLocationsStorage(): Promise<Location[]> {
  const storage = await AsyncStorage.getItem(STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : [];

  return response;
}

export const saveLocationStorage = async (location: Location) => {
  const storage = await getLocationsStorage();

  storage.push(location);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
};

export const clearLocationStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
