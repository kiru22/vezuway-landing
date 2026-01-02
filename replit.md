# Overview

Vezuway is a logistics and transportation platform connecting cargo senders with drivers for Ukraine-EU deliveries. The application features a dual-sided marketplace with separate user experiences for senders (shipping packages) and transporters (offering delivery services). Built as a modern full-stack web application with a landing page focused on early user registration and waitlist management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Library**: Shadcn/ui component system with Radix UI primitives, providing a comprehensive set of pre-built, accessible components styled with Tailwind CSS.

**Styling**: Tailwind CSS v4 with custom theme configuration including brand colors (Vezuway blue/green palette). Uses two Google Fonts: Inter for UI elements and Unbounded for display/headings to create a futuristic feel.

**Routing**: Wouter for lightweight client-side routing.

**State Management**: TanStack Query (React Query) for server state management, form handling with React Hook Form, and Zod for schema validation.

**Animation**: Canvas Confetti for celebration effects (registration success).

**Project Structure**:
- `/client/src/pages` - Page components (Home, NotFound)
- `/client/src/components` - Reusable components including role-specific sections (Hero, HeroTransport, Features, FeaturesTransport, etc.)
- `/client/src/components/ui` - Shadcn UI component library
- `/client/src/lib` - Utilities and query client configuration
- `/client/src/hooks` - Custom React hooks

**Key Design Decisions**: 
- Dual role presentation: Single page with toggle between "sender" and "transporter" views, showing different hero sections, features, and CTAs based on user role
- Registration modal collects email and user type (sender/transporter) for waitlist
- Responsive design with mobile-first approach
- Heavy use of gradient effects, blur backgrounds, and animated elements for modern aesthetic

## Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**Development vs Production**: Separate entry points (`index-dev.ts` uses Vite middleware for HMR, `index-prod.ts` serves static built files).

**API Design**: RESTful endpoints under `/api` prefix:
- `POST /api/register` - Create registration entry
- `GET /api/registrations` - Retrieve all registrations
- `GET /api/visitors` - Retrieve all visitors (analytics)

**Request Handling**: JSON body parsing with raw body preservation for potential webhook integration.

**Logging**: Custom logging middleware tracks API request timing and responses.

**Project Structure**:
- `/server/app.ts` - Express app configuration and middleware setup
- `/server/routes.ts` - API route definitions
- `/server/storage.ts` - Data access layer with interface-based design (IStorage)
- `/server/db.ts` - Database connection setup

**Key Design Decisions**:
- Separation of concerns with storage interface allowing for future implementation swaps
- Currently uses hybrid approach: MemStorage for users, Drizzle ORM for registrations/visitors
- Environment-specific server setup for optimal DX in development and performance in production

## Data Layer

**ORM**: Drizzle ORM with PostgreSQL dialect.

**Database Provider**: Neon serverless PostgreSQL (based on `@neondatabase/serverless` dependency).

**Schema Location**: `/shared/schema.ts` - Shared between client and server for type safety.

**Tables**:
- `users` - User authentication (id, username, password)
- `registrations` - Beta registration waitlist (id, email, type, createdAt)
- `visitors` - Analytics/tracking data (id, ip, country, device, userAgent, referrer, path, createdAt)

**Validation**: Zod schemas generated from Drizzle schemas using `drizzle-zod` for runtime validation.

**Migrations**: Drizzle Kit configured to output migrations to `/migrations` directory with `db:push` npm script for schema synchronization.

**Key Design Decisions**:
- Schema-first approach with TypeScript types inferred from database schema
- Separation of insert and select types for proper handling of auto-generated fields
- Use of `gen_random_uuid()` for primary keys instead of auto-incrementing integers

## Build & Deployment

**Build Process**: 
- Client: Vite builds React app to `/dist/public`
- Server: esbuild bundles server code to `/dist/index.js` as ESM module

**Development**: Concurrent development with Vite dev server proxying API requests to Express.

**Environment Variables**: `DATABASE_URL` required for database connection.

**Static Assets**: Custom Vite plugin (`vite-plugin-meta-images`) updates OpenGraph meta tags with correct deployment URL for social media sharing.

**Replit Integration**: Conditional loading of Replit-specific Vite plugins (cartographer, dev banner, runtime error modal) only in development on Replit environment.

# External Dependencies

## Third-Party Services

**Database**: Neon Serverless PostgreSQL - Managed PostgreSQL database with HTTP-based connection pooling optimized for serverless environments.

## Key Libraries

**UI Components**: 
- Radix UI primitives (25+ component packages) - Unstyled, accessible component primitives
- Shadcn/ui - Pre-styled component system built on Radix UI
- Lucide React - Icon library

**Styling**:
- Tailwind CSS v4 - Utility-first CSS framework
- class-variance-authority - Type-safe component variant management
- tailwindcss-animate - Animation utilities

**Forms & Validation**:
- React Hook Form - Form state management
- Zod - Schema validation
- @hookform/resolvers - Integration layer

**Data Fetching**:
- TanStack Query - Server state management
- Drizzle ORM - Type-safe SQL query builder

**Development Tools**:
- Vite - Build tool and dev server
- TypeScript - Type safety across full stack
- ESBuild - Server bundling for production
- Drizzle Kit - Database migration toolkit

**Routing**: Wouter - Lightweight client-side routing (~1.5kb)

**Effects**: Canvas Confetti - Celebration animations for user interactions