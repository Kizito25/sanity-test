import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanityProductID = process.env.REACT_APP_SANITY_PROD_ID;
const sanityToken = process.env.REACT_APP_SANITY_TOKEN;

export const client = sanityClient({
  projectId: sanityProductID,
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: sanityToken,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
