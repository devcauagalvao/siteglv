import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems, Portal } from "@headlessui/react";
import { CheckCircle, ChevronDown } from "lucide-react";

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

const glassFieldBaseClass =
  "w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-inner shadow-white/10 bg-white/5 text-white border border-white/10 placeholder-white/50 caret-white/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-white/15 hover:bg-white/10";

const glassFieldErrorClass = "border-red-500/40 focus:border-red-500/50";

const glassChoiceBaseClass =
  "w-full rounded-xl px-4 py-3 text-left text-sm font-semibold shadow-inner shadow-white/10 bg-white/5 text-white border border-white/10 hover:bg-white/10 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20 transition-all flex items-center gap-3";

const glassChoiceSelectedClass = "bg-white/10 border-white/20 shadow-2xl shadow-white/10";

const glassCardBaseClass =
  "rounded-xl shadow-inner shadow-white/10 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx(glassCardBaseClass, className)}>{children}</div>;
}

export function GlassItemRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <GlassCard className={cx("p-3", className)}>{children}</GlassCard>;
}

export type GlassDropdownOption = { label: string; value: string };

export type GlassDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: GlassDropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
};

export function GlassDropdown({
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  disabled,
  hasError,
}: GlassDropdownProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Menu>
      <MenuButton
        disabled={disabled}
        className={cx(
          "inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-inner shadow-white/10",
          "bg-white/5 text-white border border-white/10",
          "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20",
          "data-[hover]:bg-white/10 data-[open]:bg-white/10",
          disabled && "cursor-not-allowed opacity-60",
          hasError && "border-red-500/40 focus-visible:outline-red-500/40"
        )}
      >
        <span className={value ? "text-white" : "text-white/50"}>{selectedLabel ?? placeholder}</span>
        <ChevronDown className="w-4 h-4 text-white/60" />
      </MenuButton>

      <Portal>
        <MenuItems
          transition
          anchor="bottom start"
          className="z-[2147483647] w-[var(--button-width)] origin-top-left rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl p-1 text-sm text-white shadow-2xl transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          style={{ zIndex: 2147483647 }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-[focus]:bg-white/10"
              >
                <span className={value === opt.value ? "text-white" : "text-white/80"}>{opt.label}</span>
                {value === opt.value && <CheckCircle className="ml-auto w-4 h-4 text-white/70" />}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Portal>
    </Menu>
  );
}

export type GlassInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(glassFieldBaseClass, hasError && glassFieldErrorClass, className)}
        {...props}
      />
    );
  }
);
GlassInput.displayName = "GlassInput";

export type GlassTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cx(glassFieldBaseClass, hasError && glassFieldErrorClass, className)}
        {...props}
      />
    );
  }
);
GlassTextarea.displayName = "GlassTextarea";

export type GlassChoiceButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  motionProps?: MotionProps;
};

export function GlassChoiceButton({
  selected,
  onClick,
  children,
  className,
  labelClassName = "font-medium",
  motionProps,
}: GlassChoiceButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cx(
        glassChoiceBaseClass,
        selected ? glassChoiceSelectedClass : "text-white/80",
        className
      )}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      {...motionProps}
    >
      <CheckCircle
        className={cx(
          "w-5 h-5 flex-shrink-0 transition-all",
          selected ? "text-white/80" : "text-white/35"
        )}
        fill={selected ? "currentColor" : "none"}
      />
      <span className={labelClassName}>{children}</span>
    </motion.button>
  );
}
