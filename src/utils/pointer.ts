import { Map, MapMouseEvent } from "maplibre-gl";

const ALLOW_LAYERS = [
  "wtt_male_2025",
  "wtt_female_2025",
  "wtt_male_2024",
  "wtt_female_2024",
  "wtt_male_2023",
  "wtt_female_2023",
];

export const setupPointerHandler = (map: Map) => {
  map.on("mousemove", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });
    if (features.length > 0) {
      map.getCanvas().style.cursor = "pointer";
    } else {
      map.getCanvas().style.cursor = "";
    }
  });
};
