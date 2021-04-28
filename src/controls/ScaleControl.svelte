<script lang="ts">
  import { ScaleControl } from "maplibre-gl";
  import { getContext } from "svelte";

  import type { ContextProps } from "../Map.svelte";
  import { ID } from "../mapbox";

  const { getMap } = getContext<ContextProps>(ID);
  const map = getMap();

  export let position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left" = "bottom-right";
  export let options = {};

  const optionsWithDefaults = Object.assign(
    {
      maxWidth: 80,
      unit: "metric",
    },
    options
  );

  const scale = new ScaleControl(optionsWithDefaults);
  map.addControl(scale, position);
</script>
