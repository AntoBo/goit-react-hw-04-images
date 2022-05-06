import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
  state = {};
  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.modalItem;
    return createPortal(
      <div onClick={this.handleClick} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
