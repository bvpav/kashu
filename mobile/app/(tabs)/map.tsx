import { useRef } from "react";
import { Button, View } from "react-native";
import { RNLeaflet } from "@/components/leaflet/Leaflet";
import type { RNLeafletRef } from "@/components/leaflet/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  const leafletRef = useRef<RNLeafletRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <RNLeaflet
        ref={leafletRef}
        mapLayers={[
          {
            name: "mapoverview",
            src: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            tileOptions: {
              attribution: "hello! this is the attribution",
            },
          },
        ]}
        markers={[
          {
            latLng: [0, 0, -20],
            disabled: false,
            title: "test",
            icon: "https://link-to-image.com/image/4389219412.png",
          },
        ]}
      />

      <Button
        onPress={() =>
          leafletRef.current?.flyTo({ latLng: [0, 0, -20], zoom: 5 })
        }
        title="flyto"
      />

      <Button
        onPress={() => leafletRef.current?.clearMarkers()}
        title="clear markers"
      />
    </View>
  );
}
