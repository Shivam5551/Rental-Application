import prisma from '@/utils/prismaClient';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  location: string;
  verified: boolean;
  booked: boolean;
  petfriendly: boolean;
  area: number;
  beds: number;
  baths: number;
  firesafety: boolean;
  showcaseimage: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  _count: {
    reviews: number;
  };
}

export interface SearchParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  baths?: string;
  petfriendly?: string;
  firesafety?: string;
  verified?: string;
  area?: string;
  page?: string;
}

export async function getProperties(searchParams: SearchParams = {}): Promise<Property[]> {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      beds,
      baths,
      petfriendly,
      firesafety,
      verified,
      area,
      page = '1'
    } = searchParams;

    const where: Record<string, unknown> = {
      booked: false,
      verified: true,
    };

    if (location && location.trim()) {
      where.location = {
        contains: location.trim(),
        mode: 'insensitive'
      };
    }

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) {
        priceFilter.gte = parseInt(minPrice);
      }
      if (maxPrice) {
        priceFilter.lte = parseInt(maxPrice);
      }
      where.price = priceFilter;
    }

    // Number of beds
    if (beds) {
      where.beds = {
        gte: parseInt(beds)
      };
    }

    // Number of baths
    if (baths) {
      where.baths = {
        gte: parseInt(baths)
      };
    }

    // Boolean filters
    if (petfriendly === 'true') {
      where.petfriendly = true;
    }

    if (firesafety === 'true') {
      where.firesafety = true;
    }

    if (verified === 'true') {
      where.verified = true;
    }

    // Area filter
    if (area) {
      where.area = {
        gte: parseInt(area)
      };
    }

    // Pagination
    const pageNumber = parseInt(page);
    const pageSize = 9;
    const skip = (pageNumber - 1) * pageSize;

    const properties = await prisma.property.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: [
        { verified: 'desc' }, // Verified properties first
        { createdAt: 'desc' } // Newest first
      ],
      skip,
      take: pageSize
    });


    // Map properties to match the Property interface
    return properties.map((property: Property) => ({
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      discount: property.discount,
      location: property.location,
      verified: property.verified,
      booked: property.booked,
      petfriendly: property.petfriendly,
      area: property.area,
      beds: property.beds,
      baths: property.baths,
      firesafety: property.firesafety,
      showcaseimage: property.showcaseimage,
      createdAt: property.createdAt,
      user: property.user,
      _count: property._count
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}
