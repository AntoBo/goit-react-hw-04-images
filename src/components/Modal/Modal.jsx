import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ closeModal, modalItem }) => {
  useEffect(() => {
    //after mount
    window.addEventListener('keydown', handleEsc);

    //before unmount
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  const handleEsc = e => {
    if (e.code === 'Escape') {
      console.log('esc!');
      closeModal();
    }
  };

  console.log('modalItem is ', modalItem);
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
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEsc);
//   }
//   handleClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.closeModal();
//     }
//   };
//   handleEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     console.log('this.props.modalItem is ', this.props.modalItem);
//     console.log('this is ', this);
//     const { largeImageURL, tags } = this.props.modalItem;
//     return createPortal(
//       <div onClick={this.handleClick} className="Overlay">
//         <div className="Modal">
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;
