import { useState } from "react";

interface Layer {
  id: string;
  label: string;
}

interface LayerSwitcherProps {
  layers: Layer[];
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
}

export const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  layers,
  activeLayer,
  onLayerChange,
}) => {
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);

  const handleLayerSelect = (layerId: string) => {
    onLayerChange(layerId);
    setIsLayerPanelOpen(false);
  };

  const activeLayerLabel = layers.find(layer => layer.id === activeLayer)?.label || "";

  return (
    <>
      {/* レイヤ切り替えボタン（ダーク・シック・WTT風） */}
      <button
        onClick={() => setIsLayerPanelOpen(!isLayerPanelOpen)}
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 3,
          background: "linear-gradient(135deg, #23272f 80%, #3b3f4a 100%)",
          border: "2px solid #bfa14a",
          borderRadius: "8px",
          padding: "7px 12px",
          fontSize: "13px",
          fontWeight: 700,
          color: "#f5f5f5",
          cursor: "pointer",
          boxShadow: "0 3px 10px rgba(0,0,0,0.22)",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          letterSpacing: "0.03em",
          transition: "background 0.2s, border 0.2s"
        }}
      >
        レイヤ切替
        <span style={{ 
          transition: "transform 0.2s ease",
          transform: isLayerPanelOpen ? "rotate(180deg)" : "rotate(0deg)",
          marginLeft: 4,
          color: "#bfa14a",
          fontWeight: 700,
          fontSize: 13
        }}>
          ▼
        </span>
      </button>

      {/* 現在のレイヤー表示（ダーク系） */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 50,
          zIndex: 2,
          background: "rgba(30,32,38,0.96)",
          border: "1.5px solid #bfa14a",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "13px",
          color: "#f5f5f5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          maxWidth: "calc(100vw - 40px)",
          wordBreak: "break-word",
          fontWeight: 600,
          letterSpacing: "0.03em"
        }}
      >
        現在: {activeLayerLabel}
      </div>

      {/* レイヤ切り替えパネル（ダーク・WTT風） */}
      {isLayerPanelOpen && (
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 85,
            zIndex: 2,
            background: "linear-gradient(135deg, #23272f 80%, #353945 100%)",
            padding: "18px 20px 16px 20px",
            borderRadius: "14px",
            fontSize: "15px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.32)",
            border: "2px solid #bfa14a",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "50vh",
            overflowY: "auto"
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 12, color: "#bfa14a", fontSize: 17, letterSpacing: "0.04em" }}>レイヤ選択</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {layers.map((layer) => (
              <label
                key={layer.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: activeLayer === layer.id ? "linear-gradient(90deg, #bfa14a22 60%, #23272f 100%)" : "transparent",
                  border: activeLayer === layer.id ? "2px solid #bfa14a" : "2px solid transparent",
                  fontSize: "16px",
                  minHeight: "44px",
                  color: activeLayer === layer.id ? "#fffbe6" : "#f5f5f5",
                  fontWeight: activeLayer === layer.id ? 700 : 500,
                  letterSpacing: "0.03em",
                  transition: "all 0.2s ease"
                }}
                onClick={() => handleLayerSelect(layer.id)}
              >
                <input
                  type="radio"
                  name="layer"
                  value={layer.id}
                  checked={activeLayer === layer.id}
                  onChange={() => onLayerChange(layer.id)}
                  style={{ 
                    marginRight: 14,
                    width: "20px",
                    height: "20px",
                    accentColor: "#bfa14a",
                    background: "#23272f",
                    border: "2px solid #bfa14a",
                    borderRadius: "50%",
                    cursor: "pointer"
                  }}
                />
                <span style={{ 
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  fontSize: "16px"
                }}>
                  {layer.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
