import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  size?: "small" | "medium";
  indeterminate?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "medium",
      className,
      indeterminate,
      defaultChecked,
      checked,
      disabled,
      onChange,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const [internalChecked, setInternalChecked] = useState<boolean>(!!defaultChecked);

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    useEffect(() => {
      if (innerRef.current && typeof indeterminate === "boolean") {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isControlled = typeof checked === "boolean";
    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    const sizeClass = size === "small" ? "size-[14px]" : "size-5";

    const baseClasses = [
      // core box
      "peer cursor-pointer rounded-md border-2",
      sizeClass,
      "border-white/20 bg-black/30",
      "transition-colors duration-300 ease-in-out",
      // enforce site accent color for native checkmark
      "accent-blue-500",
      disabled ? "" : "hover:border-blue-500 hover:bg-blue-500/10",
      "checked:bg-blue-600 checked:border-blue-500",
      "focus:outline-none focus:ring-2 focus:ring-blue-500",
      disabled ? "cursor-not-allowed opacity-60" : "",
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className="inline-flex items-center justify-start gap-2">
        <input
          ref={innerRef}
          type="checkbox"
          className={baseClasses}
          aria-checked={indeterminate ? "mixed" : currentChecked}
          disabled={disabled}
          checked={currentChecked}
          onChange={handleChange}
          {...rest}
        />
        {label && (
          <span className="text-white/80 text-sm peer-disabled:cursor-not-allowed peer-disabled:text-white/40">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
