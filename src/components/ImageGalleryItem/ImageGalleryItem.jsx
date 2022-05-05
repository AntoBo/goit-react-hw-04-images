const ImageGalleryItem = ({ id, tags, largeImageURL, webformatURL }) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
