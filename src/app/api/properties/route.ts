import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import prisma from '@/utils/prismaClient';

interface IProperty {
  title: string,
      description: string,
      price: number,
      discount: number,
      location: string,
      petfriendly: boolean,
      showcaseimage: string,
      beds: number,
      baths: number,
      area: number,
      image1?: string,
      image2?: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required', success: false },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      price,
      discount,
      location,
      petfriendly,
      beds,
      baths,
      area,
      showcaseimage,
      image1,
      image2
    }:IProperty = body;

    // Validate required fields
    if (!title || !description || !price || !location || !showcaseimage || !beds || !area) {
      console.log("SOmething is missing");
      
      return NextResponse.json(
        { error: 'Missing required fields', success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: price,
        verified: false,
        area: Math.round(area),
        beds: beds,
        baths: baths,
        discount: discount*100 || 0,
        location,
        petfriendly: !!petfriendly,
        showcaseimage,
        booked: false,
        userId: user.id
      }
    });

    if (image1) {
      await prisma.propertyImage.create({
          data: {
            url: image1,
            propertyId: property.id
          }
        })
    }
    if (image2) {
      await prisma.propertyImage.create({
          data: {
            url: image2,
            propertyId: property.id
          }
        })
    }


    return NextResponse.json(
      {
        success: true,
        message: 'Property created successfully',
        property: {
          id: property.id,
          title: property.title,
          price: property.price
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
