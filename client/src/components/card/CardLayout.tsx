import React from "react";

function CardLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(100dvh-4rem)] w-11/12">{children}</div>;
}
function CardLayoutTitle({
  children,
}: {
  children: string | React.ReactElement;
}) {
  return (
    <p className="py-4 text-center text-4xl font-bold uppercase">{children}</p>
  );
}

function CardLayoutBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className: React.ComponentProps<"div">["className"];
}) {
  return (
    <div
      className={`my-4 grid  gap-4 overflow-y-scroll rounded-md ${className} `}
    >
      {children}
    </div>
  );
}
function CardLayoutHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}) {
  return <div className={className}>{children}</div>;
}

CardLayout.Header = CardLayoutHeader;
CardLayout.Body = CardLayoutBody;
CardLayout.Title = CardLayoutTitle;
export default CardLayout;
