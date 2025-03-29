import Image from 'next/image';

interface GalleryProps {
  images: string[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((image, index) => (
        <div key={index} className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${title} screenshot ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
