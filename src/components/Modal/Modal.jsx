import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ modalItem, closeModal }) => {
  // const closeModal = useModalContext();

  useEffect(() => {
    //after mount
    window.addEventListener('keydown', handleEsc);

    //before unmount
    return () => window.removeEventListener('keydown', handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  const handleEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const { largeImageURL, tags } = modalItem;

  //render
  return createPortal(
    <div onClick={handleClick} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
