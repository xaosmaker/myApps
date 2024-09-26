import {
  CardLayoutBodyTypes,
  CardLayoutHeaderTypes,
  CardLayoutTitleTypes,
  CardLayoutTypes,
} from "../../types/componentTypes/cardTypes";

function CardLayout({ children }: CardLayoutTypes) {
  return <div className="h-[calc(100dvh-4rem)] w-11/12">{children}</div>;
}
function CardLayoutTitle({ children }: CardLayoutTitleTypes) {
  return (
    <div className="py-4 text-center text-4xl font-bold uppercase">
      {children}
    </div>
  );
}

function CardLayoutBody({ children, className }: CardLayoutBodyTypes) {
  return (
    <div
      className={`my-4 grid  gap-4 overflow-y-scroll rounded-md ${className} `}
    >
      {children}
    </div>
  );
}
function CardLayoutHeader({ children, className }: CardLayoutHeaderTypes) {
  return <div className={className}>{children}</div>;
}

CardLayout.Header = CardLayoutHeader;
CardLayout.Body = CardLayoutBody;
CardLayout.Title = CardLayoutTitle;
export default CardLayout;
