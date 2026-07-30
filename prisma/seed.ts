import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma-client-js/client.js";
import { hashSync } from "bcrypt-ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({
    adapter,
});

//GITHUB AGENT GENERATED
const users = [
    {
        email: "alice@gmail.com",
        password: hashSync("AliceSecure123", 10),
        name: "Alice Johnson",
        provider: "Email" as const,
        image: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        bankaccountnumber: "1234567890123456",
        bankifscnumber: "HDFC0000123",
    },
    {
        email: "bob@gmail.com",
        password: hashSync("BobSecure123", 10),
        name: "Bob Smith",
        provider: "Email" as const,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bankaccountnumber: "2345678901234567",
        bankifscnumber: "ICICI000456",
    },
    {
        email: "charlie@gmail.com",
        password: hashSync("CharlieSecure123", 10),
        name: "Charlie Brown",
        provider: "Email" as const,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bankaccountnumber: "3456789012345678",
        bankifscnumber: "AXIS0000789",
    },
    {
        email: "diana@gmail.com",
        password: hashSync("DianaSecure123", 10),
        name: "Diana Wilson",
        provider: "Email" as const,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bankaccountnumber: "4567890123456789",
        bankifscnumber: "SBI0000012",
    },
    {
        email: "emma@gmail.com",
        password: hashSync("EmmaSecure123", 10),
        name: "Emma Davis",
        provider: "Email" as const,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        bankaccountnumber: "5678901234567890",
        bankifscnumber: "PNB0000345",
    },
    {
        email: "frank@gmail.com",
        password: hashSync("FrankSecure123", 10),
        name: "Frank Miller",
        provider: "Email" as const,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        bankaccountnumber: "6789012345678901",
        bankifscnumber: "BOB0000678",
    },
];

