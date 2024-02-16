import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  LatLng,
  Marker,
  Polyline,
} from "react-native-maps";
import { IconBox } from "../IconBox";
import { Car, FlagCheckered } from "phosphor-react-native";
import { useRef } from "react";
import { useTheme } from "styled-components/native";

type MapProps = MapViewProps & {
  coordinates: LatLng[];
};

export const Map = ({ coordinates, ...rest }: MapProps) => {
  const { COLORS } = useTheme();
  const mapRef = useRef<MapView>(null);
  const lastCoordinate = coordinates[coordinates.length - 1];

  const onMapLoaded = () => {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  };

  return (
    <MapView
      ref={mapRef}
      onMapLoaded={onMapLoaded}
      provider={PROVIDER_GOOGLE}
      style={{
        width: "100%",
        height: 200,
      }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="small" icon={Car} />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="small" icon={FlagCheckered} />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  );
};
