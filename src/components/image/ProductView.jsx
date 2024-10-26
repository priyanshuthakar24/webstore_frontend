import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import styles

const ProductView = ({ images, style }) => {
  // Prepare images in the required format
  const galleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div>
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showThumbnails={true}
        showNav={false}
        thumbnailPosition="bottom"
        slideOnThumbnailOver={true} // Slide to image on thumbnail hover
      />
    </div>
  );
};

export default ProductView;
