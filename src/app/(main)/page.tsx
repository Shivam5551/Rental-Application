
import HomepageImage from "../../assets/property.jpeg";
import { Button } from '../../components/button'
import Link from "next/link";
import { FeaturedProperties } from "@/components/featuredProperties";
import { PlatformStats } from "@/components/platformstats";
import { AboutTestimonials } from "@/components/about";
import Image from "next/image";

const Home = async () => {




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
                <Link href="/properties">
                  <Button btClass="text-white dark:text-black hover:cursor-pointer bg-orange-950/90 dark:bg-orange-100 dark:hover:bg-orange-200 hover:bg-orange-950/80 ">
                    Book Now
                  </Button>
                </Link>
                <Link href="/about">
                <Button btClass="bg-white text-black dark:text-white dark:bg-black dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer outline">
                  Watch Demo
                </Button></Link>
              </div>
            </div>
            <div className='hidden lg:flex'>
              <Image
              priority  
              className="h-[50dv] w-[50dvw] mr-5 rounded-lg shadow-2xl"
              src={HomepageImage.src}
              alt="Homepage"
              width={800}
              height={600}
              style={{ objectFit: "cover" }}
            />
            </div>
          </div>

          <FeaturedProperties />
          <AboutTestimonials />

          <PlatformStats />
        </main>
      </div>
    );
};

export default Home;

