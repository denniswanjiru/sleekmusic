import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const state = useStore({
    name: "",
    descritpion: "",
  });

  useClientEffect$(() => {
    async function getData() {
      try {
        const res = await fetch("http://127.0.0.1:8080");
        const { name, description } = await res.json();
        state.name = name;
        state.descritpion = description;
      } catch (error) {
        console.log({ error });
      }
    }

    getData();
  });

  return (
    <div>
      <h1>
        Welcome to {state.name} <span class="lightning">⚡️</span>
      </h1>
      <p>{state.descritpion}</p>

      <Link class="mindblow" href="/flower/">
        Blow my mind 🤯
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Sleak",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
