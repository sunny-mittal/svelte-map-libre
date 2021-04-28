<script lang="ts">
  import { getContext } from "svelte";
  import { NavigationControl } from "maplibre-gl";
  import type { ContextProps } from "./Map.svelte";
  import { ID } from "./mapbox";

  const { getMap } = getContext<ContextProps>(ID);
  const map = getMap();

  export let position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left" = "top-right";

  export let options: {
    showCompass?: boolean;
    showZoom?: boolean;
    visualizePitch?: boolean;
  } = {};

  const nav = new NavigationControl(options);
  map.addControl(nav, position);
</script>
