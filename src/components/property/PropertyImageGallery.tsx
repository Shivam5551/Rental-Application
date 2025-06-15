import { ImageKitProvider, Image as ImageKitImage } from '@imagekit/next';
import { IMAGEKIT_CONFIG } from '@/utils/imagekitConfig';

interface PropertyImageGalleryProps {
  showcaseImage: string;
  title: string;
}

export function PropertyImageGallery({ showcaseImage, title }: PropertyImageGalleryProps) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <ImageKitProvider urlEndpoint={IMAGEKIT_CONFIG.urlEndpoint}>
        <ImageKitImage
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
      </ImageKitProvider>
    </div>
  );
}
