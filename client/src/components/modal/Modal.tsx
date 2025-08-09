import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type {
  ModalContextType,
  ModalOpenTypes,
  ModalTypes,
  ModalWindowTypes,
} from "../../types/componentTypes/modalTypes";
import { X } from "lucide-react";

const initialValue = {
  openName: "",
  close: () => null,
  open: () => "",
};

const ModalContext = createContext<ModalContextType>(initialValue);

function Modal({ children }: ModalTypes) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalOpen({ children, opens: opensWindowName }: ModalOpenTypes) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function ModalWindow({ children, name }: ModalWindowTypes) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className=" h-svh w-svw fixed left-0 top-0 z-50 text-slate-50 backdrop-blur-md transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-slate-900 bg-slate-900 px-6 py-4 shadow-lg shadow-slate-700 md:w-auto "
        ref={ref}
      >
        <button
          className="absolute right-2 top-2 bg-none p-2 text-lg transition-all duration-200 hover:text-slate-100"
          onClick={close}
        >
          <X />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = ModalOpen;
Modal.Window = ModalWindow;

export default Modal;
export { ModalContext }
