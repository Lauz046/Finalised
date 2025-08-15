import React from 'react';
import Head from 'next/head';
import HypeZone from '@/components/HypeZone';

const HypeZonePage = () => {
  return (
    <>
      <Head>
        <title>HypeZone - PLUTUS</title>
        <meta name="description" content="A reel zone for fashion drops, sneak peeks, and styling stories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main>
        <HypeZone />
      </main>
    </>
  );
};

export default HypeZonePage; 