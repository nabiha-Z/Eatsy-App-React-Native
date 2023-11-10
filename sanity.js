import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID || "3cxupwyp",
  dataset: "production",
  useCdn: true,
  apiVersion: process.env.EXPO_PUBLIC_SANITY_API_VERSION || "2023-10-25",
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
