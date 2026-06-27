import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserPagination = ({
  pagination,
  onPageChange,
}) => {

  if (!pagination) return null;

  const {
    currentPage,
    totalPages,
  } = pagination;

  return (

    <div className="flex items-center justify-between mt-8">

      <button

        disabled={!pagination.hasPrevPage}

        onClick={() =>
          onPageChange(currentPage - 1)
        }

        className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          border
          disabled:opacity-40
          hover:bg-gray-100
        "

      >

        <ChevronLeft size={18} />

        Previous

      </button>

      <div className="flex gap-2">

        {Array.from(
          {
            length: totalPages
          },
          (_, index) => (

            <button

              key={index}

              onClick={() =>
                onPageChange(index + 1)
              }

              className={`
                w-10
                h-10
                rounded-lg
                font-semibold

                ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}

            >

              {index + 1}

            </button>

          )
        )}

      </div>

      <button

        disabled={!pagination.hasNextPage}

        onClick={() =>
          onPageChange(currentPage + 1)
        }

        className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          border
          disabled:opacity-40
          hover:bg-gray-100
        "

      >

        Next

        <ChevronRight size={18} />

      </button>

    </div>

  );

};

export default UserPagination;