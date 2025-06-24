# BookIT 🏠

A comprehensive rental property platform built with Next.js 15, designed to revolutionize property booking in India. Similar to Airbnb but tailored for the Indian market with advanced features for both property owners and travelers.

> **⚠️ Development Status**: This project is currently under active development. New features are being continuously added and existing functionality is being enhanced. Please check the [Ongoing Features](#-ongoing-features) section for upcoming improvements.

## 🌟 Key Features

### 🏡 **Property Management**
- **Advanced Property Listings**: Comprehensive property profiles with multiple images
- **Smart Search & Filters**: Location, price range, amenities, property type, and more
- **Property Verification System**: Verified badge system for trusted properties
- **Multi-Image Gallery**: Showcase properties with multiple high-quality images
- **Real-time Availability**: Dynamic booking calendar and availability tracking
- **Property Analytics**: Revenue tracking and booking insights for owners
- **User Property Dashboard**: Dedicated management interface for property owners

### 📅 **Enhanced Booking System**
- **Flexible Rental Periods**: Book for 1 day, weeks, or custom durations
- **Smart Date Selection**: Intelligent calendar with availability checking
- **Guest Management**: Support for multiple guests with pricing calculations
- **Comprehensive Booking Management**: Complete booking history with advanced status tracking
- **Booked Properties Dashboard**: Dedicated page showing all user bookings with status indicators
- **Empty State Handling**: Elegant UI for users
- **Unauthorized Access Protection**: Secure access control with informative messaging
- **Payment Integration**: Secure Razorpay payment processing
- **Booking Confirmation**: Automated confirmation and notification system

### ⭐ **Advanced Reviews & Ratings System**
- **Modular Review Architecture**: Componentized review system for maintainability
- **Comprehensive Review Form**: Interactive 5-star rating with guided submission
- **Property Summary Integration**: Contextual property details during review creation
- **Review Guidelines Component**: Smart tips and validation for quality reviews
- **Booking Summary Display**: Complete booking context during review submission
- **Verified Reviews**: Only completed bookings can write reviews
- **Duplicate Prevention**: Advanced validation to prevent multiple reviews
- **Review Success Flow**: Dedicated success page with confirmation
- **Review Management Dashboard**: Personal review history and management
- **Property Rating Analytics**: Aggregate ratings and review statistics

### 👤 **Enhanced User Experience**
- **Modern Dashboard**: Comprehensive user profiles with booking analytics and property management
- **Booked Properties Interface**: Dedicated dashboard for viewing and managing all bookings
- **Empty State Management**: Beautiful empty states for users with no content
- **Unauthorized Access Handling**: Secure and informative access control
- **Dark/Light Mode**: Full theme switching support with system preference detection
- **Mobile Responsive**: Optimized for all device sizes with touch-friendly interactions
- **Advanced Authentication**: Google OAuth and email/password authentication
- **Comprehensive Profile Management**: Complete user profile customization with avatar support
- **Navigation Enhancement**: Intuitive navigation with breadcrumbs and state indicators

### 🛡️ **Security & Trust**
- **Secure Payments**: PCI-compliant payment processing with Razorpay
- **Data Protection**: Encrypted user data and secure session management
- **Trust & Safety**: Property verification and user review systems

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15**: Latest React framework with App Router and Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS 4**: Modern utility-first CSS framework with dark mode
- **React Icons**: Comprehensive icon library

### **Backend & Database**
- **PostgreSQL**: Robust relational database for production
- **Prisma ORM**: Type-safe database access with advanced querying
- **NextAuth.js v4**: Complete authentication solution
- **API Routes**: RESTful API with Next.js API routes

### **External Services**
- **Razorpay**: Secure payment processing for Indian market
- **ImageKit**: Advanced image optimization and CDN delivery
- **Google OAuth**: Social authentication integration

### **Development Tools**
- **ESLint**: Code quality and consistency
- **Turbopack**: Ultra-fast bundler for development
- **Recharts**: Beautiful data visualization
- **PNPM**: Efficient package management
- **Zustand**: Lightweight state management for React applications
- **Arcjet**: Advanced email validation and security protection

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **PostgreSQL** - Database for production use
- **Razorpay Account** - For payment processing in India
- **ImageKit Account** - For optimized image management 
- **Google Cloud Console** - For OAuth authentication

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Shivam5551/Rental-Application
cd next-app
```

2. **Install dependencies:**
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Environment Setup:**
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookit_db"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Razorpay (Indian Payment Gateway)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# ImageKit (Optional - for optimized image handling)
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-imagekit-id"
IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"
```

### Database Setup

4. **Initialize the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
pnpm seed
# or npm run seed
```

### Development

5. **Start the development server:**
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
pnpm build
pnpm start
```

## 📊 Database Schema

The application uses a comprehensive PostgreSQL database schema with the following models:

### **Core Models**
- **User**: User profiles with authentication and provider information
- **Property**: Comprehensive property listings with amenities and verification
- **PropertyImage**: Multiple image support for properties with ImageKit integration
- **Booking**: Advanced date-based booking system with status tracking and pricing calculations
- **Payment**: Razorpay integration with comprehensive payment status tracking
- **Review**: Enhanced 5-star rating system with comment validation and booking verification
- **Inquiry**: User-property communication system
- **Token**: Refresh token management for enhanced security

### **Key Relationships & Features**
- Users can own multiple properties and make multiple bookings with comprehensive tracking
- Properties have multiple images, bookings, reviews, and inquiries with advanced indexing
- Bookings are linked to users, properties, and payments with status management
- Reviews are created by users for properties (only after completed stays) with duplicate prevention
- Advanced database indexing for optimized query performance
- Comprehensive audit trails for booking and review activities

## 🎯 Feature Implementation

### **Advanced Authentication System**
- **Multi-Provider Support**: Google OAuth and email/password authentication
- **Session Management**: Secure session handling with NextAuth.js
- **Role-Based Access**: Property owners vs. renters with different permissions
- **Profile Management**: Complete user profile customization and verification
- **Unauthorized Access Handling**: Elegant error states for protected routes

### **Smart Property Management**
- **Multi-Image Upload**: ImageKit integration for optimized image handling
- **Advanced Filtering**: Location, price, amenities, property type filtering
- **Verification System**: Property verification for enhanced trust
- **Real-time Availability**: Dynamic booking calendar integration
- **Property Analytics**: Revenue tracking and booking insights
- **User Property Dashboard**: Dedicated interface for property owners

### **Enhanced Booking System Architecture**
- **Intelligent Date Selection**: Conflict-free booking with availability checking
- **Dynamic Pricing**: Automatic price calculation with discounts
- **Guest Management**: Multi-guest booking support
- **Payment Processing**: Secure Razorpay integration with order management
- **Advanced Booking States**: Pending, confirmed, completed, and cancelled states
- **Booked Properties Management**: Comprehensive dashboard for viewing all user bookings
- **Empty State Design**: Beautiful UI for users
- **Status Tracking**: Real-time booking status updates and notifications

### **Modular Review System Architecture**
- **Component-Based Design**: Modular review components for maintainability
  - `AddReviewForm`: Interactive star rating with validation
  - `PropertySummaryForReview`: Contextual property information
  - `ReviewGuidelines`: Smart review writing assistance
  - `BookingSummary`: Complete booking context display
  - `ReviewSuccess`: Dedicated success confirmation page
- **Verified Review Flow**: Only completed bookings can submit reviews
- **Duplicate Prevention**: Advanced validation to prevent multiple reviews per booking
- **API Integration**: RESTful review submission with comprehensive validation
- **Success Flow Management**: Guided user experience from submission to confirmation
- **Review Management Dashboard**: Personal review history and editing capabilities

### **Modern UI/UX Architecture**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Complete theme switching with system preference detection
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: Comprehensive error states with recovery options
- **Empty State Management**: Beautiful empty states across all features
- **Component Modularity**: Reusable components for consistent user experience

### **Performance & Security**
- **Image Optimization**: Automatic image compression and CDN delivery
- **Database Optimization**: Efficient queries with Prisma ORM and improve performance by indexing relative attribuites in database models.
- **Security Headers**: XSS protection and secure headers
- **Input Validation**: Client and server-side validation
- **Payment Security**: PCI-compliant payment processing

## 📝 Available Scripts

```bash
# Development
pnpm dev                # Start development server with Turbopack
pnpm build             # Build for production
pnpm start             # Start production server
pnpm lint              # Run ESLint for code quality

# Database
pnpm seed              # Seed database with sample data
npx prisma studio      # Open Prisma Studio for database management
npx prisma migrate dev # Create and apply new migrations
npx prisma generate    # Generate Prisma client
```

## 🌟 Project Highlights

### **What Makes BookIT Special**

- **🚀 Modern Architecture**: Built with the latest Next.js 15 and React 19 features
- **📱 Mobile-First**: Optimized for mobile usage 
- **🔒 Security-First**: Comprehensive security measures and payment protection
- **⚡ Performance**: Optimized for fast loading even on slower connections
- **🌙 Accessibility**: Dark mode and accessibility features for all users
- **🧩 Modular Design**: Component-based architecture for scalability and maintainability
- **🎯 User-Centric**: Enhanced empty states and error handling for better UX

### **Advanced Features**

- **Smart Search**: AI-powered search with location intelligence
- **Dynamic Pricing**: Real-time price calculations with market insights
- **Modular Review System**: Component-based review architecture with guided submission
- **Enhanced Booking Management**: Comprehensive dashboard with status tracking
- **Multi-Language Ready**: Prepared for localization and regional language support
- **Payment Flexibility**: Multiple payment options including Pay Later
- **Verification System**: Multi-level property and user verification
- **Empty State Excellence**: Beautiful UI for all empty states across the platform

## 🚧 Ongoing Features

*Currently under development - These features are being actively worked on and will be available in upcoming releases:*

- **🔄 Refund System**: Comprehensive refund processing and management for cancelled bookings
- **🔑 Database Token Management**: Automatic database refresh and token renewal system for enhanced security
- **📞 Property Enquiry System**: Direct communication channel between property owners and potential renters
- **📅 Dynamic Booking Calendar**: Advanced calendar with real-time availability updates and booking conflicts resolution
- **📊 Enhanced Dashboard Analytics**: Advanced charts and data visualization for booking trends, revenue analytics, and property performance metrics
- **🎯 State Management Integration**: Implementation of Zustand for centralized state management
- **📧 Automated Email Notifications**: Queue-based email system for booking confirmations
- **🛡️ Advanced Email Validation**: Integration with Arcjet for enhanced email security and validation


**Built with ❤️ for the Indian rental market**
