import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Modal } from "react-native";
import ModalContext, { ModalContextType } from "../context";
import type { Options } from "../models";

const ModalProvider = ({ children }: PropsWithChildren) => {
  // Context State
  const [visible, setVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<Options>({});

  // Callback Functions
  const openModal = useCallback((component: ReactNode, options?: Options) => {
    setModalComponent(component);
    setModalProps(options);
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
        modalProps,
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
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
        {...modalProps}
      >
        {modalComponent && modalComponent}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
