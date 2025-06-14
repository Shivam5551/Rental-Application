'use client';
import { Property } from "@/actions/getProperties"
import { PropertyCard } from "./PropertyCard"
import { useEffect, useState } from "react";
import axios from "axios";

interface PropertyCardWrapperProps {
    property: Property;
}

export const PropertyCardWrapper =  ({ property }: PropertyCardWrapperProps) => {
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState<number>(0);

    useEffect(()=> {
        async function getRating() {
            try {
                const res = await axios(`/api/rating/${property.id}`);
                if(res.status === 200 && res.data.rating) {
                    setRating(res.data.rating);
                }
            } catch (error) {
                console.log("Retrieving rating error:", error);
                
                throw new Error("Error While Retrieving rating")
            } finally {
                setLoading(false);
            }
        }
        if(loading) {
            getRating()
        }
        
    },[loading, property.id])

    return (
        <PropertyCard property={property} rating={rating} />
    )
}