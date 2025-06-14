# BookIT 🏠

A modern rental property platform built with Next.js, similar to Airbnb, where users can rent properties for short-term stays (1 day, 2 days, 1 week, etc.).

## Features ✨

- **Property Listings**: Browse and search available rental properties
- **Flexible Rental Periods**: Rent properties for 1 day, 2 days, 1 week, or custom durations
- **User Authentication**: Secure login with NextAuth.js (Google OAuth & Email)
- **Payment Integration**: Seamless payments with Razorpay
- **Image Upload**: Optimized image uploads with ImageKit integration
- **Property Management**: Property owners can list and manage their properties
- **Booking System**: Complete booking workflow with date selection
- **Reviews & Ratings**: Users can rate and review properties
- **Responsive Design**: Modern UI with Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM

## Tech Stack 🛠️

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js v4
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Razorpay Integration
- **Image Management**: ImageKit for optimized image uploads and transformations
- **Charts**: Recharts for analytics
- **Icons**: React Icons
- **Development**: ESLint, TypeScript

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Razorpay account for payments
- ImageKit account for image management

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd next-app
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bookit_db"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# ImageKit Configuration (Optional - for optimized image handling)
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-imagekit-id"
IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"
```

### ImageKit Setup (Optional)

For optimized image uploads and transformations:

1. Create an account at [ImageKit.io](https://imagekit.io/)
2. Get your ImageKit credentials from the dashboard
3. Add the ImageKit environment variables to your `.env.local`


**ImageKit Benefits:**
- Automatic image optimization and compression
- Real-time image transformations
- CDN delivery for faster loading
- Support for multiple image formats

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Schema 📊

The application uses a comprehensive database schema with the following main models:

- **User**: User profiles with authentication
- **Property**: Rental property listings
- **Booking**: Property bookings with date ranges
- **Payment**: Razorpay payment records
- **Review**: Property reviews and ratings
- **Inquiry**: User inquiries about properties

## Key Features Implementation 🔧

### Authentication
- Google OAuth integration
- Email/password authentication
- Session management with NextAuth.js

### Payment Processing
- Razorpay integration for secure payments
- Order creation and payment verification
- Payment status tracking

### Property Management
- Property listing with images
- Availability calendar
- Price management with discounts
- Pet-friendly options

### Booking System
- Date range selection
- Price calculation
- Booking confirmation
- Payment processing

## Scripts 📝

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality
