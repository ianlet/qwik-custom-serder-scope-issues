import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { QwikMapbox } from "~/components/qwik-mapbox";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
        <QwikMapbox
          token="pk.eyJ1Ijoibm9tYWhxIiwiYSI6ImNsb2N5NGZ6OTAydW0yam12MHByZ2FkZGMifQ.wim7VFij7pkuPUEhlV-zYg"
          mapStyle="mapbox://styles/mapbox/streets-v12"
        />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
