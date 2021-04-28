<!-- TESTING PURPOSES ONLY. NOT TO BE IMPORTED -->

<script lang="ts">
  import { Map, Marker, NavigationControl } from "./";

  let mapComponent: Map;
  const center = [-2.8572362, 53.3358627] as [lng: number, lat: number];
  let zoom = 11;
</script>

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
  }
</style>

<div class="wrapper">
  <Map
    bind:this={mapComponent}
    {center}
    bind:zoom>
    <NavigationControl />
    <Marker lat={center[1]} lng={center[0]} />
  </Map>  
</div>
