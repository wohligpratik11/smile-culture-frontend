import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/components/ui/button"

const Pagination = ({ currentPage = 5, totalPages = 10, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = []

    // Previous button
    pages.push(
      <Button
        key="prev"
        variant="ghost"
        className="h-10 w-10 p-0 text-customWhite  hover:bg-gray-800 hover:text-white"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
    )

    // First page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "ghost"}
        className={`w-10 h-10 p-0 ${currentPage === 1
          ? "bg-gradient-custom-gradient rounded-lg hover:bg-blue-700 text-customWhite font-bold"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        onClick={() => onPageChange(1)}
      >
        1
      </Button>
    )

    // Add first ellipsis
    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis1" className="text-gray-400">
          ...
        </span>
      )
    }

    // Add surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i < currentPage + 2 && i > currentPage - 2) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "ghost"}
            className={`w-10 h-10 p-0 ${currentPage === i
              ? "bg-gradient-custom-gradient rounded-lg hover:bg-blue-700 text-customWhite font-bold w-20 lg:!w-10"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        )
      }
    }

    // Add second ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="text-gray-400">
          ...
        </span>
      )
    }

    // Last page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "ghost"}
          className={`w-10 h-10 p-0 ${currentPage === totalPages
            ? "bg-gradient-custom-gradient rounded-lg hover:bg-blue-700 text-customWhite font-bold "
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    // Next button
    pages.push(
      <Button
        key="next"
        variant="ghost"
        className="h-10 w-10 p-0 text-customWhite  hover:bg-gray-800 hover:text-white"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    )

    return pages
  }

  return (
    <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-blueYonder w-full sm:w-[300px] md:w-auto lg:w-[300px] xl:w-auto overflow-x-auto">
      {renderPageNumbers()}
    </div>


  )
}

export default Pagination
