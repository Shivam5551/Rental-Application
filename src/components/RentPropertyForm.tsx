'use client';

import { useCallback, useState } from 'react';
import { upload } from '@imagekit/next';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { ImageKitAuthenticator } from '@/utils/ImagekitAuthenticator';
import { IAuthenticator } from './UpdateProfile';
import Image from 'next/image';
import axios from 'axios';

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  discount: number;
  beds: number;
  baths: number;
  area: number;
  location: string;
  petfriendly: boolean
}

export const RentPropertyForm = () => {
  const abortController = new AbortController();
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
  });

  interface UploadedImages {
    showcase: File | null;
    image1?: File | null;
    image2?: File | null;
  }
  interface ImagePreview {
    showcase: string | null;
    image1: string | null;
    image2: string | null;
  }

  const [imagePreview, setImagePreview] = useState<ImagePreview>({
    showcase: null,
    image1: null,
    image2: null
  });
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    showcase: null,
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

  const authenticator = useCallback(async () => {
    const data = await ImageKitAuthenticator();
    if (!data) {
      toast.error("Failed to Authenticate")
      return null;
    }
    const { signature, expire, token, publicKey }: IAuthenticator = data;
    return { signature, expire, token, publicKey };
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    if (!file) {
      return;
    }

    let authParams;
    try {
      authParams = await authenticator();
      if (!authParams) {
        throw new Error("Auth Error")
      }
    } catch (authError) {
      toast.error("Unable to authenticate request")
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey }: IAuthenticator = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        abortSignal: abortController.signal,
      });

      return uploadResponse.url;

    } catch (error) {
      toast.error("Unable to upload images")
      console.log(error);
      return;
    }
  }, [authenticator, abortController.signal]);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'showcase' | 'image1' | 'image2') => {
    const file = e.target.files?.[0];
    if (file) {
      if (imageType === 'showcase') {
        setUploadedImages((c) => (
          {
            ...c,
            showcase: file
          }
        ));
        setImagePreview((c) => ({
          ...c,
          showcase: URL.createObjectURL(file)
        }))
      }
      if (uploadedImages.showcase && imageType === 'image1') {
        setUploadedImages((c) => (
          {
            ...c,
            image1: file
          }
        ));
        setImagePreview((c) => ({
          ...c,
          image1: URL.createObjectURL(file)
        }))
      }
      if (uploadedImages.showcase && uploadedImages.image1 && imageType === "image2") {
        setUploadedImages((c) => (
          {
            ...c,
            image2: file
          }
        ));
        setImagePreview((c) => ({
          ...c,
          image2: URL.createObjectURL(file)
        }))
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImages.showcase) {
      toast.error('Showcase image is required!');
      return;
    }
    if (!formData.area || !formData.baths || !formData.beds || !formData.description || !formData.location || !formData.price || !formData.title) {
      toast.error('Fields mark with * required');
      return;
    }

    setIsSubmitting(true);

    try {
      let showcaseImageUri = null;
      let image1Uri = null;
      let image2Uri = null;
      if (uploadedImages.showcase) {
        const showcaseImageUrl = await handleUpload(uploadedImages.showcase);

        if (!showcaseImageUrl) {
          return;
        }
        console.log("SHOWCASEURL", showcaseImageUrl);

        showcaseImageUri = showcaseImageUrl;
        if (uploadedImages.image1) {
          const image1Url = await handleUpload(uploadedImages.image1)
          if (!image1Url) {
            return;
          }
          image1Uri = image1Url;
        }
        if (uploadedImages.image2) {
          const image2Url = await handleUpload(uploadedImages.image2);
          if (!image2Url) {
            return;
          }
          image2Uri = image2Url;
        }
      }

      const response = await axios.post('/api/properties', {
        ...formData,
        showcaseimage: showcaseImageUri,
        image1: image1Uri,
        image2: image2Uri
      })

      if (response.data.success) {
        toast('Property listed successfully!');

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
        });
        setUploadedImages({
          showcase: null,
          image1: null,
          image2: null
        });
      } 
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to list property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-900">Basic Information</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium dark:text-gray-50 text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter property title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm dark:text-gray-50 font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your property"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm dark:text-gray-50 font-medium text-gray-700 mb-2">
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
              className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1000"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block dark:text-gray-50 text-sm font-medium text-gray-700 mb-2">
              Discount Rs.
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border dark:text-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="100"
            />
          </div>
          <div>
            <label htmlFor="beds" className="block dark:text-gray-50 text-sm font-medium text-gray-700 mb-2">
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border dark:text-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label htmlFor="baths" className="block text-sm dark:text-gray-50 font-medium text-gray-700 mb-2">
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              value={formData.baths}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border dark:text-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label htmlFor="area" className="block dark:text-gray-50 text-sm font-medium text-gray-700 mb-2">
              Area
            </label>
            <input
              type="area"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 dark:text-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1000"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block dark:text-gray-50 text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border dark:text-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="h-4 w-4 text-blue-600 dark:text-gray-50 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="petfriendly" className="ml-2 dark:text-gray-50 block text-sm text-gray-700">
            Pet Friendly
          </label>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold dark:text-gray-50 text-gray-900">Property Images</h2>

        <div className="p-4 border border-gray-200 rounded-lg">
          <label className="block text-sm font-medium dark:text-gray-50 text-gray-700 mb-2">
            Showcase Image * (Main image for your property)
          </label>

          {!uploadedImages.showcase ? (
            <label htmlFor="showcase"
              className="bg-white text-slate-500 dark:text-gray-200 dark:bg-slate-600 font-semibold text-base rounded min-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto">
              <IoCloudUploadOutline size={40} />
              Upload file

              <input type="file" id='showcase' accept="image/*"
                onChange={(e) => handleFileChange(e, 'showcase')} className="hidden" />
              <p className="text-xs font-medium text-slate-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
            </label>
          ) : (
            <div className="space-y-2">
              <div className="relative w-full flex items-center justify-center ">
                <Image
                  width={300}
                  height={200}
                  src={imagePreview.showcase as string}
                  className="rounded-lg flex justify-center items-center object-cover"
                  alt="Showcase image"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, showcaseimage: '' }));
                  setUploadedImages(prev => ({ ...prev, showcase: null }));
                  setImagePreview(prev => ({ ...prev, showcase: null }));
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        {uploadedImages.showcase && (
          <>
            {/* Image 1 */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium dark:text-gray-50 text-gray-700 mb-2">
                Additional Image 1 (Optional)
              </label>

              {!uploadedImages.image1 && !imagePreview.image1 ? (
                <label htmlFor="image1"
                  className="bg-white text-slate-500 dark:text-gray-200 dark:bg-slate-600 font-semibold text-base rounded min-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto">
                  <IoCloudUploadOutline size={40} />
                  Upload More file

                  <input type="file" id='image1' accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image1')} className="hidden" />
                  <p className="text-xs font-medium text-slate-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                </label>
              ) : (<div className="space-y-2">
                <div className="relative w-full flex items-center justify-center ">
                  <Image
                    width={300}
                    height={200}
                    src={imagePreview.image1 as string}
                    className="rounded-lg flex justify-center items-center object-cover"
                    alt="Property image 1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image1: '' }));
                    setUploadedImages(prev => ({ ...prev, image1: null }));
                    setImagePreview(prev => ({ ...prev, image1: null }));
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
              )}
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium dark:text-gray-50 text-gray-700 mb-2">
                Additional Image 2 (Optional)
              </label>

              {!uploadedImages.image2 && !imagePreview.image2 ? (
                <label htmlFor="image2"
                  className="bg-white text-slate-500 dark:text-gray-200 dark:bg-slate-600 font-semibold text-base rounded min-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto">
                  <IoCloudUploadOutline size={40} />
                  Upload file

                  <input type="file" id='image2' accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image2')} className="hidden" />
                  <p className="text-xs font-medium text-slate-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                </label>
              ) : (<div className="space-y-2">
                <div className="relative w-full flex items-center justify-center ">
                  <Image
                    width={300}
                    height={200}
                    src={imagePreview.image2 as string}
                    className="rounded-lg flex justify-center items-center object-cover"
                    alt="Property image 2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image2: '' }));
                    setUploadedImages(prev => ({ ...prev, image2: null }));
                    setImagePreview(prev => ({ ...prev, image2: null }));
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
          disabled={isSubmitting || !uploadedImages.showcase}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Listing Property...' : 'List Property'}
        </button>
      </div>
    </form>
  );
};
