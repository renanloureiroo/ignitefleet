import {
  Accuracy,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  hasStartedLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import {
  clearLocationStorage,
  saveLocationStorage,
} from "../libs/asyncStorage/locationStorage";

export const BACKGROUND_TASK_NAME = "location-tracking";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    if (!data) return;

    const { coords, timestamp } = data.locations[0];

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    };

    console.log(currentLocation);

    await saveLocationStorage(currentLocation);
  } catch (error) {
    console.error(error);
    stopLocationTrackingTask();
  }
});

export async function startLocationTrackingTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasStarted) {
      await stopLocationTrackingTask();
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      distanceInterval: 1,
      accuracy: Accuracy.Highest,
      timeInterval: 1000,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function stopLocationTrackingTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );
    if (!hasStarted) return;
    await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
    await clearLocationStorage();
  } catch (error) {
    console.error(error);
  }
}
