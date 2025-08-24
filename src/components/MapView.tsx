import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { onMapLoad } from "../utils/onMapLoad";
import { LayerSwitcher } from "./LayerSwitcher";

const LAYERS = [
  { id: "wtt_male_2025", label: "WTT(male/2025)" },
  { id: "wtt_female_2025", label: "WTT(female/2025)" },
  { id: "wtt_male_2024", label: "WTT(male/2024)" },
  { id: "wtt_female_2024", label: "WTT(female/2024)" },
  { id: "wtt_male_2023", label: "WTT(male/2023)" },
  { id: "wtt_female_2023", label: "WTT(female/2023)" },
];

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState("wtt_male_2025");

  useEffect(() => {
    if (!mapRef.current) return;
    LAYERS.forEach((layer) => {
      try {
        if (mapRef.current!.getLayer(layer.id)) {
          mapRef.current!.setLayoutProperty(
            layer.id,
            "visibility",
            layer.id === activeLayer ? "visible" : "none"
          );
        }
      } catch (e) {}
    });
  }, [activeLayer]);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [139, 36],
      zoom: 1,
      minZoom: 0,
      pitch: 0,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      onMapLoad(map);
      LAYERS.forEach((layer) => {
        if (map.getLayer(layer.id)) {
          map.setLayoutProperty(
            layer.id,
            "visibility",
            layer.id === activeLayer ? "visible" : "none"
          );
        }
      });
    });

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <LayerSwitcher
        layers={LAYERS}
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
      />
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