const properties = [
    {
        title: "Luxury Beachfront Villa in Goa",
        description:
            "Stunning 4-bedroom villa with private beach access, infinity pool, and breathtaking ocean views. Perfect for families and groups looking for an unforgettable getaway.",
        price: 1500000,
        discount: 2000,
        address: "Calangute Beach Road, Calangute",
        city: "Calangute",
        state: "Goa",
        country: "India",
        postalCode: "403516",
        latitude: 15.5527,
        longitude: 73.7639,
        verified: true,
        petfriendly: true,
        area: 2500,
        beds: 4,
        baths: 3,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    },
    {
        title: "Modern Apartment in Mumbai Central",
        description:
            "Contemporary 2-bedroom apartment in the heart of Mumbai with city skyline views, modern amenities, and excellent connectivity to business districts.",
        price: 800000,
        discount: 1000,
        address: "Nariman Point",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        postalCode: "400021",
        latitude: 18.9256,
        longitude: 72.8242,
        verified: true,
        petfriendly: false,
        area: 1200,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    },
    {
        title: "Heritage Haveli in Old Delhi",
        description:
            "Experience royal living in this restored 18th-century haveli featuring traditional architecture, courtyards, and modern comforts in the historic heart of Delhi.",
        price: 120000,
        discount: 0,
        address: "Chandni Chowk",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
        postalCode: "110006",
        latitude: 28.6506,
        longitude: 77.2303,
        verified: true,
        petfriendly: true,
        area: 3000,
        beds: 5,
        baths: 4,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    },
    {
        title: "Tech Hub Condo in Bangalore",
        description:
            "Ultra-modern 3-bedroom condo in Electronic City with high-speed internet, workspace, gym, and rooftop garden. Ideal for digital nomads and tech professionals.",
        price: 600000,
        discount: 500,
        address: "Electronic City Phase 1",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        postalCode: "560100",
        latitude: 12.8452,
        longitude: 77.6602,
        verified: true,
        petfriendly: true,
        area: 1500,
        beds: 3,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
        title: "Cozy Studio in Pune Hills",
        description:
            "Charming studio apartment nestled in the hills of Pune with panoramic valley views, peaceful ambiance, and close to hiking trails.",
        price: 350000,
        discount: 0,
        address: "Sinhagad Road",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        postalCode: "411041",
        latitude: 18.4636,
        longitude: 73.8281,
        verified: false,
        petfriendly: true,
        area: 600,
        beds: 1,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    },
    {
        title: "Marina View Penthouse in Chennai",
        description:
            "Spectacular penthouse overlooking Marina Beach with private terrace, panoramic ocean views, and luxury amenities. Perfect for special occasions.",
        price: 2000000,
        discount: 3000,
        address: "Marina Beach Road",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        postalCode: "600004",
        latitude: 13.05,
        longitude: 80.2824,
        verified: true,
        petfriendly: false,
        area: 3500,
        beds: 4,
        baths: 4,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    },
    {
        title: "Riverside Cottage in Kerala Backwaters",
        description:
            "Traditional Kerala-style cottage on the backwaters with private boat dock, coconut grove, and authentic local experiences. Includes complimentary boat rides.",
        price: 750000,
        discount: 1500,
        address: "Punnamada Backwaters",
        city: "Alleppey",
        state: "Kerala",
        country: "India",
        postalCode: "688001",
        latitude: 9.4981,
        longitude: 76.3388,
        verified: true,
        petfriendly: true,
        area: 1800,
        beds: 3,
        baths: 2,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/riverside_cottage.webp",
    },
    {
        title: "Mountain Retreat in Shimla",
        description:
            "Wooden cabin in the mountains with fireplace, forest views, and proximity to snow sports. Ideal for couples and nature lovers seeking tranquility.",
        price: 500000,
        discount: 0,
        address: "Mall Road",
        city: "Shimla",
        state: "Himachal Pradesh",
        country: "India",
        postalCode: "171001",
        latitude: 31.1048,
        longitude: 77.1734,
        verified: false,
        petfriendly: false,
        area: 1000,
        beds: 2,
        baths: 1,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1640863393585-f198621cfd8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Royal Palace Suite in Jaipur",
        description:
            "Live like royalty in this palace suite featuring ornate architecture, marble work, royal furniture, and impeccable service in the Pink City.",
        price: 2500000,
        discount: 5000,
        address: "Near City Palace",
        city: "Jaipur",
        state: "Rajasthan",
        country: "India",
        postalCode: "302001",
        latitude: 26.9124,
        longitude: 75.7873,
        verified: true,
        petfriendly: false,
        area: 4000,
        beds: 6,
        baths: 5,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    },
    {
        title: "Loft Apartment in Kolkata",
        description:
            "Industrial-chic loft in the cultural heart of Kolkata with exposed brick walls, high ceilings, and walking distance to art galleries and cafes.",
        price: 450000,
        discount: 0,
        address: "Park Street",
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
        postalCode: "700016",
        latitude: 22.5535,
        longitude: 88.3512,
        verified: true,
        petfriendly: true,
        area: 1100,
        beds: 2,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    },
    {
        title: "Desert Camp in Rajasthan",
        description:
            "Luxury desert camp with traditional tents, camel safari, cultural performances, and stargazing. An authentic Rajasthani desert experience.",
        price: 900000,
        discount: 1000,
        address: "Sam Sand Dunes",
        city: "Jaisalmer",
        state: "Rajasthan",
        country: "India",
        postalCode: "345001",
        latitude: 26.9157,
        longitude: 70.9083,
        verified: true,
        petfriendly: false,
        area: 500,
        beds: 1,
        baths: 1,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/desert_camp.jpeg",
    },
    {
        title: "Beach Shack in Pondicherry",
        description:
            "Charming beach shack steps away from the shore with French colonial influences, yoga deck, and fresh seafood. Perfect for relaxation and rejuvenation.",
        price: 300000,
        discount: 300,
        address: "Promenade Beach, White Town",
        city: "Puducherry",
        state: "Puducherry",
        country: "India",
        postalCode: "605001",
        latitude: 11.9416,
        longitude: 79.8083,
        verified: false,
        petfriendly: true,
        area: 800,
        beds: 1,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1709744873177-714d7ab0fe02?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Luxury Houseboat in Alleppey",
        description:
            "Experience Kerala's famous backwaters in this luxury houseboat with all modern amenities, chef service, and traditional Kettuvallam design. Includes all meals and guided tours.",
        price: 1100000,
        discount: 2000,
        address: "Vembanad Lake",
        city: "Alleppey",
        state: "Kerala",
        country: "India",
        postalCode: "688001",
        latitude: 9.4981,
        longitude: 76.3388,
        verified: true,
        petfriendly: false,
        area: 1200,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1714302947502-2472b43f15d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Treehouse Resort in Wayanad",
        description:
            "Unique treehouse experience in the Western Ghats with bird watching, spice plantation tours, and canopy dining. Eco-friendly and sustainable accommodation.",
        price: 850000,
        discount: 0,
        address: "Vythiri",
        city: "Wayanad",
        state: "Kerala",
        country: "India",
        postalCode: "673121",
        latitude: 11.6854,
        longitude: 76.132,
        verified: true,
        petfriendly: true,
        area: 900,
        beds: 1,
        baths: 1,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1604004218771-05c55db4f9f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Boutique Hotel in Udaipur",
        description:
            "Elegant boutique hotel overlooking Lake Pichola with traditional Rajasthani architecture, rooftop restaurant, and panoramic city views. Royal hospitality guaranteed.",
        price: 1600000,
        discount: 2500,
        address: "Lake Pichola Road",
        city: "Udaipur",
        state: "Rajasthan",
        country: "India",
        postalCode: "313001",
        latitude: 24.5854,
        longitude: 73.7125,
        verified: true,
        petfriendly: false,
        area: 2200,
        beds: 3,
        baths: 3,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/boutique.jpeg",
    },
    {
        title: "Farmstay in Punjab",
        description:
            "Authentic farm experience with organic vegetables, fresh dairy products, tractor rides, and traditional Punjabi hospitality. Learn about sustainable farming practices.",
        price: 400000,
        discount: 0,
        address: "Village Road, Near GT Road",
        city: "Amritsar",
        state: "Punjab",
        country: "India",
        postalCode: "143001",
        latitude: 31.634,
        longitude: 74.8723,
        verified: false,
        petfriendly: true,
        area: 1500,
        beds: 3,
        baths: 2,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop",
    },
    {
        title: "Ski Chalet in Manali",
        description:
            "Cozy mountain chalet near Solang Valley with skiing access, hot tub, fireplace, and stunning Himalayan views. Perfect for adventure enthusiasts and winter sports.",
        price: 700000,
        discount: 1000,
        address: "Solang Valley Road",
        city: "Manali",
        state: "Himachal Pradesh",
        country: "India",
        postalCode: "175131",
        latitude: 32.2396,
        longitude: 77.1887,
        verified: true,
        petfriendly: true,
        area: 1300,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1709508496457-e2f9c42493c6?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Business Hotel in Hyderabad",
        description:
            "Modern business hotel in HITEC City with conference facilities, high-speed internet, fitness center, and easy access to IT companies. Ideal for corporate travelers.",
        price: 550000,
        discount: 500,
        address: "HITEC City",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        postalCode: "500081",
        latitude: 17.4435,
        longitude: 78.3772,
        verified: true,
        petfriendly: false,
        area: 800,
        beds: 1,
        baths: 1,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    },
    {
        title: "Heritage Haveli in Jodhpur",
        description:
            "Magnificent blue city haveli with intricate carvings, traditional courtyards, cultural performances, and authentic Rajasthani cuisine. Step back in time to royal era.",
        price: 1350000,
        discount: 1500,
        address: "Near Mehrangarh Fort",
        city: "Jodhpur",
        state: "Rajasthan",
        country: "India",
        postalCode: "342001",
        latitude: 26.2389,
        longitude: 73.0243,
        verified: true,
        petfriendly: false,
        area: 2800,
        beds: 4,
        baths: 3,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    },
    {
        title: "Ashram Retreat in Rishikesh",
        description:
            "Peaceful spiritual retreat on the banks of Ganges with yoga classes, meditation sessions, vegetarian meals, and Ayurvedic treatments. Digital detox guaranteed.",
        price: 250000,
        discount: 0,
        address: "Laxman Jhula Road",
        city: "Rishikesh",
        state: "Uttarakhand",
        country: "India",
        postalCode: "249201",
        latitude: 30.0869,
        longitude: 78.2676,
        verified: false,
        petfriendly: false,
        area: 400,
        beds: 1,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1700844192363-501b9e817987?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Beach Resort in Andaman",
        description:
            "Tropical paradise resort on pristine white sand beach with water sports, scuba diving, coral reef tours, and overwater bungalows. Perfect for honeymooners.",
        price: 1800000,
        discount: 3000,
        address: "Radhanagar Beach, Havelock Island",
        city: "Port Blair",
        state: "Andaman and Nicobar Islands",
        country: "India",
        postalCode: "744101",
        latitude: 11.6234,
        longitude: 92.7265,
        verified: true,
        petfriendly: false,
        area: 1800,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Tea Plantation Bungalow in Darjeeling",
        description:
            "Colonial-era tea plantation bungalow with panoramic mountain views, tea tasting sessions, guided plantation walks, and traditional British charm.",
        price: 650000,
        discount: 500,
        address: "Happy Valley Tea Estate",
        city: "Darjeeling",
        state: "West Bengal",
        country: "India",
        postalCode: "734101",
        latitude: 27.041,
        longitude: 88.2663,
        verified: true,
        petfriendly: true,
        area: 1600,
        beds: 3,
        baths: 2,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/Chameli-Memsaab-Bungalow-1.webp",
    },
    {
        title: "Luxury Tents in Ladakh",
        description:
            "High-altitude glamping experience with heated tents, oxygen supply, stargazing tours, and incredible views of snow-capped peaks. Adventure of a lifetime.",
        price: 1200000,
        discount: 0,
        address: "Pangong Lake Road",
        city: "Leh",
        state: "Ladakh",
        country: "India",
        postalCode: "194101",
        latitude: 34.1526,
        longitude: 77.5771,
        verified: true,
        petfriendly: false,
        area: 600,
        beds: 1,
        baths: 1,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1607908560428-36ff9e0363b7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Beachfront Cottage in Gokarna",
        description:
            "Rustic beachfront cottage steps from pristine Om Beach with surfing lessons, beach volleyball, bonfire nights, and fresh seafood. Backpacker's paradise.",
        price: 280000,
        discount: 200,
        address: "Om Beach Road",
        city: "Gokarna",
        state: "Karnataka",
        country: "India",
        postalCode: "581326",
        latitude: 14.5479,
        longitude: 74.3188,
        verified: false,
        petfriendly: true,
        area: 700,
        beds: 1,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://plus.unsplash.com/premium_photo-1682285210821-5d1b5a406b97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Wildlife Lodge in Jim Corbett",
        description:
            "Jungle lodge near Corbett National Park with safari tours, bird watching, nature walks, and wildlife photography sessions. Spot tigers and elephants.",
        price: 950000,
        discount: 1500,
        address: "Dhikala Zone, Corbett National Park",
        city: "Ramnagar",
        state: "Uttarakhand",
        country: "India",
        postalCode: "244715",
        latitude: 29.3949,
        longitude: 78.9482,
        verified: true,
        petfriendly: false,
        area: 1400,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/lobo-wildlife-lodge.jpg",
    },
    {
        title: "Houseboat in Kashmir",
        description:
            "Traditional Kashmiri houseboat on Dal Lake with shikara rides, floating market visits, Mughal garden tours, and authentic Wazwan cuisine. Paradise on earth.",
        price: 1000000,
        discount: 2000,
        address: "Dal Lake",
        city: "Srinagar",
        state: "Jammu and Kashmir",
        country: "India",
        postalCode: "190001",
        latitude: 34.0837,
        longitude: 74.7973,
        verified: true,
        petfriendly: false,
        area: 1100,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1780036782018-2d49f377d8b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Homestay in Coorg",
        description:
            "Family-run coffee plantation homestay with plantation tours, coffee tasting, home-cooked meals, and waterfall treks. Experience local Kodava culture.",
        price: 450000,
        discount: 0,
        address: "Madikeri-Mysore Road",
        city: "Madikeri",
        state: "Karnataka",
        country: "India",
        postalCode: "571201",
        latitude: 12.4244,
        longitude: 75.7382,
        verified: false,
        petfriendly: true,
        area: 1000,
        beds: 2,
        baths: 1,
        firesafety: false,
        showcaseimage:
            "https://images.unsplash.com/photo-1647771167457-c82f4850bb7e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Palace Hotel in Mysore",
        description:
            "Regal palace hotel with opulent rooms, royal dining, heritage walks, and proximity to Mysore Palace. Experience the grandeur of erstwhile Mysore kingdom.",
        price: 1400000,
        discount: 1000,
        address: "Near Mysore Palace",
        city: "Mysore",
        state: "Karnataka",
        country: "India",
        postalCode: "570001",
        latitude: 12.3052,
        longitude: 76.6552,
        verified: true,
        petfriendly: false,
        area: 2500,
        beds: 3,
        baths: 3,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1573363059771-8b2b53b492ff?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Eco Resort in Munnar",
        description:
            "Sustainable eco-resort in tea gardens with solar power, rainwater harvesting, organic farming, and nature conservation programs. Green luxury at its best.",
        price: 750000,
        discount: 750,
        address: "Tea Garden Road",
        city: "Munnar",
        state: "Kerala",
        country: "India",
        postalCode: "685612",
        latitude: 10.0889,
        longitude: 77.0595,
        verified: true,
        petfriendly: true,
        area: 1200,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage:
            "https://images.unsplash.com/photo-1754078219069-7565df2033b0?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Desert Resort in Jaisalmer",
        description:
            "Luxury desert resort with camel safari, folk dance performances, stargazing sessions, and traditional Rajasthani architecture. Golden city's finest accommodation.",
        price: 1150000,
        discount: 1500,
        address: "Sam Road",
        city: "Jaisalmer",
        state: "Rajasthan",
        country: "India",
        postalCode: "345001",
        latitude: 26.9157,
        longitude: 70.9083,
        verified: true,
        petfriendly: false,
        area: 1600,
        beds: 2,
        baths: 2,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/desert_resort.jpeg",
    },
    {
        title: "Coastal Villa in Alibaug",
        description:
            "Modern coastal villa with private beach access, infinity pool, water sports, and Mumbai proximity. Perfect weekend getaway for city dwellers.",
        price: 1300000,
        discount: 0,
        address: "Nagaon Beach Road",
        city: "Alibaug",
        state: "Maharashtra",
        country: "India",
        postalCode: "402201",
        latitude: 18.6414,
        longitude: 72.8722,
        verified: true,
        petfriendly: true,
        area: 2000,
        beds: 3,
        baths: 3,
        firesafety: true,
        showcaseimage: "https://ik.imagekit.io/r8s6roxm2/coastal_villa.jpg",
    },
];

