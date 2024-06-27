export interface MapResponse {
  dimensions: Dimensions;
  leaflet_data: LeafletData;
  map: string[][];
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface LeafletData {
  bounds: [[number, number], [number, number]];
  end_position: [number, number];
  start_position: [number, number];
}
