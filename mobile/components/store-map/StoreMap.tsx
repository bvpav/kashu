import { useEffect, useRef, useState } from "react";
import { RNLeaflet } from "../leaflet/Leaflet";
import { RNLeafletRef } from "../leaflet/types";
import { useQuery } from "@tanstack/react-query";
import { MapResponse } from "./types";
import { View } from "react-native";

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

  useEffect(() => {
    if (leafletRef.current && map) {
      leafletRef.current.flyTo({
        latLng: map.leaflet_data.start_position,
        zoom: 15,
      });
      setHasFlownToStart(true);
    }
  }, [leafletRef, map, hasFlownToStart]);

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
          {
            latLng: [0, 3],
          },
        ]}
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

const path = [
  {
    is_collectable: false,
    x: 0,
    y: 6,
  },
  {
    is_collectable: false,
    x: 1,
    y: 5,
  },
  {
    is_collectable: false,
    x: 2,
    y: 4,
  },
  {
    is_collectable: true,
    x: 3,
    y: 4,
  },
  {
    is_collectable: false,
    x: 4,
    y: 5,
  },
  {
    is_collectable: false,
    x: 5,
    y: 6,
  },
  {
    is_collectable: false,
    x: 6,
    y: 7,
  },
  {
    is_collectable: false,
    x: 7,
    y: 7,
  },
  {
    is_collectable: false,
    x: 8,
    y: 7,
  },
  {
    is_collectable: false,
    x: 9,
    y: 7,
  },
  {
    is_collectable: false,
    x: 10,
    y: 7,
  },
  {
    is_collectable: false,
    x: 11,
    y: 7,
  },
  {
    is_collectable: false,
    x: 12,
    y: 7,
  },
  {
    is_collectable: false,
    x: 13,
    y: 8,
  },
  {
    is_collectable: false,
    x: 14,
    y: 9,
  },
  {
    is_collectable: false,
    x: 15,
    y: 10,
  },
  {
    is_collectable: false,
    x: 16,
    y: 10,
  },
  {
    is_collectable: false,
    x: 17,
    y: 10,
  },
  {
    is_collectable: false,
    x: 18,
    y: 10,
  },
  {
    is_collectable: false,
    x: 19,
    y: 10,
  },
  {
    is_collectable: false,
    x: 20,
    y: 10,
  },
  {
    is_collectable: false,
    x: 21,
    y: 10,
  },
  {
    is_collectable: false,
    x: 22,
    y: 11,
  },
  {
    is_collectable: false,
    x: 21,
    y: 10,
  },
  {
    is_collectable: false,
    x: 20,
    y: 10,
  },
  {
    is_collectable: false,
    x: 19,
    y: 10,
  },
  {
    is_collectable: false,
    x: 18,
    y: 10,
  },
  {
    is_collectable: false,
    x: 17,
    y: 10,
  },
  {
    is_collectable: false,
    x: 16,
    y: 10,
  },
  {
    is_collectable: false,
    x: 15,
    y: 10,
  },
  {
    is_collectable: false,
    x: 14,
    y: 11,
  },
  {
    is_collectable: false,
    x: 13,
    y: 12,
  },
  {
    is_collectable: false,
    x: 12,
    y: 13,
  },
  {
    is_collectable: false,
    x: 11,
    y: 14,
  },
  {
    is_collectable: false,
    x: 10,
    y: 15,
  },
  {
    is_collectable: false,
    x: 9,
    y: 15,
  },
  {
    is_collectable: false,
    x: 8,
    y: 16,
  },
  {
    is_collectable: false,
    x: 7,
    y: 17,
  },
  {
    is_collectable: false,
    x: 6,
    y: 17,
  },
  {
    is_collectable: false,
    x: 5,
    y: 17,
  },
  {
    is_collectable: false,
    x: 4,
    y: 17,
  },
  {
    is_collectable: false,
    x: 3,
    y: 17,
  },
  {
    is_collectable: false,
    x: 2,
    y: 17,
  },
  {
    is_collectable: false,
    x: 1,
    y: 17,
  },
  {
    is_collectable: false,
    x: 0,
    y: 17,
  },
];
