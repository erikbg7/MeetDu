# MeetDu ⚡ - Strenghten Our Community

¿Te imaginas una forma divertida y rápida de conectar con más desarrolladores de la comunidad de Midu?

🚀 MeetDu es un pequeño experimento, casi un mini-juego, con una misión clara:

**💡 Fortalecer los lazos entre nosotros y ayudarnos a crecer en GitHub. 💡**

## Description

El funcionamiento es sencillo:

- Cada vez que sigas a un usuario de la comunidad, ganarás _Karma_ ⚡.
- Cuando un usuario te siga, perderás _Karma_ ⚡.

Cuanto más _Karma_ tengas, más fácil será que otros usuarios te sigan a ti. Ya que la aplicación va a mostrarte siempre una lista con los 8 usuarios con más _Karma_ en ese momento

## Features

- 🔐 Sistema de autenticación y gestión de usuarios utilizando Clerk.
- 👀 Integración con GitHub para descubrir y seguir otros desarrolladores de la comunidad.
- 🗄️ Base de datos PostgreSQL para almacenar información pública y el karma del usuario.
- 🔔 Notificaciones en tiempo real utilizando Supabase para mantener a los usuarios actualizados sobre sus seguidores y actividad.

## Demo

## Capturas

## Clerk

En MeetDu, la autenticación no es un detalle más… ¡es el núcleo de la app!  
Hemos construido toda la experiencia alrededor de **GitHub OAuth**, utilizando **Clerk** como proveedor de autenticación. 🔐

Esto no es una app genérica con múltiples métodos de login:  
👉 **Solo puedes acceder con tu cuenta de GitHub**.  
¿Por qué? Porque nuestro objetivo es claro:  
**Fortalecer la comunidad dev y crecer en GitHub**

---

### 🧩 Componentes de React

Aprovechamos varios componentes que Clerk ofrece para construir una experiencia de usuario fluida:

- **`<ClerkProvider />`**
- **`<SignedIn />` y `<SignedOut />`**
- **`<SignInButton />` y `<SignUpButton />`**
- **`<UserButton />`**

### ⚛️ Hooks de React

Para obtener datos del usuario autenticado en el cliente, utilizamos:

- **`useUser()`**

### 🔐 Server side utils

- **`clerkMiddleware` + `createRouteMatcher()`**
- **`clerkClient` y `currentUser`**

💡 Gracias a Clerk, implementamos una solución de autenticación completa y profesional sin complicaciones, permitiendo centrarnos en lo que realmente importa: **¡hacer comunidad entre desarrolladores!** 🧑‍💻🚀

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- [Clerk](https://clerk.dev/) - Authentication and user management for Next.js apps
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative. Database, Authentication, Storage, and Realtime.
- [Vercel](https://vercel.com/) - The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of push.
