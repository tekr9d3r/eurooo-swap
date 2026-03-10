# Eurooo Swap

Cross-chain EUR stablecoin swap interface, powered by [Li.Fi](https://li.fi). Part of the [eurooo.xyz](https://www.eurooo.xyz) ecosystem.

**Live:** [swap.eurooo.xyz](https://swap.eurooo.xyz)

---

## What it does

- Swap EUR stablecoins (EURC, EURe, EURCV, EURS and more) across multiple blockchains
- Powered by Li.Fi widget for best-route cross-chain execution
- Displays EUR stablecoin contract addresses with one-click copy
- Monetised via Li.Fi integrator fee (1% on swaps, attributed to `Eurooo.xyz`)

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Swap widget | @lifi/widget v3 |
| Theme | next-themes (dark / light / system) |
| Deployment | Vercel |

---

## Project structure

```
app/
  layout.tsx        # Root layout — Navbar, Footer, ThemeProvider, metadata
  page.tsx          # Home page — Li.Fi widget + spinning stars + token table
  globals.css       # CSS variables, Tailwind base

components/
  SwapWidget.tsx    # Li.Fi widget config (integrator fee, theme, variant)
  Navbar.tsx        # Top navigation bar
  Footer.tsx        # Footer with social links
  TokenTable.tsx    # EUR stablecoin contract address table
  theme-provider.tsx
  theme-toggle.tsx

public/
  logo.png                        # Eurooo shield logo
  favicon.ico                     # Browser tab icon
  website-preview-eurooo-swap.png # OG / Twitter card image
```

---

## Li.Fi integration

The widget is configured in [components/SwapWidget.tsx](components/SwapWidget.tsx):

```ts
integrator: 'Eurooo.xyz'   // integrator ID for fee attribution
fee: 0.01                  // 1% fee on all swaps
variant: 'compact'
```

---

## EUR stablecoin addresses

| Token | Chain | Contract |
|---|---|---|
| EURC | Ethereum | `0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c` |
| EURC | Base | `0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42` |
| EURC | Avalanche | `0xC891EB4CbdEFf6e073e859e987815Ed1505c2ACD` |
| EURC | Solana | `HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr` |
| EURe | Gnosis | `0xcB444e90D8198415266c6a2724b7900fb12FC56E` |
| EURCV | Ethereum | `0x5f7827FDeb7c20b443265Fc2F40845B715385Ff2` |

---

## Getting started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Deployment

Deployed on Vercel. Every push to `main` triggers an automatic redeploy.

Custom domain: `swap.eurooo.xyz`

---

## Ecosystem links

| | |
|---|---|
| Main site | [eurooo.xyz](https://www.eurooo.xyz) |
| Knowledge Hub | [hub.eurooo.xyz](https://hub.eurooo.xyz) |
| Stats | [eurooo.xyz/stats](https://www.eurooo.xyz/stats) |
| Earn | [eurooo.xyz/app](https://www.eurooo.xyz/app) |
| X / Twitter | [@tekr0x](https://x.com/tekr0x) |
| Telegram | [t.me/+wxIKk-lsEy5kMGQ0](https://t.me/+wxIKk-lsEy5kMGQ0) |
