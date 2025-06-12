import { FaStar, FaStarHalf } from "react-icons/fa";
import { PropertyCard } from "../../components/card";
import Image from "next/image";
import HomepageImage from "../../assets/property.jpeg";
import { Button } from '../../components/button'
import Link from "next/link";
import { TestimonialCard } from "@/components/testimonals";

const Home = () => {
    return (
      <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="bg-white dark:bg-slate-950 items-center px-5 flex py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl xl:text-6xl font-bold leading-tight">
                Transparent
                <span className="text-orange-950/80 dark:text-orange-100">
                  {" "}
                  Rental Management
                </span>
                {" "}
                Made Simple
              </h1>
              <p className="mt-6 text-md lg:text-xl text-gray-700 dark:text-gray-300">
                Build trust between landlords and tenants with our comprehensive
                property management platform focused on transparency and dispute resolution.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button btClass="text-white dark:text-black hover:cursor-pointer bg-orange-950/90 dark:bg-orange-100 dark:hover:bg-orange-200 hover:bg-orange-950/80 ">Book Now</Button>
                <Button btClass="bg-white text-black dark:text-white dark:bg-black dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className='hidden lg:flex'>
              <Image
              className="h-[50dv] w-[50dvw] mr-5 rounded-lg shadow-2xl"
              src={HomepageImage}
              alt="Homepage"
              style={{ objectFit: "cover" }}
              priority
            />
            </div>
          </div>

          {/* Featured Properties */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Featured Properties</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <PropertyCard key={index} property={property} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/properties">
                  <span className="inline-flex items-center bg-orange-500 justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-orange-700">
                    View All Properties
                  </span>
                </Link>
              </div>
            </div>
          </section>


          {/* Testimonials */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  What Our Users Say
                </h2>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-amber-500 flex">
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-black"></div>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "As a landlord, RentGuard has eliminated disputes over maintenance. Tenants can see the complete history, and I can document all improvements."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="font-medium text-gray-900 dark:text-white">Michael Richardson</div>
                    <div className="text-gray-500 dark:text-gray-400 ml-2 text-sm">Property Owner</div>
                  </div>
                </div>
                <TestimonialCard cardDetails={{
                  name: "David",
                  rating: 3.5,
                  thought: "THis is thought",
                  type: "Owner"
                }}
                />

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-amber-500 flex">
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStarHalf className="text-amber-300 mr-1" />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                          d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "I love being able to see real reviews from previous tenants and the complete maintenance history before signing a lease. No more surprises!"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                    <div className="text-gray-500 dark:text-gray-400 ml-2 text-sm">Tenant</div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-amber-500 flex">
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                      <FaStar className="text-amber-300 mr-1" />
                    </div>
                     <div className="w-14 h-14 rounded-full bg-black"></div>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "Our property management company uses RentGuard for all our listings. It's reduced complaints and disputes by over 70% in the first year."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="font-medium text-gray-900 dark:text-white">David Thompson</div>
                    <div className="text-gray-500 dark:text-gray-400 ml-2 text-sm">Property Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <FAQSection /> */}
        </main>

        {/* <Footer /> */}
      </div>
    );
};

export default Home;

const properties = [
    {
      title: "Coastal Retreat",
      address: "123 Ocean Drive, Miami, FL",
      price: 240,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      beds: 3,
      baths: 2,
      sqft: 1500,
      propertyType: "house",
      maintenanceYears: 5,
      rating: 4.8,
      verified: true,
      petFriendly: true
    },
    {
      title: "Downtown Loft",
      address: "456 Urban St, Chicago, IL",
      price: 185,
      imageUrl: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      beds: 2,
      baths: 2,
      sqft: 1200,
      propertyType: "apartment",
      maintenanceYears: 3,
      rating: 4.5,
      verified: true,
      petFriendly: false
    },
    {
      title: "Suburban Charm",
      address: "789 Maple Ave, Austin, TX",
      price: 210,
      imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      beds: 4,
      baths: 2.5,
      sqft: 2000,
      propertyType: "house",
      maintenanceYears: 7,
      rating: 4.9,
      verified: true,
      petFriendly: true
    },
    {
      title: "Urban Oasis",
      address: "123 Main St, San Francisco, CA",
      price: 175,
      imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      beds: 2,
      baths: 2,
      sqft: 1100,
      propertyType: "apartment",
      maintenanceYears: 4,
      rating: 4.7,
      verified: true,
      petFriendly: false
    },
    {
      title: "Riverside Townhouse",
      address: "456 River Rd, Portland, OR",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      propertyType: "townhouse",
      maintenanceYears: 6,
      rating: 4.8,
      verified: true,
      petFriendly: true
    },
    {
      title: "Contemporary Villa",
      address: "789 Hillside Dr, Los Angeles, CA",
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      beds: 4,
      baths: 3,
      sqft: 2400,
      propertyType: "house",
      maintenanceYears: 8,
      rating: 4.9,
      verified: true,
      petFriendly: true
    }
  ];
  


const testimonals = [
  {
    name: "David Thompson",
    rating: 4,
    thought: "Our property management company uses RentGuard for all our listings. It's reduced complaints and disputes by over 70% in the first year.",
    
  }
]