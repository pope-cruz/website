import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pope Cruz",
    short_name: "pope cruz",
    description: "Notes, projects, and writing by Pope Cruz.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f4",
    theme_color: "#f7f7f4",
  };
}
