import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { FC, ReactNode, useMemo } from "react";

interface LazySectionProps {
    load: () => Promise<{ default: FC<any> }>;
    fallback?: ReactNode;
    props?: any;
}

export const LazySection: FC<LazySectionProps> = ({ load, fallback = null, props }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '100px 0px',
        threshold: 0,
    });

    const DynamicComponent = useMemo(() => dynamic(load, { loading: () => fallback || null, ssr: false }), [load, fallback]);

    return <div ref={ref}>{inView ? <DynamicComponent {...props} /> : fallback}</div>;
};
