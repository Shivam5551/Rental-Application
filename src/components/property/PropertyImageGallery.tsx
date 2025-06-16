import { Image as ImageKitImage } from '@imagekit/next';

interface PropertyImageGalleryProps {
  showcaseImage: string;
  title: string;
}

export function PropertyImageGallery({ showcaseImage, title }: PropertyImageGalleryProps) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <ImageKitImage
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
          src={showcaseImage}
          alt={title}
          width={800}
          height={450}
          transformation={[{
            height: 450,
            width: 800,
            crop: 'maintain_ratio'
          }]}
          className="w-full h-full object-cover"
        />
    </div>
  );
}
