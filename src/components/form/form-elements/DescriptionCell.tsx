import { useState } from "react";

const DescriptionCell = ({ description }: { description: string }) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  return (
    <>
      <p
        className="truncate max-w-[180px] cursor-help"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            top: rect.bottom - 10,
            left: rect.left,
          });
        }}
        onMouseLeave={() => setPos(null)}
      >
        {description}
      </p>

      {pos && (
        <div
          className="
            fixed z-[999]
            w-[320px] rounded-lg
            bg-white dark:bg-gray-800
            p-3 text-sm text-gray-700 dark:text-gray-200
            shadow-xl border border-gray-200 dark:border-gray-700
          "
          style={{
            top: pos.top,
            left: pos.left,
          }}
        >
          {description}
        </div>
      )}
    </>
  );
};

export default DescriptionCell;