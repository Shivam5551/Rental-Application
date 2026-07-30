import { getPopularProperties } from "@/actions/getPopularProperties";
import { PropertyCardWrapper } from "../property/propretyCardWrapper";

export const PopularProperties = async () => {
    const properties = await getPopularProperties();
    if (!properties || properties.length === 0) {
        return (
            <div className="w-full p-8 text-center bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg">Unable to fetch properties at the moment</p>
                <p className="text-gray-400 text-sm mt-2">Please try again later</p>
            </div>
        );
    }
    return (
        <div className="w-full mt-2 bg-neutral-100 p-2 rounded-2xl shadow-xl dark:bg-slate-900">
            <h2 className="text-2xl dark:text-white font-bold mb-4 px-4">Popular Properties</h2>
            <div className="flex gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {properties.map((p) => (
                    <div key={p.id} className="shrink-0 w-90">
                        <PropertyCardWrapper property={p} />
                    </div>
                ))}
            </div>
        </div>
    );
};
