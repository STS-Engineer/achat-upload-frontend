import { useState, useEffect, useRef } from "react";

const DescriptionCell = ({ description }: { description: string }) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setPos(null);
      }
    };

    if (pos) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pos]);

  return (
    <>
      <p
        className="truncate max-w-[180px] cursor-help"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          console.log(rect);
          setPos({
            top: rect.bottom - 10 + window.scrollY,
            left: rect.left + window.scrollX,
          });
        }}
      >
        {description}
      </p>

      {pos && (
        <div
          ref={cardRef}
          className="
            fixed z-[999]
            w-[320px] max-h-[150px] overflow-y-auto rounded-lg
            bg-white dark:bg-gray-800
            p-3 text-sm text-gray-700 dark:text-gray-200
            shadow-xl border border-gray-200 dark:border-gray-700
          "
          style={{
            top: pos.top,
            left: pos.left,
          }}
          onMouseLeave={() => setPos(null)}
        >
          {description}
        </div>
      )}
    </>
  );
};

export default DescriptionCell;