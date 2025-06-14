import { userProperty } from "@/actions/userProperty";
import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import Image from "next/image";

interface Property {
    id: string;
    showcaseimage: string;
    price: number;
    discount: number;
    title: string;
    location: string;
    petfriendly: boolean;
    booked: boolean;
}

export const UserPropertiesCard = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user.id) {
        return null;
    }
    const propertyData = await userProperty();
    // console.log(propertyData);

    const property: Property[] = propertyData?.properties ? propertyData.properties : [];
    // console.log(property);

    return (
        <div className="w-full min-h-193 max-h-193 rounded-2xl shadow-md items-center dark:bg-slate-800 p-4 bg-neutral-100 overflow-x-auto">
        <div className="flex w-full px-2 mb-1 justify-center">
                        <a
                            href="/property/rent"
                            className="inline-block w-full font-semibold transform transition-all duration-200 hover:rounded-2xl bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
                        >
                            Rent Properties
                        </a>
                    </div>
            {property.length === 0 ? (
                <div className="text-center text-gray-700 font-semibold flex items-center justify-center w-full min-h-50 text-2xl">No properties found.</div>
            ) : (
                    <div className="grid p-2 grid-cols-1 xl:grid-cols-2 gap-4">
                        {property.map((prop) => (
                            <div key={prop.id} className="bg-white dark:text-white dark:bg-black relative rounded-lg shadow-lg p-4 flex flex-col">
                                {prop.discount ? <div className="absolute bg-red-600 items-center flex justify-center text-white h-12 w-12 font-semibold rounded-full right-2 top-2">{"-" + prop.discount/100 + "%"}</div> : ""}
                                {prop.showcaseimage ? (
                                    <Image
                                        src={prop.showcaseimage}
                                        alt={prop.title}
                                        width={400}
                                        height={160}
                                        className="h-40 w-full object-cover rounded mb-2"    
                                    />
                                ) : null}
                                <h2 className="text-lg font-semibold">{prop.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">{prop.location}</p>
                                <div className="text-gray-800 dark:text-white  font-bold mt-1">
                                    {prop.discount ? <div className="flex items-center"><span style={{ textDecorationColor: "red", textDecorationThickness: "2px", textDecorationLine: "line-through" }} className="text-base mr-2 whitespace-pre items-center font-light">{" Rs." + (prop.price).toFixed(2) + " "}</span><span>Rs.{(prop.price * (1-(prop.discount/10000))).toFixed(2)}</span></div> : <span>{"Rs." + prop.price.toFixed(2)}</span>}
                                </div>
                                <div className="flex items-center mt-2 space-x-2">
                                    <span className={`text-xs px-2 py-1 rounded ${prop.petfriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-800'}`}>
                                        {prop.petfriendly ? 'Pet Friendly' : 'No Pets'}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${prop.booked ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-900'}`}>
                                        {prop.booked ? 'Booked' : 'Available'}
                                    </span>
                                </div>
                                <a
                                    href={`/property/update/${prop.id}`}
                                    className="mt-4 inline-block font-semibold transform transition-all duration-200 hover:rounded-2xl bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                                >
                                    Update
                                </a>
                            </div>
                        ))}
                    </div>

            )}
        </div>
    )
}