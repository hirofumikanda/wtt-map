import maplibregl, { Map, MapMouseEvent } from "maplibre-gl";
import type { MapGeoJSONFeature } from "maplibre-gl";

const ALLOW_LAYERS = [
  "wtt_male_2025",
  "wtt_female_2025",
  "wtt_male_2024",
  "wtt_female_2024",
  "wtt_male_2023",
  "wtt_female_2023",
];

export const setupPopupHandler = (map: Map) => {
  map.on("click", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });

    if (features.length === 0) return;

    const popupContent = buildPopupContent(features[0]);
    new maplibregl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });
};

const buildPopupContent = (feature: MapGeoJSONFeature): string => {
  const props = feature.properties ?? {};
  let html = `<table style="border-collapse:collapse;">`;
  const targetLayers = [
    "wtt_male_2025",
    "wtt_female_2025",
    "wtt_male_2024",
    "wtt_female_2024",
    "wtt_male_2023",
    "wtt_female_2023"
  ];
  const isTargetLayer = feature.layer && targetLayers.includes(feature.layer.id);

  const targetKeys = ["1st", "2nd", "4th", "4th_2"];
  const countryImages: { [country: string]: { keyword: string; img: string; alt: string } } = {
    china:     { keyword: "中国", img: "img/china.png", alt: "中国" },
    brazil:    { keyword: "ブラジル", img: "img/brazil.png", alt: "ブラジル" },
    denmark:   { keyword: "デンマーク", img: "img/denmark.png", alt: "デンマーク" },
    france:    { keyword: "フランス", img: "img/france.png", alt: "フランス" },
    germany:   { keyword: "ドイツ", img: "img/germany.png", alt: "ドイツ" },
    japan:     { keyword: "日本", img: "img/japan.png", alt: "日本" },
    portugal:  { keyword: "ポルトガル", img: "img/portugal.png", alt: "ポルトガル" },
    southKorea:{ keyword: "韓国", img: "img/southKorea.png", alt: "韓国" },
    spain:     { keyword: "スペイン", img: "img/spain.png", alt: "スペイン" },
    taiwan:    { keyword: "台湾", img: "img/taiwan.png", alt: "台湾" },
    sweden:    { keyword: "スウェーデン", img: "img/sweden.png", alt: "スウェーデン" },
    america:   { keyword: "アメリカ", img: "img/america.png", alt: "アメリカ" },
    croatia:   { keyword: "クロアチア", img: "img/croatia.png", alt: "クロアチア" },
    india:     { keyword: "インド", img: "img/india.png", alt: "インド" },
    nigeria:   { keyword: "ナイジェリア", img: "img/nigeria.png", alt: "ナイジェリア" },
    slovenia:   { keyword: "スロベニア", img: "img/slovenia.png", alt: "スロベニア" },
    switzerland:   { keyword: "スイス", img: "img/switzerland.png", alt: "スイス" },
    austria:   { keyword: "オーストリア", img: "img/austria.png", alt: "オーストリア" },
    macao:   { keyword: "マカオ", img: "img/macao.png", alt: "マカオ" },
    monaco:   { keyword: "モナコ", img: "img/monaco.png", alt: "モナコ" },
    puertoRico:   { keyword: "プエルトリコ", img: "img/puertoRico.png", alt: "プエルトリコ" },
    thailand:   { keyword: "タイ", img: "img/thailand.png", alt: "タイ" },
    romania:   { keyword: "ルーマニア", img: "img/romania.png", alt: "ルーマニア" },
  };
  for (const key in props) {
    let label = key;
    let value = props[key];
    if (key === "year") continue;
    if (key === "month") continue;
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      let valueHtml = escapeHTML(String(value));
      // 対象レイヤの1st,2nd,4th,4th_2プロパティに各国名が含まれている場合、画像を先頭に
      if (
        isTargetLayer &&
        targetKeys.includes(key) &&
        typeof value === "string"
      ) {
        for (const country of Object.values(countryImages)) {
          if (value.includes(country.keyword)) {
            valueHtml = `<img src=\"${country.img}\" alt=\"${country.alt}\" style=\"height:1.2em;vertical-align:middle;margin-right:6px;\">` + valueHtml;
            break;
          }
        }
      }
      html += `
        <tr>
          <td style=\"padding:4px; border:1px solid #ccc;\"><strong>${escapeHTML(label)}</strong></td>
          <td style=\"padding:4px; border:1px solid #ccc;\">${valueHtml}</td>
        </tr>`;
    }
  }

  html += `</table>`;
  return html;
};

const escapeHTML = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });
