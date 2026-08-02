import { ModalProps } from "react-native";

export type ModalAnimationType = "slide" | "none" | "fade" | undefined;
export type Options = Omit<ModalProps, "visible" | "onRequestClose">;
