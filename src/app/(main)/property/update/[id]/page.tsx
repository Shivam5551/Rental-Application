'use server';
import { getProperty } from "@/actions/getProperty";
import { RentPropertyForm } from "@/components/rent/RentPropertyForm";

interface IProperty {
    title: string;
    description: string;
    price: number;
    beds: number;
    baths: number;
    discount: number;
    area: number;
    location: string;
    petfriendly: boolean;
}

interface Images {
    showcase: string;
    image1: string;
    image2: string;
}

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const result = await getProperty(id);
    if (!result) {
        return (
            <div>
                Nothing to update
            </div>
        )
    }
    const { property, images }: { property: IProperty, images: Images } = result;

    return (
        <div className="min-h-screen dark:bg-slate-900 bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold dark:text-orange-50 text-gray-900 mb-2">
                            List Your Property for Rent
                        </h1>
                        <p className="text-gray-600 dark:text-gray-100">
                            Update a listing for your property and start earning rental income
                        </p>
                    </div>

                    <RentPropertyForm property={property} images={images} id={id} />
                </div>
            </div>
        </div>
    )

}