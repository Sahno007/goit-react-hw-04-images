import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handlerCloseModal, selectedIMG }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      handlerCloseModal();
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [handlerCloseModal]);

  const onOverlayClick = ({ target }) => {
    if (!target.classList.contains('overlay')) {
      return;
    }
    handlerCloseModal();
  };

  return (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="modal">
        <img className="image-original" src={selectedIMG} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  selectedIMG: PropTypes.string.isRequired,
  handlerCloseModal: PropTypes.func.isRequired,
};