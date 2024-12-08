import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://benyn.github.io/raycast-daily-planner/",
  integrations: [
    starlight({
      title: "Raycast Daily Planner Extension",
      description:
        "The Raycast Daily Planner extension documentation site offers in-depth guidance on using this powerful productivity tool for time blocking, time tracking, and time usage analysis on macOS.",
      logo: { src: "./public/favicon.svg" },
      social: {
        github: "https://github.com/benyn/raycast-daily-planner",
      },
      sidebar: [
        {
          label: "Getting started",
          collapsed: false,
          items: [{ label: "Intro", link: "/" }, "extension-settings"],
        },
        {
          label: "Commands",
          collapsed: false,
          autogenerate: { directory: "commands" },
        },
        {
          label: "Integrations",
          collapsed: false,
          autogenerate: { directory: "integrations" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://cloud.umami.is/script.js",
            "data-website-id": '"29a12667-38cc-4ae0-a286-6fc63912f384"',
            defer: true,
          },
        },
      ],
      favicon: "/favicon.svg",
    }),
  ],
});
