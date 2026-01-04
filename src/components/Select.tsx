import React, { useEffect, useRef, useState } from "react";

type Option = { label: string; value: string };

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  clearable?: boolean;
  disabled?: boolean;
  dropdownPortalContainerId?: string; // accepted for API compatibility, unused in minimal variant
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  onValueChange,
  clearable = true,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const commitChange = (v: string) => {
    onChange?.(v);
    onValueChange?.(v);
  };

  const handleSelect = (v: string) => {
    commitChange(v);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    commitChange("");
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const openAndFocus = () => {
    if (!isOpen) {
      setIsOpen(true);
      setFocusedIndex(() => {
        const idx = options.findIndex((o) => o.value === value);
        return idx >= 0 ? idx : 0;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter") {
      if (isOpen && focusedIndex != null) {
        handleSelect(options[focusedIndex].value);
      } else {
        openAndFocus();
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(null);
    } else if (e.key === "ArrowDown") {
      openAndFocus();
      setFocusedIndex((prev) => {
        const next = prev == null ? 0 : Math.min((prev as number) + 1, options.length - 1);
        return next;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      openAndFocus();
      setFocusedIndex((prev) => {
        const next = prev == null ? options.length - 1 : Math.max((prev as number) - 1, 0);
        return next;
      });
      e.preventDefault();
    } else if (e.key === "Home") {
      openAndFocus();
      setFocusedIndex(0);
    } else if (e.key === "End") {
      openAndFocus();
      setFocusedIndex(options.length - 1);
    }
  };

  return (
    <div className="w-full">
      {label && <div className="text-white/80 text-sm mb-1">{label}</div>}
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => (disabled ? undefined : setIsOpen((o) => !o))}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={[
            "w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 pr-10 text-left text-sm font-medium text-white transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            disabled ? "cursor-not-allowed bg-black/20 text-white/40 border-white/5" : "",
            className || "",
          ].join(" ")}
        >
          {selectedLabel ?? placeholder ?? "Selecione"}
        </button>
        {clearable && !!(value ?? "") && !disabled ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={["w-5 h-5 transition-transform duration-300", isOpen ? "rotate-180" : ""].join(" ")}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        )}

        {isOpen && !disabled && (
          <ul
            className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-white/20 bg-black/90 py-1 text-sm shadow-xl backdrop-blur-2xl"
            role="listbox"
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isFocused = focusedIndex === idx;
              return (
                <li
                  key={opt.value}
                  className={[
                    "mx-1 flex cursor-pointer select-none items-center justify-between rounded px-3 py-2 text-sm",
                    isSelected ? "bg-white/10 font-semibold text-blue-400" : "text-white/90",
                    isFocused ? "bg-white/10" : "",
                    "hover:bg-white/10 hover:text-blue-400",
                  ].join(" ")}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-blue-400"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;