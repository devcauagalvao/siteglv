import React, { useLayoutEffect, useRef } from "react";

type AutoFitTextProps = {
  text: string;
  className?: string;
  max?: number;
  min?: number;
  step?: number;
  as?: keyof JSX.IntrinsicElements;
};

const AutoFitText: React.FC<AutoFitTextProps> = ({
  text,
  className,
  max = 28,
  min = 14,
  step = 1,
  as = "h3",
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    el.style.whiteSpace = "nowrap";
    el.style.display = "block";
    el.style.overflow = "hidden";

    const fit = () => {
      if (!el) return;
      let size = max;
      el.style.fontSize = `${size}px`;
      let guard = 0;
      while (el.scrollWidth > el.clientWidth && size > min && guard < 100) {
        size -= step;
        el.style.fontSize = `${size}px`;
        guard++;
      }
    };

    fit();

    const ro = new ResizeObserver(() => {
      fit();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [text, max, min, step]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} title={text}>
      {text}
    </Tag>
  );
};

export default AutoFitText;
