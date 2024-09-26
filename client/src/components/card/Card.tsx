import { Link } from "react-router-dom";
import {
  CardBodyTypes,
  CardTitleTypes,
  CardTypes,
} from "../../types/componentTypes/cardTypes";

function Card({ children, link }: CardTypes) {
  return <Link to={link}>{children}</Link>;
}
function CardTitle({ children, className }: CardTitleTypes) {
  return (
    <div
      className={`${className} bg-slate-800 px-2 py-2 text-xl font-semibold capitalize `}
    >
      {children}
    </div>
  );
}
function CardBody({ children }: CardBodyTypes) {
  return (
    <div className="flex h-64 flex-col  gap-2 overflow-y-scroll bg-slate-700 px-4 pt-2 ">
      {children}
    </div>
  );
}

Card.Body = CardBody;
Card.Title = CardTitle;
export default Card;
