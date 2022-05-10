import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal/Modal';

const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const toggleModal = (modalItem = null) => {
    setIsModalOpen(prev => !prev);
    setModalItem(modalItem);
  };

  return (
    <ModalContext.Provider value={toggleModal}>
      {children}
      {isModalOpen && <Modal modalItem={modalItem} closeModal={toggleModal} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
