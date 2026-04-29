'use client';

import dynamic from 'next/dynamic';
import type { WidgetConfig } from '@lifi/widget';

const LiFiWidget = dynamic(
  () => import('@lifi/widget').then((mod) => mod.LiFiWidget),
  { ssr: false }
);

const widgetConfig: WidgetConfig = {
  integrator: 'Eurooo.xyz',
  variant: 'compact',
  fee: 0.0025,
  feeConfig: {
    name: 'Eurooo',
    fee: 0.0025,
    showFeePercentage: true,
    showFeeTooltip: true,
  },
  theme: {
    palette: {
      primary: { main: '#1a56db' },
      secondary: { main: '#1a56db' },
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    shape: {
      borderRadius: 16,
      borderRadiusSecondary: 12,
    },
    container: {
      borderRadius: '20px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    },
  },
};

export function SwapWidget() {
  return <LiFiWidget integrator="Eurooo.xyz" config={widgetConfig} />;
}