const pickRandom = <T>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

const makeRandomId = (prefix: string) =>
    `${prefix}_${Math.random().toString(36).slice(2, 11)}_${Date.now()}`;

async function main() {
    console.log("🌱 Starting database seeding...");

    try {
        // Clear existing data in dependency order
        console.log("🧹 Cleaning existing data...");
        await prisma.payment.deleteMany();
        await prisma.booking.deleteMany();
        await prisma.review.deleteMany();
        await prisma.inquiry.deleteMany();
        await prisma.webhookEvent.deleteMany();
        await prisma.propertyImage.deleteMany();
        await prisma.property.deleteMany();
        await prisma.token.deleteMany();
        await prisma.user.deleteMany();

        // Create users
        console.log("👥 Creating users...");
        const createdUsers = [];
        for (const userData of users) {
            try {
                const user = await prisma.user.create({
                    data: userData,
                });
                createdUsers.push(user);
                console.log(`   ✓ Created user: ${user.name} (${user.email})`);
            } catch (error) {
                console.error(`   ❌ Failed to create user ${userData.name}:`, error);
            }
        }

        if (createdUsers.length === 0) {
            throw new Error("No users were created successfully");
        }

        // Create refresh tokens for some users
        console.log("🔑 Creating refresh tokens...");
        let tokenCount = 0;
        for (let i = 0; i < Math.min(createdUsers.length, 3); i++) {
            const user = createdUsers[i];
            try {
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

                await prisma.token.create({
                    data: {
                        userId: user.id,
                        refreshToken: `refresh_${Math.random().toString(36).substr(2, 32)}_${Date.now()}`,
                        expiresAt,
                    },
                });
                tokenCount++;
                console.log(`   ✓ Created refresh token for user: ${user.name}`);
            } catch (error) {
                console.error(`   ❌ Failed to create token for user ${user.name}:`, error);
            }
        }

        // Create properties
        console.log("🏠 Creating properties...");
        const createdProperties = [];
        for (let i = 0; i < properties.length; i++) {
            const propertyData = properties[i];
            const randomUser = pickRandom(createdUsers);

            try {
                const property = await prisma.property.create({
                    data: {
                        ...propertyData,
                        userId: randomUser.id,
                    },
                });
                createdProperties.push(property);

                // Add additional images for some properties
                if (i % 4 === 0) {
                    await prisma.propertyImage.createMany({
                        data: [
                            {
                                url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                                propertyId: property.id,
                            },
                            {
                                url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                                propertyId: property.id,
                            },
                            {
                                url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
                                propertyId: property.id,
                            },
                        ],
                    });
                }
                console.log(`   ✓ Created property: ${property.title}`);
            } catch (error) {
                console.error(`   ❌ Failed to create property ${propertyData.title}:`, error);
            }
        }

        // Create bookings
        console.log("📅 Creating bookings...");
        const bookings = [];
        const bookingAttempts = Math.min(20, createdProperties.length * 2);
        const createdBookings = new Set(); // Track created bookings to avoid duplicates

        for (let i = 0; i < bookingAttempts; i++) {
            const randomUser = pickRandom(createdUsers);
            const randomProperty = pickRandom(createdProperties);

            // Ensure user doesn't book their own property
            if (randomUser.id === randomProperty.userId) continue;

            try {
                // Create varied booking dates (past, current, future)
                let startDate;

                if (i % 3 === 0) {
                    // Past bookings (completed)
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30) - 5);
                } else if (i % 3 === 1) {
                    // Current/active bookings
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 3));
                } else {
                    // Future bookings
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) + 1);
                }

                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
                const now = new Date();
                const bookingStatus =
                    endDate < now ? "EXPIRED" : startDate <= now ? "CONFIRMED" : "PENDING";
                const isVerified = bookingStatus === "CONFIRMED" || bookingStatus === "EXPIRED";

                // Create a unique key to check for duplicates
                const bookingKey = `${randomUser.id}-${randomProperty.id}-${startDate.toISOString().split("T")[0]}`;
                if (createdBookings.has(bookingKey)) continue;

                const nights = Math.ceil(
                    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                );
                const totalPrice = (randomProperty.price - randomProperty.discount) * nights;
                const orderId = makeRandomId("order");

                const booking = await prisma.booking.create({
                    data: {
                        startDate,
                        endDate,
                        totalPrice,
                        orderId,
                        status: bookingStatus,
                        verified: isVerified,
                        userId: randomUser.id,
                        propertyId: randomProperty.id,
                    },
                });
                bookings.push(booking);
                createdBookings.add(bookingKey);
                console.log(`   ✓ Created booking: ${booking.id} for ${randomProperty.title}`);
            } catch (error) {
                console.error(`   ❌ Failed to create booking:`, error);
            }
        }

        // Create payments
        console.log("💳 Creating payments...");
        let paymentCount = 0;
        for (const booking of bookings) {
            try {
                const paymentStatuses =
                    booking.status === "PENDING"
                        ? ["PENDING", "PENDING", "FAILED"]
                        : ["CAPTURED", "COMPLETED", "COMPLETED", "FAILED", "REFUNDED"];
                const randomStatus = pickRandom(paymentStatuses);
                const uniqueOrderId = makeRandomId("rzp_order");
                const isCompletedPayment =
                    randomStatus === "CAPTURED" || randomStatus === "COMPLETED";

                await prisma.payment.create({
                    data: {
                        amount: booking.totalPrice,
                        currency: "INR",
                        status: randomStatus as
                            "CAPTURED" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED",
                        razorpayOrderId: uniqueOrderId,
                        razorpayPaymentId: isCompletedPayment ? makeRandomId("pay") : null,
                        razorpaySignature: isCompletedPayment ? makeRandomId("sig") : null,
                        userId: booking.userId,
                        bookingId: booking.id,
                    },
                });
                paymentCount++;
                console.log(
                    `   ✓ Created payment for booking ${booking.id} with status ${randomStatus}`
                );
            } catch (error) {
                console.error(`   ❌ Failed to create payment for booking ${booking.id}:`, error);
            }
        }

        // Create webhook events
        console.log("🪝 Creating webhook events...");
        let webhookEventCount = 0;
        for (const booking of bookings.slice(0, Math.min(10, bookings.length))) {
            try {
                await prisma.webhookEvent.create({
                    data: {
                        eventType: `booking.${booking.status.toLowerCase()}`,
                        payload: {
                            bookingId: booking.id,
                            userId: booking.userId,
                            propertyId: booking.propertyId,
                            status: booking.status,
                            totalPrice: booking.totalPrice,
                        },
                        processed: booking.status !== "PENDING",
                    },
                });
                webhookEventCount++;
            } catch (error) {
                console.error(
                    `   ❌ Failed to create webhook event for booking ${booking.id}:`,
                    error
                );
            }
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
            "Exceptional service and beautiful surroundings. Will definitely return!",
        ];

        let reviewCount = 0;
        const maxReviews = Math.min(50, createdProperties.length * 3);

        for (let i = 0; i < maxReviews; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const randomProperty =
                createdProperties[Math.floor(Math.random() * createdProperties.length)];

            // Ensure user doesn't review their own property
            if (randomUser.id === randomProperty.userId) continue;

            try {
                const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
                const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];

                await prisma.review.create({
                    data: {
                        rating,
                        comment,
                        userId: randomUser.id,
                        propertyId: randomProperty.id,
                    },
                });
                reviewCount++;
            } catch (error) {
                console.error(`   ❌ Failed to create review:`, error);
            }
        }
        console.log(`   ✓ Created ${reviewCount} reviews`);

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
            "Do you offer any discounts for longer stays?",
            "What's the check-in and check-out time?",
            "Is Wi-Fi available throughout the property?",
            "Can you accommodate dietary restrictions for breakfast?",
            "Are there any local attractions nearby?",
            "Is the property child-friendly and safe?",
        ];

        let inquiryCount = 0;
        const maxInquiries = Math.min(30, createdProperties.length * 2);

        for (let i = 0; i < maxInquiries; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const randomProperty =
                createdProperties[Math.floor(Math.random() * createdProperties.length)];
            const randomMessage =
                inquiryMessages[Math.floor(Math.random() * inquiryMessages.length)];

            try {
                await prisma.inquiry.create({
                    data: {
                        message: randomMessage,
                        userId: randomUser.id,
                        propertyId: randomProperty.id,
                    },
                });
                inquiryCount++;
            } catch (error) {
                console.error(`   ❌ Failed to create inquiry:`, error);
            }
        }
        console.log(`   ✓ Created ${inquiryCount} inquiries`);

        console.log("✅ Database seeding completed successfully!");
        console.log(`
📊 Final Statistics:
    👥 ${createdUsers.length} users
    🔑 ${tokenCount} refresh tokens
    🏠 ${createdProperties.length} properties
    📅 ${bookings.length} bookings
    💳 ${paymentCount} payments
    🪝 ${webhookEventCount} webhook events
    ⭐ ${reviewCount} reviews
    💬 ${inquiryCount} inquiries
    `);
    } catch (error) {
        console.error("❌ Critical error during seeding:", error);
        throw error;
    }
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
