import { RotateCw } from "lucide-react";

type Size = "xl" | "lg" | "md" | "sm" | "xs"
export default function Loader({ size = "xl" }: { size?: Size }) {
  const variationSize: Record<Size, number> = { xl: 125, lg: 100, md: 75, sm: 50, xs: 25 }

  return <div className="h-full w-full flex justify-center items-center"><RotateCw className="animate-spin animm" size={variationSize[size]} /></div>
}
