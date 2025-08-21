import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Modal } from "react-native";
import ModalContext, { ModalContextType } from "../context";

const ModalProvider = ({ children }: PropsWithChildren) => {
  // Context State
  const [visible, setVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode>(null);

  // Callback Functions
  const openModal = useCallback((component: ReactNode) => {
    setModalComponent(component);
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  // Context Value
  const value: ModalContextType = useMemo(
    () => ({
      modalState: {
        visible,
      },
      openModal,
      closeModal,
    }),
    [visible, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children && children}
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={closeModal}
      >
        {modalComponent && modalComponent}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
