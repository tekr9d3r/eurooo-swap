import { SwapWidget } from '@/components/SwapWidget';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
        padding: '1rem',
      }}
    >
      <SwapWidget />
    </main>
  );
}
