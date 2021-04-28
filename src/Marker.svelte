<script lang="ts">
  import { Marker, Popup } from "maplibre-gl";
  import { onMount, getContext } from "svelte";
  import { ID } from "./mapbox";
  import type { ContextProps } from "./Map.svelte";

  const { getMap } = getContext<ContextProps>(ID);
  const map = getMap()

  const randomColor = () => Math.round(Math.random() * 255);

  const move = (lng: number, lat: number) => {
    marker.setLngLat({ lng, lat });
  };

  export let lat: number,
    lng: number,
    label = "Marker",
    popupClassName = "",
    markerOffset: [number, number] = [0, 0],
    popupOffset = 10,
    color = '#' + [randomColor(), randomColor(), randomColor()].map(num => num.toString(16)).join(''),
    popup = true;

  let marker: Marker, element: HTMLDivElement, elementPopup: HTMLDivElement

  onMount(() => {
    if (element.hasChildNodes()) {
      marker = new Marker({ element, offset: markerOffset })
    } else {
      marker = new Marker({ color, offset: markerOffset})
    }

    if (popup) {
      const popupEl = new Popup({
        offset: popupOffset,
        className: popupClassName
      })

      if (elementPopup.hasChildNodes()) {
        popupEl.setDOMContent(elementPopup)
      } else {
        popupEl.setText(label)
      }

      marker.setPopup(popupEl)
    }

    marker.setLngLat({ lng, lat }).addTo(map)

    return () => marker.remove()
  })

  $: marker && move(lng, lat)
</script>


<div bind:this={element}><slot /></div>

<div class="popup" bind:this={elementPopup}>
  <slot name="popup" />
</div>