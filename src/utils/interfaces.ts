export interface IBookedProperties {
    id: string;
    createdAt: Date;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    propertyId: string;
    property: {
        id: string;
        title: string;
        location: string;
        showcaseimage: string;
        price: number;
        discount: number;
        beds: number;
        baths: number;
        area: number;
        user: {
            id: string;
            name: string;
            image: string | null;
        };
    };
    payment: {
        status: "PENDING" | "CAPTURED" | "COMPLETED" | "FAILED" | "REFUNDED"
    }
}
