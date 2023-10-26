import ImageItem from './ImageItem';
import PropTypes from 'prop-types';

const ImageGalery = ({ handlerImageClick, items }) => {
  return (
    <ul className="gallery">
      {items.map(item => (
        <ImageItem
          handlerImageClick={handlerImageClick}
          key={item.id}
          largeImageURL={item.largeImageURL}
          previewImage={item.webformatURL}
        />
      ))}
    </ul>
  );
};

export default ImageGalery;

ImageGalery.propTypes = {
  handlerImageClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};