// @ts-nocheck
import { createClient } from '@sanity/client';
import sanityImage from '@sanity/image-url';

const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-08-30',
}

export const sanityClient = createClient(options);
export const imageBuilder = sanityImage(sanityClient);