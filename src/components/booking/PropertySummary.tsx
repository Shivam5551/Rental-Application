import Image from 'next/image';

interface PropertySummaryProps {
  title: string;
  location: string;
  showcaseImage: string;
  price: number;
  discount: number;
}

export function PropertySummary({ title, location, showcaseImage, price, discount }: PropertySummaryProps) {
    const discountedPrice = discount > 0
    ? ((price / 100) * (1 - (discount / 10000))).toFixed(2)
    : price / 100;


  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Property Summary
      </h2>
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <Image
          width={400}
          height={225}
          src={showcaseImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {location}
      </p>
      <div className="flex items-center justify-between">
        <div className='flex items-center'>
          {discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Rs.{discountedPrice.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                Rs.{(price/100).toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Rs.{(price/100).toLocaleString()}
            </span>
          )}
          <span className="text-gray-600 dark:text-gray-300 ml-2">/Night</span>
        </div>
      </div>
    </div>
  );
}
