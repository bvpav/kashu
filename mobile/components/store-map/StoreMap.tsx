import { useEffect, useRef, useState } from "react";
import { RNLeaflet } from "../leaflet/Leaflet";
import { RNLeafletRef } from "../leaflet/types";
import { useQuery } from "@tanstack/react-query";
import { MapResponse } from "./types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import useStorePath from "@/hooks/useStorePath";

const PATH_OFFSET = 10;

export default function StoreMap() {
  const leafletRef = useRef<RNLeafletRef>(null);
  const [hasFlownToStart, setHasFlownToStart] = useState(false);
  const { data: map } = useQuery({
    queryKey: ["map"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/map`,
      );
      return response.json() as Promise<MapResponse>;
    },
  });
  const path = useStorePath();

  useEffect(() => {
    if (leafletRef.current && map) {
      leafletRef.current.flyTo({
        latLng: map.leaflet_data.start_position,
        zoom: 15,
      });
      setHasFlownToStart(true);
    }
  }, [leafletRef, map, hasFlownToStart]);

  if (!map || !path) {
    return null;
  }

  const handleRecenter = () => {
    if (leafletRef.current) {
      leafletRef.current.flyTo({
        latLng: [6, 0],
        zoom: 7,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNLeaflet
        ref={leafletRef}
        imageOverlays={[
          {
            src: `${process.env.EXPO_PUBLIC_API_URL}/api/map`,
            bounds: map.leaflet_data.bounds,
          },
        ]}
        // bounds={map.leaflet_data.bounds}
        bounds={[
          [
            map.leaflet_data.bounds[0][0] - PATH_OFFSET,
            map.leaflet_data.bounds[0][1] - PATH_OFFSET,
          ],
          [
            map.leaflet_data.bounds[1][0] + PATH_OFFSET,
            map.leaflet_data.bounds[1][1] + PATH_OFFSET,
          ],
        ]}
        markers={path
          .filter((point) => point.is_collectable)
          .map((point) => ({
            latLng: [point.y, point.x],
          }))}
        polyline={{
          pointList: path.map((point) => [point.y, point.x]),
          color: "#c100dd",
          weight: 13,
          opacity: 0.9,
          smoothFactor: 3,
        }}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleRecenter}>
        {/* TODO: add styling */}
        <Icon name="navigate-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#6200ee",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
