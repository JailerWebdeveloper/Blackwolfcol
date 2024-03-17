import { useEffect,useState } from "react";

const CarrouselProduct = ({ ArrayImagenes }) => {

    const [imagesLoaded, setImagesLoaded] = useState(true);

    useEffect(() => {
      const loadImage = () => {
        const images = Array.from(document.querySelectorAll('.carrousel-image'));
        let loadedCount = 0;
        images.forEach(image => {
          if (image.complete) {
            loadedCount++;
          } else {
            image.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount === images.length) {
                setImagesLoaded(true);
              }
            });
            image.addEventListener('error', () => {
              // Handle error loading image
            });
          }
        });
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
  
      loadImage();
    }, [ArrayImagenes]);
    return (
      <>
      {imagesLoaded && (
        <div id="indicators-carousel" className="relative w-full" data-carousel="static">
          <div className="relative w-full h-[500px]  overflow-hidden rounded-lg">
            {ArrayImagenes.map((imagen, index) => (
              <div key={index} className={`hidden duration-700 ease-in-out ${index === 0 ? 'active' : ''}`} data-carousel-item={index === 0 ? 'active' : ''}>
                <img
                  src={`https://backend-wolf-psi.vercel.app/imagen/${imagen}`}
                  className="absolute block -translate-x-1/2 object-cover  -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
            {ArrayImagenes.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${index === 0 ? 'active' : ''}`}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
              ></button>
            ))}
          </div>
          <button type="button" className="absolute top-0 hover:bg-black transition-all  hover:bg-opacity-20 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
          </button>
          <button type="button" className="absolute hover:bg-black hover:bg-opacity-20 transition-all top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
          </button>
        </div>
        )}
      </>
    );
  };
  
  export default CarrouselProduct;
  