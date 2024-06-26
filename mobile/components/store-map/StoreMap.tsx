import { useEffect, useRef, useState } from "react";
import { RNLeaflet } from "../leaflet/Leaflet";
import { RNLeafletRef } from "../leaflet/types";
import { useQuery } from "@tanstack/react-query";
import { MapResponse } from "./types";
import { View } from "react-native";
import useStorePath from "@/hooks/useStorePath";

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
    </View>
  );
}
