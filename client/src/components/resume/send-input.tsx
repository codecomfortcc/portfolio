import React, { useLayoutEffect, useRef, useState } from "react";
// Removed imports for:
// - cn
// - Textarea
// - Button
// - Send

interface DynamicChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  maxRows?: number;
  formClassName?: string;
  textareaClassName?: string;
  buttonClassName?: string;
}

const SendIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="m22 2-11 11" />
  </svg>
);

export const SendInput: React.FC<DynamicChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask something...",
  maxRows = 3,
  formClassName,
  textareaClassName,
  buttonClassName,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [currentHeight, setCurrentHeight] = useState<number | undefined>(
    undefined
  );
  const [overflowY, setOverflowY] = useState<"auto" | "hidden">("hidden");

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      const style = window.getComputedStyle(el);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const vPadding = paddingTop + paddingBottom;
      const borderTop = parseFloat(style.borderTopWidth);
      const borderBottom = parseFloat(style.borderBottomWidth);
      const vBorder = borderTop + borderBottom;

      let lineHeight = parseFloat(style.lineHeight);
      if (isNaN(lineHeight)) {
        const temp = document.createElement("div");
        temp.innerHTML = "&nbsp;";
        temp.style.cssText = `
          font-size: ${style.fontSize};
          font-family: ${style.fontFamily};
          font-weight: ${style.fontWeight};
          letter-spacing: ${style.letterSpacing};
          position: absolute;
          visibility: hidden;
          padding: 0;
          border: 0;
        `;
        document.body.appendChild(temp);
        lineHeight = temp.clientHeight;
        document.body.removeChild(temp);
      }

      const maxHeight = lineHeight * maxRows + vPadding + vBorder;

      el.style.height = "auto";
      const scrollHeight = el.scrollHeight;

      if (scrollHeight > maxHeight) {
        el.style.height = `${maxHeight}px`;
        setOverflowY("auto");
        setCurrentHeight(maxHeight);
      } else {
        el.style.height = `${scrollHeight}px`;
        setOverflowY("hidden");
        setCurrentHeight(scrollHeight);
      }
    }
  }, [value, maxRows, textareaRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const mockFormEvent = {
        ...e,
        preventDefault: () => e.preventDefault(),
        stopPropagation: () => e.stopPropagation(),
        target: e.currentTarget.form,
        currentTarget: e.currentTarget.form,
      } as unknown as React.FormEvent<HTMLFormElement>;

      onSubmit(mockFormEvent);
    }
  };

  const internalOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Replaced cn() with template literals for class names
  return (
    <form
      onSubmit={internalOnSubmit}
      className={`flex items-center justify-between gap-2 px-2 py-1 flex-shrink-0 bg-[#fff2e2] ${
        formClassName || ""
      }`}
    >
      {/* Replaced shadcn Textarea with standard textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={1}
        onKeyDown={handleKeyDown}
        style={{
          height: currentHeight ? `${currentHeight}px` : undefined,
          overflowY: overflowY,
        }}
      
        className={`flex-1 resize-none bg-transparent border-dash-core outline-none ring-0 border-none p-2 text-sm text-primary font-bold placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          textareaClassName || ""
        }`}
      />
      {/* Replaced shadcn Button with standard button */}
      <button
        type="submit"
        style={{
          width: currentHeight ? `${currentHeight}px` : undefined,
          height: currentHeight ? `${currentHeight}px` : undefined,
        }}
        // Added flex items-center justify-center and rounded-md to replicate "size=icon"
        // Added text-primary, hover:bg-primary/10 to match original style
        className={`flex-shrink-0 inline-flex items-center justify-center rounded-md text-sm font-medium bg-transparent text-primary stroke-primary border-dash-core hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-50 ${
          buttonClassName || ""
        }`}
      >
        <SendIcon className="h-4 w-4" />
      </button>
    </form>
  );
};

