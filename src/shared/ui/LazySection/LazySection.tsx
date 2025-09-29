import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { ReactNode, ComponentType, JSX } from "react";

interface LazySectionProps<T extends JSX.IntrinsicAttributes> {
  load: () => Promise<{ default: ComponentType<T> }>;
  fallback?: ReactNode;
  props?: T;
}

export function LazySection<T extends JSX.IntrinsicAttributes>({
  load,
  fallback = null,
  props,
}: LazySectionProps<T>) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
    threshold: 0,
  });

  const DynamicComponent = dynamic(load, {
    loading: () => fallback || null,
    ssr: false,
  }) as ComponentType<T>;

  return <div ref={ref}>{inView ? <DynamicComponent {...(props as T)} /> : fallback}</div>;
}