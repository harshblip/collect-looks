<div align="center">
  
<img src="/public/github-logo.png" alt="looks Image" width="600" height="300">

</div>
<h3 align="center"> face card of collect </h3>

<p align="center">
     <img src = "https://img.shields.io/badge/next-000000?style=for-the-badge&logo=next.js&logoColor=white" />
     <img src = "https://img.shields.io/badge/redux-5849BE?style=for-the-badge&logo=redux&logoColor=white" />
     <img src = "https://img.shields.io/badge/framer_motion-ffca28?style=for-the-badge&logo=framer&logoColor=%23ffffff&color=%237178f6" />
     <img src = "https://img.shields.io/badge/TanStack_Query-160440?style=for-the-badge&logo=react-query" />
     <img src = "https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" />
 </p>

## 🧠 Collect – Frontend
A best-in-class frontend crafted with clean, elegant UI, industry-level best practices, and optimized workflows that make every interaction seamless.

## Features
- **Structured Architecture** 🏗️🧩 - separating data fetch and display into presentation, bussiness layer and data access layer enhancing maintainability, scalability, and flexibility
- **Tanstack query for data management** 📦🗂️ - utilizing `@tanstack` for server-state management, caching, hydration, and query invalidation.
- **Best in class UI** 🎨✨ - consistent typography, spacing, and state-driven UI transitions creating the best hand-made ui which is not copied from any dribbble
- **Optimizations** ⚡🛠️- which goes unnoticed most of the time but values the most - **pagination**, **memoization**, **prefetching queries**

## Implementation details

<img src = '/public/architecture.png' alt='architecture diagram' />

### Presentation–Logic–Data Layering 🧩
- used this technique to separate the component logic from hooks from standard server api calling. 
- separating layer-by-layer with their specific concerns. 
- in case if i have to add any feature if its any `new api -> api layer`. a `new component -> component layer` wihtout breaking or tweaking unncessary part of code
- ultra helpful in debugging. separated by concerns debug ezzzz

### Tanstack query 🗂️
 - Instead of re-fetching data every time (because who loves wasted network calls?), TanStack Query just caches it — so the app feels lightning ⚡ fast without you even trying 🤫.
 - When data changes, it refetches ♻ magically — no need to write boring useEffect logic like a mid dev
 - Data gets loaded before the user even asks for it (prefetching). Like serving whole food with a glass of water before mummy comes in and raids 🎐


### Best-in-class glossy ui
- the ui is handmade completely but truly inspired from google drive. (*what'll be the best place to inspire from than a cloud service itself*)
- the ui is well-thought, smooth, creative and ultra classy which may seem like one of series A funded startups itself
- (i am pretty great in designing too. open for design work too heheh 🎨)
- well loaded with necessary loaders, information indicators for navigation, perfect contrast ccolors for text visibility

|      Login       |         Dashboard Page      |
| :---------------------: | :----------------------: |
| <img src='/public/demo/login-page.png'> | <img src='/public/demo/dashboard.png'> |


|      account info       |         account storage      |
| :---------------------: | :----------------------: |
| <img src='/public/demo/account-info.png'> | <img src='/public/demo/account-storage.png'> |

|      create folder       |         empty page      |
| :---------------------: | :----------------------: |
| <img src='/public/demo/create-folder.png'> | <img src='/public/demo/empty-page.png'> |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Next js

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
