import startCase from "lodash.startcase";
import type { Style } from "maplibre-gl";

import type { Color } from "../../types";
import { colors } from "@/utils/tailwind/colors";

export const getStyles = (inputColor?: Color, labels = true): Style => {
  const color = inputColor ? inputColor : "gray";
  // TODO: handle dark mode
  const isDark = false;

  const deep = colors[color][isDark ? 300 : 600];

  const base = colors[color][isDark ? 900 : 50];
  const landcoverGlacier = colors[color][isDark ? 900 : 50];
  const landcoverIceShelf = colors[color][isDark ? 900 : 50];

  const building = colors[color][isDark ? 800 : 100];
  const water = colors[color][isDark ? 800 : 100];
  const waterway = colors[color][isDark ? 800 : 100];

  const landcoverPark = colors[color][isDark ? 700 : 200];
  const landcoverWood = colors[color][isDark ? 700 : 200];
  const parkFill = colors[color][isDark ? 700 : 200];

  const boundary = colors[color][isDark ? 600 : 300];
  const highwayBridgeInner = colors[color][isDark ? 600 : 300];
  const highwayCasing = colors[color][isDark ? 600 : 300];
  const highwayMajorInner = colors[color][isDark ? 600 : 300];
  const highwayMajorSubtle = colors[color][isDark ? 600 : 300];
  const highwayMinor = colors[color][isDark ? 600 : 300];
  const railway = colors[color][isDark ? 600 : 300];
  const railwayDashline = colors[color][isDark ? 600 : 300];
  const tunnelMotorwayCasing = colors[color][isDark ? 600 : 300];
  const tunnelMotorwayInner = colors[color][isDark ? 600 : 300];

  const regularFontsArr = ["Open Sans Regular"];

  const italicFontsArr = ["Open Sans Italic"];

  const textLayers = !labels
    ? []
    : [
        {
          id: "highway_name_other",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelTransportation" },
          source: "openmaptiles",
          "source-layer": "transportation_name",
          filter: [
            "all",
            ["!in", "class", "motorway", "trunk", "primary"],
            ["==", "$type", "LineString"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "line" as const,
            "symbol-spacing": 350,
            "text-field": "{name:latin} {name:nonlatin}",
            "text-font": regularFontsArr,
            "text-max-angle": 30,
            "text-pitch-alignment": "viewport" as const,
            "text-rotation-alignment": "map" as const,
            "text-size": 12,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
            "text-translate": [0, 0],
          },
        },
        {
          id: "water_name_ocean",
          type: "symbol" as const,
          source: "openmaptiles",
          "source-layer": "water_name",
          filter: ["all", ["==", "$type", "Point"], ["==", "class", "ocean"]],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "point" as const,
            "symbol-spacing": 500,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": italicFontsArr,
            "text-line-height": 1.55,
            "text-rotation-alignment": "map" as const,
            "text-size": 16,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
          },
        },
        {
          id: "water_name_nonocean",
          type: "symbol" as const,
          source: "openmaptiles",
          "source-layer": "water_name",
          filter: ["all", ["==", "$type", "Point"], ["!in", "class", "ocean"]],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "point" as const,
            "symbol-spacing": 500,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": italicFontsArr,
            "text-line-height": 1.55,
            "text-rotation-alignment": "map" as const,
            "text-size": {
              stops: [
                [0, 10],
                [6, 14],
              ],
            },
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
          },
        },
        {
          id: "water_name_line",
          type: "symbol" as const,
          source: "openmaptiles",
          "source-layer": "water_name",
          filter: ["==", "$type", "LineString"],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "line" as const,
            "symbol-spacing": 500,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": italicFontsArr,
            "text-line-height": 1.55,
            "text-rotation-alignment": "map" as const,
            "text-size": 14,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "poi_gen1",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "poi",
          minzoom: 15,
          filter: [
            "all",
            ["in", "class", "park"],
            ["<=", "rank", 3],
            ["==", "$type", "Point"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "center" as const,
            "text-line-height": 1.55,
            "text-size": 14,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
            "text-translate": [0, 0],
          },
        },
        {
          id: "poi_gen0_parks",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "poi",
          filter: [
            "all",
            ["==", "subclass", "park"],
            ["==", "rank", 1],
            ["==", "$type", "Point"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "center" as const,
            "text-line-height": 1.55,
            "text-size": 14,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
            "text-translate": [0, 0],
          },
        },
        {
          id: "poi_gen0_other",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "poi",
          filter: [
            "all",
            ["in", "subclass", "university", "hospital"],
            ["<=", "rank", 3],
            ["==", "$type", "Point"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "center" as const,
            "text-line-height": 1.55,
            "text-size": 14,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
            "text-translate": [0, 0],
          },
        },
        {
          id: "place_other",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          minzoom: 11,
          maxzoom: 14,
          filter: [
            "all",
            ["!in", "class", "city", "suburb", "town", "village"],
            ["==", "$type", "Point"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "center" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0],
            "text-size": {
              stops: [
                [3, 10],
                [14, 12],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
          },
        },
        {
          id: "highway_name_major",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelTransportation" },
          source: "openmaptiles",
          "source-layer": "transportation_name",
          filter: [
            "all",
            ["in", "class", "trunk", "primary"],
            ["==", "$type", "LineString"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "line" as const,
            "symbol-spacing": 350,
            "text-field": "{name:latin} {name:nonlatin}",
            "text-font": regularFontsArr,
            "text-line-height": 1.55,
            "text-max-angle": 30,
            "text-pitch-alignment": "viewport" as const,
            "text-rotation-alignment": "map" as const,
            "text-size": 13,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
            "text-translate": [0, 0],
          },
        },
        {
          id: "highway_name_motorway",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelTransportation" },
          source: "openmaptiles",
          "source-layer": "transportation_name",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["==", "class", "motorway"],
          ],
          layout: {
            "symbol-avoid-edges": true,
            "symbol-placement": "line" as const,
            "symbol-spacing": 350,
            "text-field": "{ref}",
            "text-font": regularFontsArr,
            "text-pitch-alignment": "viewport" as const,
            "text-rotation-alignment": "viewport" as const,
            "text-size": 14,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
            "text-translate": [0, 2],
          },
        },
        {
          id: "place_suburb",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 15,
          filter: ["all", ["==", "$type", "Point"], ["==", "class", "suburb"]],
          layout: {
            "symbol-avoid-edges": true,
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "center" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0],
            "text-size": {
              base: 1,
              stops: [
                [3, 10],
                [14, 13],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
            "text-opacity": 0.7,
          },
        },
        {
          id: "place_village",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 14,
          filter: ["all", ["==", "$type", "Point"], ["==", "class", "village"]],
          layout: {
            "icon-size": 0.4,
            "symbol-avoid-edges": true,
            "text-anchor": "left" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [3, 10],
                [14, 13],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.6,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
          },
        },
        {
          id: "airport_label_gen0",
          type: "symbol" as const,
          source: "openmaptiles",
          "source-layer": "aerodrome_label",
          minzoom: 10,
          filter: ["all", ["has", "iata"]],
          layout: {
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-line-height": 1.55,
            "text-max-width": 9,
            "text-padding": 2,
            "text-size": 13,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
            "text-translate": [0, 0],
          },
        },
        {
          id: "place_town",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 15,
          filter: ["all", ["==", "$type", "Point"], ["==", "class", "town"]],
          layout: {
            "icon-image": {
              base: 1,
              stops: [
                [0, "circle-11"],
                [8, ""],
              ],
            },
            "icon-size": 0.4,
            "symbol-avoid-edges": true,
            "text-anchor": {
              base: 1,
              stops: [
                [0, "left"],
                [8, "center"],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [3, 10],
                [14, 13],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.6,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 2,
          },
        },
        {
          id: "place_city",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          filter: [
            "all",
            ["==", "$type", "Point"],
            [
              "all",
              ["!=", "capital", 2],
              ["==", "class", "city"],
              [">", "rank", 3],
            ],
          ],
          layout: {
            "icon-image": {
              base: 1,
              stops: [
                [0, "circle-11"],
                [8, ""],
              ],
            },
            "icon-size": 0.4,
            "text-anchor": {
              base: 1,
              stops: [
                [0, "left"],
                [8, "center"],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [3, 10],
                [14, 18],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.7,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "place_city_large",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          filter: [
            "all",
            ["==", "$type", "Point"],
            [
              "all",
              ["!=", "capital", 2],
              ["<=", "rank", 3],
              ["==", "class", "city"],
            ],
          ],
          layout: {
            "icon-image": {
              base: 1,
              stops: [
                [0, "circle-11"],
                [8, ""],
              ],
            },
            "icon-size": 0.4,
            "text-anchor": {
              base: 1,
              stops: [
                [0, "left"],
                [8, "center"],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [4, 11],
                [12, 18],
                [14, 22],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.7,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "place_capital_gen1",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          minzoom: 4,
          filter: [
            "all",
            ["==", "$type", "Point"],
            [
              "all",
              ["==", "capital", 2],
              ["==", "class", "city"],
              [">", "rank", 3],
            ],
          ],
          layout: {
            "icon-image": {
              base: 1,
              stops: [
                [0, "star-11"],
                [8, ""],
              ],
            },
            "icon-size": 1,
            "symbol-avoid-edges": true,
            "text-anchor": {
              base: 1,
              stops: [
                [0, "left"],
                [8, "center"],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [3, 13],
                [14, 24],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.7,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "place_capital_gen0",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          filter: [
            "all",
            ["==", "$type", "Point"],
            [
              "all",
              ["==", "capital", 2],
              ["==", "class", "city"],
              ["<=", "rank", 3],
            ],
          ],
          layout: {
            "icon-image": {
              base: 1,
              stops: [
                [0, "star-11"],
                [8, ""],
              ],
            },
            "icon-size": 1,
            "text-anchor": {
              base: 1,
              stops: [
                [0, "left"],
                [8, "center"],
              ],
            },
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-justify": "left" as const,
            "text-line-height": 1.55,
            "text-offset": [0.5, 0.2],
            "text-size": {
              base: 1,
              stops: [
                [3, 13],
                [14, 24],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "icon-opacity": 0.7,
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "place_state",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 12,
          filter: ["all", ["==", "$type", "Point"], ["==", "class", "state"]],
          layout: {
            "symbol-avoid-edges": true,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-line-height": 1.55,
            "text-size": 10,
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-blur": 1,
            "text-halo-color": base,
            "text-halo-width": 1,
          },
        },
        {
          id: "place_country_other",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 10,
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["all", ["==", "class", "country"], [">=", "rank", 2]],
          ],
          layout: {
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-line-height": 1.55,
            "text-padding": 10,
            "text-size": {
              base: 1,
              stops: [
                [0, 10],
                [6, 14],
                [9, 24],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-color": base,
            "text-halo-width": 1.4,
          },
        },
        {
          id: "place_country_major",
          type: "symbol" as const,
          metadata: { "mapbox:group": "labelPlaces" },
          source: "openmaptiles",
          "source-layer": "place",
          maxzoom: 10,
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["all", ["<=", "rank", 1], ["==", "class", "country"]],
          ],
          layout: {
            "text-anchor": "center" as const,
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": regularFontsArr,
            "text-line-height": 1.55,
            "text-size": {
              base: 1.4,
              stops: [
                [0, 10],
                [6, 16],
                [9, 22],
              ],
            },
            visibility: "visible" as const,
          },
          paint: {
            "text-color": deep,
            "text-halo-color": base,
            "text-halo-width": 1.4,
          },
        },
      ];

  return {
    name: `Curb ${isDark ? "Dark" : "Light"} ${startCase(color)}`,
    glyphs: "https://tiles.stadiamaps.com/fonts/{fontstack}/{range}.pbf",
    sprite: "https://tiles.stadiamaps.com/styles/alidade-smooth/sprite",
    version: 8,
    center: [10.184401828277087, -1.1368683772161605e-13],
    zoom: 0.8902641636539237,
    pitch: 0,
    bearing: 0,
    sources: {
      openmaptiles: {
        type: "vector" as const,
        url: "https://tiles.stadiamaps.com/data/openmaptiles.json",
      },
    },
    metadata: {
      "mapbox:autocomposite": false,
      "mapbox:groups": {
        labelPlaces: {
          collapsed: false,
          name: "Places",
        },
        labelBoundaries: { name: "Boundaries" },
        labelTransportation: {
          collapsed: false,
          name: "Transportation",
        },
      },
      "mapbox:type": "template",
      "openmaptiles:mapbox:owner": "openmaptiles",
      "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t",
      "openmaptiles:version": "3.x",
    },
    layers: [
      {
        id: "background",
        type: "background" as const,
        paint: { "background-color": base },
      },
      {
        id: "park_fill",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "park",
        filter: ["==", "$type", "Polygon"],
        layout: { visibility: "visible" } as const,
        paint: { "fill-color": parkFill },
      },
      {
        id: "landcover_ice_shelf",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "landcover",
        maxzoom: 8,
        filter: [
          "all",
          ["==", "$type", "Polygon"],
          ["==", "subclass", "ice_shelf"],
        ],
        layout: { visibility: "visible" } as const,
        paint: {
          "fill-color": landcoverIceShelf,
          "fill-opacity": 0.7,
        },
      },
      {
        id: "landcover_glacier",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "landcover",
        maxzoom: 8,
        filter: [
          "all",
          ["==", "$type", "Polygon"],
          ["==", "subclass", "glacier"],
        ],
        layout: { visibility: "visible" } as const,
        paint: {
          "fill-color": landcoverGlacier,
          "fill-opacity": {
            base: 1,
            stops: [
              [0, 1],
              [8, 0.5],
            ],
          },
        },
      },
      {
        id: "landcover_wood",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "landcover",
        minzoom: 10,
        filter: ["all", ["==", "$type", "Polygon"], ["==", "class", "wood"]],
        layout: { visibility: "visible" } as const,
        paint: {
          "fill-color": landcoverWood,
          "fill-opacity": {
            base: 1,
            stops: [
              [8, 0],
              [12, 1],
            ],
          },
        },
      },
      {
        id: "landcover_park",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "landcover",
        minzoom: 10,
        filter: ["all", ["==", "$type", "Polygon"], ["==", "subclass", "park"]],
        layout: { visibility: "visible" } as const,
        paint: {
          "fill-color": landcoverPark,
          "fill-opacity": {
            base: 1,
            stops: [
              [8, 0],
              [12, 0.8],
            ],
          },
        },
      },
      {
        id: "boundary_state",
        type: "line" as const,
        metadata: { "mapbox:group": "labelBoundaries" },
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: ["==", "admin_level", 4],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-blur": 0.4,
          "line-color": boundary,
          "line-dasharray": [2, 2],
          "line-opacity": 1,
          "line-width": {
            base: 1.3,
            stops: [
              [3, 1],
              [22, 15],
            ],
          },
        },
      },
      {
        id: "boundary_country",
        type: "line" as const,
        metadata: { "mapbox:group": "labelBoundaries" },
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: ["==", "admin_level", 2],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-blur": {
            base: 1,
            stops: [
              [0, 0.4],
              [22, 4],
            ],
          },
          "line-color": boundary,
          "line-opacity": 1,
          "line-width": {
            base: 1.1,
            stops: [
              [3, 1],
              [22, 20],
            ],
          },
        },
      },
      {
        id: "water",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "water",
        filter: ["==", "$type", "Polygon"],
        layout: { visibility: "visible" } as const,
        paint: {
          "fill-antialias": true,
          "fill-color": water,
        },
      },
      {
        id: "waterway",
        type: "line" as const,
        source: "openmaptiles",
        "source-layer": "waterway",
        filter: ["==", "$type", "LineString"],
        layout: { visibility: "visible" } as const,
        paint: { "line-color": waterway },
      },
      {
        id: "building",
        type: "fill" as const,
        source: "openmaptiles",
        "source-layer": "building",
        minzoom: 12,
        filter: ["==", "$type", "Polygon"],
        paint: {
          "fill-antialias": true,
          "fill-color": building,
        },
      },
      {
        id: "tunnel_motorway_casing",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]],
        ],
        layout: {
          "line-cap": "butt",
          "line-join": "miter",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": tunnelMotorwayCasing,
          "line-opacity": 1,
          "line-width": {
            base: 1.4,
            stops: [
              [5.8, 0],
              [6, 3],
              [20, 35],
            ],
          },
        },
      },
      {
        id: "tunnel_motorway_inner",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": tunnelMotorwayInner,
          "line-width": {
            base: 1.4,
            stops: [
              [4, 2],
              [6, 1.3],
              [20, 30],
            ],
          },
        },
      },
      {
        id: "highway_path",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "path", "footway", "construction"],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayBridgeInner,
          "line-opacity": 0.9,
          "line-width": {
            base: 1.2,
            stops: [
              [13, 1],
              [20, 10],
            ],
          },
        },
      },
      {
        id: "highway_minor",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 8,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "minor", "service", "track"],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": {
            base: 1,
            stops: [
              [8, highwayMinor],
              [12, highwayMinor],
              [13, highwayMinor],
              [16, highwayMinor],
            ],
          },
          "line-opacity": 0.9,
          "line-width": {
            base: 1.55,
            stops: [
              [13, 1],
              [18, 8],
            ],
          },
        },
      },
      {
        id: "highway_major_casing",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "primary", "secondary", "tertiary", "trunk"],
        ],
        layout: {
          "line-cap": "butt",
          "line-join": "miter",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayCasing,
          "line-dasharray": [12, 0],
          "line-width": {
            base: 1.3,
            stops: [
              [10, 3],
              [20, 20],
            ],
          },
        },
      },
      {
        id: "highway_major_inner",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "primary", "secondary", "tertiary", "trunk"],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayMajorInner,
          "line-width": {
            base: 1.3,
            stops: [
              [10, 2],
              [20, 18],
            ],
          },
        },
      },
      {
        id: "highway_major_subtle",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        maxzoom: 12,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "primary", "secondary", "tertiary", "trunk"],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: { "line-color": highwayMajorSubtle, "line-width": 1 },
      },
      {
        id: "highway_motorway_casing",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          [
            "all",
            ["!in", "brunnel", "bridge", "tunnel"],
            ["==", "class", "motorway"],
          ],
        ],
        layout: {
          "line-cap": "butt",
          "line-join": "miter",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayCasing,
          "line-dasharray": [2, 0],
          "line-opacity": 1,
          "line-width": {
            base: 1.4,
            stops: [
              [5.8, 0],
              [6, 3],
              [20, 30],
            ],
          },
        },
      },
      {
        id: "highway_motorway_inner",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          [
            "all",
            ["!in", "brunnel", "bridge", "tunnel"],
            ["==", "class", "motorway"],
          ],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayBridgeInner,
          "line-width": {
            base: 1.4,
            stops: [
              [4, 2],
              [6, 1.3],
              [20, 25],
            ],
          },
        },
      },
      {
        id: "highway_motorway_subtle",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        maxzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["==", "class", "motorway"],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayBridgeInner,
          "line-width": {
            base: 1.4,
            stops: [
              [4, 0.75],
              [5, 1.5],
            ],
          },
        },
      },
      {
        id: "railway_service",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 16,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "class", "rail"], ["has", "service"]],
        ],
        layout: { "line-join": "round", visibility: "visible" } as const,
        paint: { "line-color": railway, "line-width": 3 },
      },
      {
        id: "railway_service_dashline",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 16,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["==", "class", "rail"],
          ["has", "service"],
        ],
        layout: { "line-join": "round", visibility: "visible" } as const,
        paint: {
          "line-color": railwayDashline,
          "line-dasharray": [3, 3],
          "line-width": 2,
        },
      },
      {
        id: "railway",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 13,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["!has", "service"], ["==", "class", "rail"]],
        ],
        layout: { "line-join": "round", visibility: "visible" } as const,
        paint: {
          "line-color": railway,
          "line-width": {
            base: 1.3,
            stops: [
              [16, 3],
              [20, 7],
            ],
          },
        },
      },
      {
        id: "railway_dashline",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 13,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["!has", "service"], ["==", "class", "rail"]],
        ],
        layout: { "line-join": "round", visibility: "visible" } as const,
        paint: {
          "line-color": railwayDashline,
          "line-dasharray": [3, 3],
          "line-width": {
            base: 1.3,
            stops: [
              [16, 2],
              [20, 6],
            ],
          },
        },
      },
      {
        id: "aeroway_line",
        type: "line" as const,
        source: "openmaptiles",
        "source-layer": "aeroway",
        filter: ["==", "$type", "LineString"],
        layout: { visibility: "visible" } as const,
        paint: { "line-color": railway },
      },
      {
        id: "highway_motorway_bridge_casing",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]],
        ],
        layout: {
          "line-cap": "butt",
          "line-join": "miter",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayCasing,
          "line-dasharray": [2, 0],
          "line-opacity": 1,
          "line-width": {
            base: 1.4,
            stops: [
              [5.8, 0],
              [6, 5],
              [20, 35],
            ],
          },
        },
      },
      {
        id: "highway_motorway_bridge_inner",
        type: "line" as const,
        metadata: { "mapbox:group": "labelTransportation" },
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 6,
        filter: [
          "all",
          ["==", "$type", "LineString"],
          ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]],
        ],
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible" as const,
        },
        paint: {
          "line-color": highwayBridgeInner,
          "line-width": {
            base: 1.4,
            stops: [
              [4, 2],
              [6, 1.3],
              [20, 30],
            ],
          },
        },
      },
      ...textLayers,
    ],
  };
};
