import { getProperties } from "@/actions/getProperties";
import { PropertyPageRedirectButton } from "./propertyPageRedirectButton";
import { PropertyCardWrapper } from "./propretyCardWrapper";

export const FeaturedProperties = async () => {

    const featuredProperties = await getProperties({ verified: 'true' });


    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-8">Featured Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property) => (
                        <PropertyCardWrapper key={property.id} property={property} />
                    ))}
                </div>
                <PropertyPageRedirectButton />
            </div>
        </section>
    )
}