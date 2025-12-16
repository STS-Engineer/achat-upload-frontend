import { useDispatch, useSelector } from "react-redux";
import documentIcon from "../../icons/excelIcon.svg";
import { useEffect, useState } from "react";
import { getDocuments } from "../../redux/documents/document";
import { Document } from "../../redux/documents/document-slice-types";
import Pagination from "../../components/common/Pagination";

const Documents = () => {
  const dispatch = useDispatch();
  const { documentsList } = useSelector((state: any) => state.document);
  const [page, setPage] = useState(1);
  const per_page = 5;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getDocuments(dispatch, page, per_page);
  }, [dispatch, page, per_page]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-600 mb-6">
        Documents
      </h1>

      {/* SINGLE CARD */}
      <div
        className="
          border-2 border-dashed border-gray-300
          rounded-2xl
          p-8
          bg-transparent
        "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
          {documentsList?.items?.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-48">
                <span className="text-xl text-gray-400 italic text-center">
                No documents available.
                </span>
            </div>
            ) : (
                documentsList?.items?.map((doc:Document) => (
              <div
                key={doc.id}
                className="
                    w-48 h-48
                    flex flex-col items-center justify-center
                    cursor-pointer
                    transition
                "
                >
                <img
                    src={documentIcon}
                    alt="Document"
                    className="w-24 h-24 mb-4 opacity-70"
                />
                <span className="text-sm text-gray-600 truncate max-w-[160px] text-center">
                    {doc.filename}
                </span>
              </div>
            ))
            )}
        </div>
      </div>
       <Pagination
          page={documentsList.page}
          totalPages={documentsList.total_pages}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default Documents;
