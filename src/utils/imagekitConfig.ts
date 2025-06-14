// ImageKit configuration
export const IMAGEKIT_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'demo-public-key',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/demo',
  authenticationEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_AUTHENTICATION_ENDPOINT || '/api/imagekit-auth'
};

// Types for ImageKit
export interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  [key: string]: unknown;
}

export interface ImageKitError {
  message: string;
  help?: string;
}
