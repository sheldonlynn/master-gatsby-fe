import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // use a side effect to fetch data from graphql endpoint
  // side effect = when component mounts, will run
  // will re-run when data changes
  useEffect(function () {
    // when the component loads
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
  StoreSettings(id:"downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []); // put vars in array to watch to run

  return {
    hotSlices,
    slicemasters,
  };
}
