'use client';

import { useState } from 'react';
import { ImageKitProvider, Image } from '@imagekit/next';
import type { UploadResponse } from '@imagekit/next';
import { IMAGEKIT_CONFIG } from '@/utils/imagekitConfig';

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  discount: number;
  beds: number;
  baths: number;
  area: number;
  location: string;
  petfriendly: boolean;
  showcaseimage: string;
  image1?: string;
  image2?: string;
}

export const RentPropertyForm = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    beds: 0,
    baths: 0,
    discount: 0,
    area: 0,
    location: '',
    petfriendly: false,
    showcaseimage: '',
    image1: '',
    image2: ''
  });

  const [uploadedImages, setUploadedImages] = useState({
    showcase: false,
    image1: false,
    image2: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const onUploadSuccess = (result: UploadResponse, imageType: 'showcase' | 'image1' | 'image2') => {
    setFormData(prev => ({
      ...prev,
      [imageType === 'showcase' ? 'showcaseimage' : imageType]: result.url
    }));

    setUploadedImages(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  const onUploadError = (err: Error) => {
    console.error('Upload error:', err);
    alert('Failed to upload image. Please try again.');
  };

  const handleImageUpload = async (file: File, imageType: 'showcase' | 'image1' | 'image2') => {
    try {
      // Use the original upload API for now, we'll integrate ImageKit in the provider
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', imageType);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        onUploadSuccess(result as UploadResponse, imageType);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      onUploadError(error as Error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'showcase' | 'image1' | 'image2') => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, imageType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.showcaseimage) {
      alert('Showcase image is required!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Property listed successfully!');
        // Reset form or redirect
        setFormData({
          title: '',
          description: '',
          price: 0,
          discount: 0,
          beds: 0,
          baths: 0,
          area: 0,
          location: '',
          petfriendly: false,
          showcaseimage: '',
          image1: '',
          image2: ''
        });
        setUploadedImages({
          showcase: false,
          image1: false,
          image2: false
        });
      } else {
        throw new Error('Failed to create property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to list property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageKitProvider
      urlEndpoint={IMAGEKIT_CONFIG.urlEndpoint}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter property title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your property"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price per night Rs. *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1000"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Rs.
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="100"
            />
          </div>
          <div>
            <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-2">
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label htmlFor="baths" className="block text-sm font-medium text-gray-700 mb-2">
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              value={formData.baths}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
              Area
            </label>
            <input
              type="area"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1000"
              required
            />
          </div>
          <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, State"
          />
        </div>
        </div>

        

        <div className="flex items-center">
          <input
            type="checkbox"
            id="petfriendly"
            name="petfriendly"
            checked={formData.petfriendly}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="petfriendly" className="ml-2 block text-sm text-gray-700">
            Pet Friendly
          </label>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Property Images</h2>
        
        {/* Showcase Image - Required */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Showcase Image * (Main image for your property)
          </label>
          
          {!uploadedImages.showcase ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'showcase')}
                className="w-full cursor-pointer"
              />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload your main property image
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <Image
                  width={300}
                  height={200}
                  src={formData.showcaseimage}
                  transformation={[{
                    height: 200,
                    width: 300,
                    crop: 'maintain_ratio'
                  }]}
                  className="rounded-lg object-cover"
                  alt="Showcase image"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, showcaseimage: '' }));
                  setUploadedImages(prev => ({ ...prev, showcase: false }));
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        {/* Additional Images - Show only after showcase image is uploaded */}
        {uploadedImages.showcase && (
          <>
            {/* Image 1 */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Image 1 (Optional)
              </label>
              
              {!uploadedImages.image1 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image1')}
                    className="w-full cursor-pointer"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload additional image
                  </p>
                </div>
              ) : (                  <div className="space-y-2">
                    <div className="relative">
                      <Image
                        src={formData.image1 || ''}
                        transformation={[{
                          height: 200,
                          width: 300,
                          crop: 'maintain_ratio'
                        }]}
                        className="rounded-lg object-cover"
                        alt="Property image 1"
                      />
                    </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image1: '' }));
                      setUploadedImages(prev => ({ ...prev, image1: false }));
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            {/* Image 2 */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Image 2 (Optional)
              </label>
              
              {!uploadedImages.image2 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image2')}
                    className="w-full cursor-pointer"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload additional image
                  </p>
                </div>
              ) : (                  <div className="space-y-2">
                    <div className="relative">
                      <Image
                        src={formData.image2 || ''}
                        transformation={[{
                          height: 200,
                          width: 300,
                          crop: 'maintain_ratio'
                        }]}
                        className="rounded-lg object-cover"
                        alt="Property image 2"
                      />
                    </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image2: '' }));
                      setUploadedImages(prev => ({ ...prev, image2: false }));
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting || !formData.showcaseimage}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Listing Property...' : 'List Property'}
        </button>
      </div>
    </form>
    </ImageKitProvider>
  );
};
