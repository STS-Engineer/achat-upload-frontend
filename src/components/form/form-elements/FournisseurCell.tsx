import { useState } from "react";

type FournisseurCellProps = {
  fournisseur?: string | null;
};

const FournisseurCell = ({ fournisseur }: FournisseurCellProps) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  if (!fournisseur) {
    return <span className="text-gray-400 italic">N/A</span>;
  }

  return (
    <>
      <p
        className="truncate max-w-[180px] cursor-help"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            top: rect.bottom + 6,
            left: rect.left,
          });
        }}
        onMouseLeave={() => setPos(null)}
      >
        {fournisseur}
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
          {fournisseur}
        </div>
      )}
    </>
  );
};

export default FournisseurCell;
