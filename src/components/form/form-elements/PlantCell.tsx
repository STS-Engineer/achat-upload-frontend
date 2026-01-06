import { useState, useRef } from "react";

type PlantCellProps = {
  plant?: string | null;
};

const PlantCell = ({ plant }: PlantCellProps) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  if (!plant) {
    return <span className="text-gray-400 italic">N/A</span>;
  }

  const handleMouseEnter = () => {
    const el = textRef.current;
    if (!el) return;

    // ✅ show card only if text is truncated
    const isTruncated = el.scrollWidth > el.clientWidth;
    if (!isTruncated) return;

    const rect = el.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left,
    });
  };

  return (
    <>
      <p
        ref={textRef}
        className="truncate max-w-[180px] cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setPos(null)}
      >
        {plant}
      </p>

      {pos && (
        <div
          className="
            fixed z-[999]
            inline-block w-auto
            max-w-[500px]
            rounded-lg
            bg-white dark:bg-gray-800
            p-3 text-sm text-gray-700 dark:text-gray-200
            shadow-xl border border-gray-200 dark:border-gray-700
            whitespace-normal break-words
          "
          style={{
            top: pos.top,
            left: pos.left,
          }}
        >
          {plant}
        </div>
      )}
    </>
  );
};

export default PlantCell;
