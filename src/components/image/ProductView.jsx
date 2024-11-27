import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import styles

const ProductView = ({ images, style }) => {
  const [currentImage, setCurrentImage] = useState(0);
  // Prepare images in the required format
  // const galleryImages = images.map((img) => ({
  //   original: img,
  //   thumbnail: img,
  // }));

  return (
    <div className="lg:p-5">
      <div className="flex-center flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-row lg:flex-col gap-1  lg:gap-4">
          <img
            src={images[0]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(0)}
            // onClick={() => setCurrentImage(0)}
            className="rounded-md cursor-pointer"
          />
          <img
            src={images[1]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(1)}
            // onClick={() => setCurrentImage(1)}
            className="rounded-md cursor-pointer"
          />
          <img
            src={images[2]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(2)}
            // onClick={() => setCurrentImage(2)}
            className="rounded-md cursor-pointer"
          />
          <img
            src={images[3]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(3)}
            // onClick={() => setCurrentImage(3)}
            className="rounded-md cursor-pointer"
          />
        </div>
        <div className="h-[40vh] lg:h-[60vh] lg:w-[20vw]">
          <img
            src={images[currentImage]}
            alt=""
            // width={480}
            // height={480}
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
      {/* <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showThumbnails={true}
        showNav={false}
        thumbnailPosition="bottom"
        slideOnThumbnailOver={true} // Slide to image on thumbnail hover
      /> */}
    </div>
  );
};

export default ProductView;
