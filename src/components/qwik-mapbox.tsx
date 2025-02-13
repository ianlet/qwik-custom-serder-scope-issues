import {
  component$,
  useSerializer$,
  useSignal,
  useTask$,
} from "@qwik.dev/core";
import type { StyleSpecification } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

interface QwikMapboxProps {
  token: string;
  mapStyle: string | StyleSpecification;
}

interface SerializationState {
  token: string;
  mapStyle?: string | StyleSpecification;
}

export const QwikMapbox = component$<QwikMapboxProps>(({ token, mapStyle }) => {
  const ref = useSignal<HTMLDivElement>();

  const mapbox = useSerializer$({
    initial: {
      token,
      mapStyle,
    },
    serialize: (map: mapboxgl.Map): SerializationState => {
      return {
        token,
        mapStyle: map.getStyle() || undefined,
      };
    },
    deserialize: (
      data: SerializationState | undefined,
      current: mapboxgl.Map | undefined,
    ): mapboxgl.Map => {
      if (current) {
        return current;
      }

      return new mapboxgl.Map({
        container: "map",
        style: data!.mapStyle,
        accessToken: data!.token,
      });
    },
  });

  useTask$(() => {
    mapbox.value.on("load", () => console.log("MAP LOADED"));
  });

  return <div ref={ref} style={{ width: "800px", height: "600px" }}></div>;
});
