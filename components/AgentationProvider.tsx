'use client';

import dynamic from 'next/dynamic';

// Load agentation only on the client, never during SSR/static generation
const AgentationInner = dynamic(
  () => import('agentation').then((mod) => ({ default: () => <mod.Agentation appName="dither_animals" /> })),
  { ssr: false }
);

export default function AgentationProvider() {
  return <AgentationInner />;
}
