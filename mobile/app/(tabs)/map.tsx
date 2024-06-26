import { useRef } from "react";
import { Button, View } from "react-native";
import { RNLeaflet } from "@/components/leaflet/Leaflet";
import type { RNLeafletRef } from "@/components/leaflet/types";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreMap from "@/components/store-map/StoreMap";

export default function Map() {
  return <StoreMap />;
}
