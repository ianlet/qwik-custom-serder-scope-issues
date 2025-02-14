import {
  component$,
  isServer,
  useSerializer$,
  useSignal,
  useTask$,
} from "@qwik.dev/core";
import type { StyleSpecification } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

interface QwikMapboxProps {
  token: string;
  mapStyle: string;
  center?: [number, number];
}

interface SerializationState {
  token: string;
  mapStyle?: string | StyleSpecification;
  center?: [number, number];
}

export const QwikMapbox = component$<QwikMapboxProps>(
  ({ token, mapStyle, center = [0, 0] }) => {
    const ref = useSignal<HTMLDivElement>();

    const mapbox = useSerializer$<
      mapboxgl.Map | undefined,
      SerializationState | undefined
    >(() => ({
      initial: {
        token,
        mapStyle,
        center,
      },
      serialize: (map: mapboxgl.Map | undefined) => {
        if (!map) return;

        return {
          token,
          mapStyle: map.getStyle() || undefined,
          center: map.getCenter().toArray(),
        };
      },
      deserialize: (state: SerializationState | undefined) => {
        if (isServer) return;

        const s = state || { token, mapStyle, center };

        return new mapboxgl.Map({
          container: ref.value!,
          style: s.mapStyle,
          center: s.center,
        });
      },
      update: (map: mapboxgl.Map | undefined) => {
        if (!map) return;

        map.setStyle(mapStyle);
        map.setCenter(center);
      },
    }));

    useTask$(({ track }) => {
      const map = track(mapbox);

      map?.on("load", () => console.log("MAP LOADED"));
    });

    return <div ref={ref} style={{ width: "800px", height: "600px" }}></div>;
  },
);
