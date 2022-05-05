import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map(({ id, tags, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
