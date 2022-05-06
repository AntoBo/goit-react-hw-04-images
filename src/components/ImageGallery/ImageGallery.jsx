import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className="ImageGallery">
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
