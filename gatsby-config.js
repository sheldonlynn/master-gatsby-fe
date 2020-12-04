import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza place in Hamilton`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // resolve = name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'z5x9q3j5',
        dataset: 'production',
        watchMode: true,
        // no sensitive info in gatsby config
        // this file will be checked into GIT so don't put secrets here
        // put secrets in .env
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
