<script lang="ts" context="module">
  type Coords = [lng: number, lat: number];
  export type ContextProps = {
    getMap:() => Map
  }
</script>

<script lang="ts">
  import 'maplibre-gl/dist/maplibre-gl.css'
  import { Map } from "maplibre-gl";
  import type { MapboxOptions, Style } from "maplibre-gl";
  import { onMount, createEventDispatcher, setContext } from "svelte";
  import { ID } from "./mapbox";
  import { normalizeStyle } from "./normalize-style";
  import { EventQueue } from "./queue";

  setContext<ContextProps>(ID, {
    getMap: () => map,
  });

  const dispatch = createEventDispatcher();

  let container: HTMLDivElement;
  let animationInProgress = false;

  const queue = new EventQueue((cmd: [string, any[]], cb) => {
    const [command, params] = cmd;
    map[command](...params);
    cb(null);
  });

  export let map: Map = null;
  export let center: Coords = [0, 0];
  export let zoom = 9;
  export let options = {} as MapboxOptions;
  export let mapStyles: string | Style =
    "https://tiles.stadiamaps.com/styles/alidade_smooth.json";

  const style = normalizeStyle(mapStyles);

  export const fitBounds = (bbox, options = {}) => {
    queue.send("fitBounds", [bbox, options]);
  };

  export const flyTo = (destination: Record<string, unknown>, options = {}) => {
    queue.send("flyTo", [destination, options]);
  };

  export const resize = () => {
    queue.send("resize");
  };

  export const setCenter = (coords: Coords, eventData = {}) => {
    queue.send("setCenter", [coords, eventData]);
  };

  export const addControl = (control, position = "top-right") => {
    queue.send("addControl", [control, position]);
  };

  export const getMap = () => map;

  const setZoom = (zoom: number, eventData = {}) => {
    queue.send("setZoom", [zoom, eventData]);
  };

  onMount(() => {
    const optionsWithDefaults = Object.assign({
      container,
      style,
      center
    }, options) as MapboxOptions

    const el = new Map(optionsWithDefaults)

    el.on('dragend', () => {
      const { lng, lat } = el.getCenter()
      center = [ lng, lat ]
      dispatch('recentre', { center })
    })

    el.on('click', e => dispatch('click', { lng: e.lngLat.lng, lat: e.lngLat.lat }))

    el.on('zoomstart', () => {
      animationInProgress = true
      zoom = el.getZoom()
      dispatch('zoomstart', { zoom })
    })

    el.on('zoom', () => {
      zoom = el.getZoom()
      dispatch('zoom', { zoom })
    })

    el.on('zoomend', () => {
      animationInProgress = false
      zoom = el.getZoom()
      dispatch('zoomend', { zoom })
    })

    el.on('load', () => {
      map = el
      queue.start()
      dispatch('ready')
      setZoom(zoom)
      setCenter(center)
    })

    return () => {
      queue.stop();
      map?.remove?.();
    };
  });

  $: !animationInProgress && setZoom(zoom)
</script>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>

<div class="map" bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
