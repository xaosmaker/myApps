export interface ModalContextType {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalTypes {
  children: React.ReactNode;
}

export interface ModalOpenTypes {
  children: React.ReactElement;
  opens: string;
}
export interface ModalWindowTypes {
  children: React.ReactElement;
  name: string;
}
