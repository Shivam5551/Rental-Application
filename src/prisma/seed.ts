
import { PrismaClient } from "./generated/prisma-client-js/client.js";
import { hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();


// Sample data arrays
const users = [
  {
    email: "alice@gmail.com",
    password: hashSync("Alice12345", 10),
    name: "Alice Johnson",
    provider: "Email" as const,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    email: "bob@gmail.com",
    password: hashSync("Bob12345", 10),
    name: "Bob Smith",
    provider: "Email" as const,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    email: "charlie@gmail.com",
    password: hashSync("Charlie12345", 10),
    name: "Charlie Brown",
    provider: "Email" as const,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    email: "diana@gmail.com",
    password: hashSync("Diana12345", 10),
    name: "Diana Wilson",
    provider: "Email" as const,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    email: "emma@gmail.com",
    password: hashSync("Emma12345", 10),
    name: "Emma Davis",
    provider: "Email" as const,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const properties = [
  {
    title: "Luxury Beachfront Villa in Goa",
    description: "Stunning 4-bedroom villa with private beach access, infinity pool, and breathtaking ocean views. Perfect for families and groups looking for an unforgettable getaway.",
    price: 15000,
    discount: 2000,
    location: "Goa",
    verified: true,
    petfriendly: true,
    area: 2500,
    beds: 4,
    baths: 3,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
  },
  {
    title: "Modern Apartment in Mumbai Central",
    description: "Contemporary 2-bedroom apartment in the heart of Mumbai with city skyline views, modern amenities, and excellent connectivity to business districts.",
    price: 8000,
    discount: 1000,
    location: "Mumbai",
    verified: true,
    petfriendly: false,
    area: 1200,
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
  },
  {
    title: "Heritage Haveli in Old Delhi",
    description: "Experience royal living in this restored 18th-century haveli featuring traditional architecture, courtyards, and modern comforts in the historic heart of Delhi.",
    price: 12000,
    discount: 0,
    location: "Delhi",
    verified: true,
    petfriendly: true,
    area: 3000,
    beds: 5,
    baths: 4,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
  },
  {
    title: "Tech Hub Condo in Bangalore",
    description: "Ultra-modern 3-bedroom condo in Electronic City with high-speed internet, workspace, gym, and rooftop garden. Ideal for digital nomads and tech professionals.",
    price: 6000,
    discount: 500,
    location: "Bangalore",
    verified: true,
    petfriendly: true,
    area: 1500,
    beds: 3,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
  },
  {
    title: "Cozy Studio in Pune Hills",
    description: "Charming studio apartment nestled in the hills of Pune with panoramic valley views, peaceful ambiance, and close to hiking trails.",
    price: 3500,
    discount: 0,
    location: "Pune",
    verified: false,
    petfriendly: true,
    area: 600,
    beds: 1,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
  },
  {
    title: "Marina View Penthouse in Chennai",
    description: "Spectacular penthouse overlooking Marina Beach with private terrace, panoramic ocean views, and luxury amenities. Perfect for special occasions.",
    price: 20000,
    discount: 3000,
    location: "Chennai",
    verified: true,
    petfriendly: false,
    area: 3500,
    
    beds: 4,
    baths: 4,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
  },
  {
    title: "Riverside Cottage in Kerala Backwaters",
    description: "Traditional Kerala-style cottage on the backwaters with private boat dock, coconut grove, and authentic local experiences. Includes complimentary boat rides.",
    price: 7500,
    discount: 1500,
    location: "Kerala",
    verified: true,
    petfriendly: true,
    area: 1800,
    
    beds: 3,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Mountain Retreat in Shimla",
    description: "Wooden cabin in the mountains with fireplace, forest views, and proximity to snow sports. Ideal for couples and nature lovers seeking tranquility.",
    price: 5000,
    discount: 0,
    location: "Shimla",
    verified: false,
    petfriendly: false,
    area: 1000,
    
    beds: 2,
    baths: 1,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
  },
  {
    title: "Royal Palace Suite in Jaipur",
    description: "Live like royalty in this palace suite featuring ornate architecture, marble work, royal furniture, and impeccable service in the Pink City.",
    price: 25000,
    discount: 5000,
    location: "Jaipur",
    verified: true,
    petfriendly: false,
    area: 4000,
    
    beds: 6,
    baths: 5,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
  },
  {
    title: "Loft Apartment in Kolkata",
    description: "Industrial-chic loft in the cultural heart of Kolkata with exposed brick walls, high ceilings, and walking distance to art galleries and cafes.",
    price: 4500,
    discount: 0,
    location: "Kolkata",
    verified: true,
    petfriendly: true,
    area: 1100,
    
    beds: 2,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
  },
  {
    title: "Desert Camp in Rajasthan",
    description: "Luxury desert camp with traditional tents, camel safari, cultural performances, and stargazing. An authentic Rajasthani desert experience.",
    price: 9000,
    discount: 1000,
    location: "Rajasthan",
    verified: true,
    petfriendly: false,
    area: 500,
    
    beds: 1,
    baths: 1,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a00?w=800&h=600&fit=crop"
  },
  {
    title: "Beach Shack in Pondicherry",
    description: "Charming beach shack steps away from the shore with French colonial influences, yoga deck, and fresh seafood. Perfect for relaxation and rejuvenation.",
    price: 3000,
    discount: 300,
    location: "Pondicherry",
    verified: false,
    petfriendly: true,
    area: 800,
    
    beds: 1,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Luxury Houseboat in Alleppey",
    description: "Experience Kerala's famous backwaters in this luxury houseboat with all modern amenities, chef service, and traditional Kettuvallam design. Includes all meals and guided tours.",
    price: 11000,
    discount: 2000,
    location: "Kerala",
    verified: true,
    petfriendly: false,
    area: 1200,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
  },
  {
    title: "Treehouse Resort in Wayanad",
    description: "Unique treehouse experience in the Western Ghats with bird watching, spice plantation tours, and canopy dining. Eco-friendly and sustainable accommodation.",
    price: 8500,
    discount: 0,
    location: "Kerala",
    verified: true,
    petfriendly: true,
    area: 900,
    
    beds: 1,
    baths: 1,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
  },
  {
    title: "Boutique Hotel in Udaipur",
    description: "Elegant boutique hotel overlooking Lake Pichola with traditional Rajasthani architecture, rooftop restaurant, and panoramic city views. Royal hospitality guaranteed.",
    price: 16000,
    discount: 2500,
    location: "Rajasthan",
    verified: true,
    petfriendly: false,
    area: 2200,
    
    beds: 3,
    baths: 3,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop"
  },
  {
    title: "Farmstay in Punjab",
    description: "Authentic farm experience with organic vegetables, fresh dairy products, tractor rides, and traditional Punjabi hospitality. Learn about sustainable farming practices.",
    price: 4000,
    discount: 0,
    location: "Punjab",
    verified: false,
    petfriendly: true,
    area: 1500,
    
    beds: 3,
    baths: 2,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop"
  },
  {
    title: "Ski Chalet in Manali",
    description: "Cozy mountain chalet near Solang Valley with skiing access, hot tub, fireplace, and stunning Himalayan views. Perfect for adventure enthusiasts and winter sports.",
    price: 7000,
    discount: 1000,
    location: "Himachal Pradesh",
    verified: true,
    petfriendly: true,
    area: 1300,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Business Hotel in Hyderabad",
    description: "Modern business hotel in HITEC City with conference facilities, high-speed internet, fitness center, and easy access to IT companies. Ideal for corporate travelers.",
    price: 5500,
    discount: 500,
    location: "Hyderabad",
    verified: true,
    petfriendly: false,
    area: 800,
    
    beds: 1,
    baths: 1,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
  },
  {
    title: "Heritage Haveli in Jodhpur",
    description: "Magnificent blue city haveli with intricate carvings, traditional courtyards, cultural performances, and authentic Rajasthani cuisine. Step back in time to royal era.",
    price: 13500,
    discount: 1500,
    location: "Rajasthan",
    verified: true,
    petfriendly: false,
    area: 2800,
    
    beds: 4,
    baths: 3,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
  },
  {
    title: "Ashram Retreat in Rishikesh",
    description: "Peaceful spiritual retreat on the banks of Ganges with yoga classes, meditation sessions, vegetarian meals, and Ayurvedic treatments. Digital detox guaranteed.",
    price: 2500,
    discount: 0,
    location: "Uttarakhand",
    verified: false,
    petfriendly: false,
    area: 400,
    
    beds: 1,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Beach Resort in Andaman",
    description: "Tropical paradise resort on pristine white sand beach with water sports, scuba diving, coral reef tours, and overwater bungalows. Perfect for honeymooners.",
    price: 18000,
    discount: 3000,
    location: "Andaman",
    verified: true,
    petfriendly: false,
    area: 1800,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Tea Plantation Bungalow in Darjeeling",
    description: "Colonial-era tea plantation bungalow with panoramic mountain views, tea tasting sessions, guided plantation walks, and traditional British charm.",
    price: 6500,
    discount: 500,
    location: "West Bengal",
    verified: true,
    petfriendly: true,
    area: 1600,
    
    beds: 3,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop"
  },
  {
    title: "Luxury Tents in Ladakh",
    description: "High-altitude glamping experience with heated tents, oxygen supply, stargazing tours, and incredible views of snow-capped peaks. Adventure of a lifetime.",
    price: 12000,
    discount: 0,
    location: "Ladakh",
    verified: true,
    petfriendly: false,
    area: 600,
    
    beds: 1,
    baths: 1,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Beachfront Cottage in Gokarna",
    description: "Rustic beachfront cottage steps from pristine Om Beach with surfing lessons, beach volleyball, bonfire nights, and fresh seafood. Backpacker's paradise.",
    price: 2800,
    discount: 200,
    location: "Karnataka",
    verified: false,
    petfriendly: true,
    area: 700,
    
    beds: 1,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Wildlife Lodge in Jim Corbett",
    description: "Jungle lodge near Corbett National Park with safari tours, bird watching, nature walks, and wildlife photography sessions. Spot tigers and elephants.",
    price: 9500,
    discount: 1500,
    location: "Uttarakhand",
    verified: true,
    petfriendly: false,
    area: 1400,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Houseboat in Kashmir",
    description: "Traditional Kashmiri houseboat on Dal Lake with shikara rides, floating market visits, Mughal garden tours, and authentic Wazwan cuisine. Paradise on earth.",
    price: 10000,
    discount: 2000,
    location: "Kashmir",
    verified: true,
    petfriendly: false,
    area: 1100,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Homestay in Coorg",
    description: "Family-run coffee plantation homestay with plantation tours, coffee tasting, home-cooked meals, and waterfall treks. Experience local Kodava culture.",
    price: 4500,
    discount: 0,
    location: "Karnataka",
    verified: false,
    petfriendly: true,
    area: 1000,
    
    beds: 2,
    baths: 1,
    firesafety: false,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Palace Hotel in Mysore",
    description: "Regal palace hotel with opulent rooms, royal dining, heritage walks, and proximity to Mysore Palace. Experience the grandeur of erstwhile Mysore kingdom.",
    price: 14000,
    discount: 1000,
    location: "Karnataka",
    verified: true,
    petfriendly: false,
    area: 2500,
    
    beds: 3,
    baths: 3,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Eco Resort in Munnar",
    description: "Sustainable eco-resort in tea gardens with solar power, rainwater harvesting, organic farming, and nature conservation programs. Green luxury at its best.",
    price: 7500,
    discount: 750,
    location: "Kerala",
    verified: true,
    petfriendly: true,
    area: 1200,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Desert Resort in Jaisalmer",
    description: "Luxury desert resort with camel safari, folk dance performances, stargazing sessions, and traditional Rajasthani architecture. Golden city's finest accommodation.",
    price: 11500,
    discount: 1500,
    location: "Rajasthan",
    verified: true,
    petfriendly: false,
    area: 1600,
    
    beds: 2,
    baths: 2,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Coastal Villa in Alibaug",
    description: "Modern coastal villa with private beach access, infinity pool, water sports, and Mumbai proximity. Perfect weekend getaway for city dwellers.",
    price: 13000,
    discount: 0,
    location: "Maharashtra",
    verified: true,
    petfriendly: true,
    area: 2000,
    
    beds: 3,
    baths: 3,
    firesafety: true,
    showcaseimage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  }
];

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.token.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log("👥 Creating users...");
  const createdUsers = [];
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData
    });
    createdUsers.push(user);
  }

  // Create properties
  console.log("🏠 Creating properties...");
  const createdProperties = [];
  for (let i = 0; i < properties.length; i++) {
    const propertyData = properties[i];
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    
    const property = await prisma.property.create({
      data: {
        ...propertyData,
        userId: randomUser.id
      }
    });
    createdProperties.push(property);

    // Add additional images for some properties
    if (i % 3 === 0) {
      await prisma.propertyImage.createMany({
        data: [
          {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            propertyId: property.id
          },
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            propertyId: property.id
          }
        ]
      });
    }
  }

  // Create bookings
  console.log("📅 Creating bookings...");
  const bookings = [];
  for (let i = 0; i < 15; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const randomProperty = createdProperties[Math.floor(Math.random() * createdProperties.length)];
    
    // Ensure user doesn't book their own property
    if (randomUser.id === randomProperty.userId) continue;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
    
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = (randomProperty.price - randomProperty.discount) * nights;

    const booking = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        totalPrice,
        userId: randomUser.id,
        propertyId: randomProperty.id
      }
    });
    bookings.push(booking);
  }

  // Create payments
  console.log("💳 Creating payments...");
  for (const booking of bookings) {
    const paymentStatuses = ["COMPLETED", "COMPLETED", "COMPLETED", "PENDING", "FAILED"];
    const randomStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

    await prisma.payment.create({
      data: {
        amount: booking.totalPrice,
        currency: "INR",
        status: randomStatus as "COMPLETED" | "PENDING" | "FAILED",
        razorpayOrderId: `order_${Math.random().toString(36)}`,
        razorpayPaymentId: randomStatus === "COMPLETED" ? `pay_${Math.random().toString(36)}` : "",
        razorpaySignature: randomStatus === "COMPLETED" ? `sig_${Math.random().toString(36)}` : "",
        userId: booking.userId,
        bookingId: booking.id
      }
    });
  }

  // Create reviews
  console.log("⭐ Creating reviews...");
  const reviewComments = [
    "Amazing stay! The property exceeded all expectations. Beautiful location and excellent host.",
    "Great place, very clean and comfortable. Would definitely recommend to others.",
    "Lovely property with stunning views. The host was very responsive and helpful.",
    "Perfect for a weekend getaway. Everything was as described and more!",
    "Beautiful place but had some minor issues with WiFi. Overall a good experience.",
    "Absolutely fantastic! The photos don't do justice to how beautiful this place is.",
    "Good value for money. Clean, comfortable, and well-located.",
    "Outstanding property with top-notch amenities. Five stars!",
    "Nice place but could use some updates. Still enjoyed our stay.",
    "Wonderful host and beautiful property. Highly recommended!",
    "Peaceful location and great for families. Kids loved the space.",
    "Modern amenities and stylish decor. Perfect for business travelers.",
    "Cozy and charming property. Felt like home away from home.",
    "Great location but property needs maintenance. Average experience.",
    "Exceptional service and beautiful surroundings. Will definitely return!"
  ];

  for (let i = 0; i < 40; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const randomProperty = createdProperties[Math.floor(Math.random() * createdProperties.length)];
    
    // Ensure user doesn't review their own property
    if (randomUser.id === randomProperty.userId) continue;

    const rating = Math.floor(Math.random() * 2) + 3;
    const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];

    await prisma.review.create({
      data: {
        rating,
        comment,
        userId: randomUser.id,
        propertyId: randomProperty.id
      }
    });
  }

  // Create inquiries
  console.log("💬 Creating inquiries...");
  const inquiryMessages = [
    "Hi, I'm interested in booking this property for next month. Is it available?",
    "Could you please provide more details about the amenities?",
    "Is parking available? I'll be traveling with a car.",
    "What's the cancellation policy for this property?",
    "Are pets allowed? I have a small dog.",
    "Is the property suitable for elderly guests?",
    "Can you arrange airport pickup service?",
    "What's included in the price? Are utilities extra?",
    "Is there a minimum stay requirement?",
    "Do you offer any discounts for longer stays?"
  ];

  for (let i = 0; i < 25; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const randomProperty = createdProperties[Math.floor(Math.random() * createdProperties.length)];
    const randomMessage = inquiryMessages[Math.floor(Math.random() * inquiryMessages.length)];

    await prisma.inquiry.create({
      data: {
        message: randomMessage,
        userId: randomUser.id,
        propertyId: randomProperty.id
      }
    });
  }

  console.log("✅ Database seeding completed successfully!");
  console.log(`Created:
    👥 ${createdUsers.length} users
    🏠 ${createdProperties.length} properties
    📅 ${bookings.length} bookings
    💳 ${bookings.length} payments
    ⭐ 40 reviews
    💬 25 inquiries`);
}

main()
  .then(async () => {
    console.log("🎉 Data Seeded Successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });