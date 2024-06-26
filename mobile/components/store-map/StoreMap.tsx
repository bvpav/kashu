import { useRef } from "react";
import { RNLeaflet } from "../leaflet/Leaflet";
import { RNLeafletRef } from "../leaflet/types";
import { useQuery } from "@tanstack/react-query";
import { MapResponse } from "./types";
import { View } from "react-native";

export default function StoreMap() {
  const leafletRef = useRef<RNLeafletRef>(null);
  const { data: map } = useQuery({
    queryKey: ["map"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/map`,
      );
      return response.json() as Promise<MapResponse>;
    },
  });

  if (!map) {
    return null;
  }

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
        bounds={map.leaflet_data.bounds}
        markers={[
          {
            latLng: map.leaflet_data.start_position,
            title: "Start",
          },
          {
            latLng: map.leaflet_data.end_position,
            title: "End",
          },
          // (1, 2)
          {
            latLng: [2, 1],
          },
        ]}
      />
    </View>
  );
}
