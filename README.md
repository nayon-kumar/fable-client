# Fable — Ebook Sharing Platform (Client)

**Fable** is a digital platform that connects ebook readers and collectors
with independent writers. Readers browse and purchase original ebooks,
writers upload and manage their own catalog after a one-time verification
payment, and an admin oversees users, ebooks, and transactions across the
platform.

This repository is the **Next.js (App Router)** client for Fable. It
consumes the [fable-server](../fable-server) REST API for all data and uses
BetterAuth purely as a Google OAuth relay, bridging the resulting profile
into the server's own JWT-based session.

- **Live URL:** _add production URL after deployment_
- **Server repository:** _add server repo link_

## Key Features

- Email/password and Google authentication, with the Google flow handled by
  BetterAuth and bridged into the Fable API's JWT session
- Role-based dashboards for Readers, Writers, and Admins, each gated by an
  auth guard that waits for the session to resolve before redirecting (no
  false "logged out" flash on reload of a private route)
- Home page with a hero carousel, server-rendered featured ebooks, top
  writers, and a genre grid — animated with Framer Motion
- Browse Ebooks with search, genre/price/availability filters, sorting, and
  pagination, plus skeleton loading and empty states
- Ebook details with a purchase flow (Stripe Checkout redirect), bookmarking,
  and content gated behind ownership or purchase
- Reader dashboard: purchase history, a purchased-ebooks gallery, bookmarks,
  and profile management, with a "Become a Writer" verification checkout
- Writer dashboard: manage/add/edit ebooks with imgBB cover uploads,
  publish/unpublish, sales history, and bookmarks
- Admin dashboard: platform analytics with monthly sales and genre charts
  (Recharts), user role/deletion management, ebook moderation, and a
  transaction ledger
- Custom 404 page, a React error boundary fallback, and toast-based API
  error handling throughout

## Tech Stack / npm Packages

| Package | Purpose |
| --- | --- |
| next | App Router framework, routing, SSR/SSG |
| react / react-dom | UI library |
| better-auth | Google OAuth flow (relayed into the Fable API's JWT) |
| @better-auth/mongo-adapter, mongodb | BetterAuth's account/session storage |
| @heroui/react, @heroui/styles | Accessible form primitives (inputs, buttons) |
| tailwindcss, @tailwindcss/postcss | Utility-first styling |
| framer-motion | Scroll-reveal and hero animations |
| recharts | Admin dashboard charts |
| react-hot-toast | Toast notifications for API feedback |
| react-icons, @gravity-ui/icons, lucide-react | Iconography |

## Project Structure

```
src/app/(mainLayout)/   Public pages (home, browse, ebook details, auth, legal)
src/app/dashboard/      Role-gated dashboards (user, writer, admin)
src/app/auth/callback/  BetterAuth -> Fable JWT bridge page
src/app/payment/success Stripe checkout confirmation page
src/components/         UI, auth, dashboard, ebook, and shared components
src/context/            AuthContext (token/user state, login/register/logout)
src/hooks/               useApi — auth-aware fetch wrapper
src/lib/                api.js, imgbb.js, auth.js / auth-client.js
src/config/             Genre list and per-role dashboard navigation
```

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```
MONGODB_URI=your_mongodb_connection_string
AUTH_DB_NAME=fable_auth
BETTER_AUTH_SECRET=replace_with_a_long_random_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

`.env` is git-ignored — never commit real credentials. `MONGODB_URI` is only
used by BetterAuth to store Google OAuth accounts/sessions; all application
data (users, ebooks, purchases, transactions) lives in the Fable API's own
database.

## Running Locally

```bash
npm install
npm run dev     # http://localhost:3000
```

The [fable-server](../fable-server) API must be running (default
`http://localhost:5000`) for anything beyond the static pages to work.

## Design Decisions Worth Knowing

- **Registration always creates a Reader.** The server's writer-verification
  Stripe flow (`/payments/checkout/writer-verification`) only has meaning if
  becoming a writer requires payment, so choosing "Writer" at signup
  registers the account as a Reader and immediately starts that checkout
  session rather than self-granting the role for free.
- **Google sign-in is a relay, not a parallel user store.** BetterAuth
  handles the OAuth handshake only; the resulting profile is posted to
  `/auth/google` on the Fable API, which issues the JWT that the rest of the
  app actually uses for authorization.
