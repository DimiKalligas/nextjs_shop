import { useState } from 'react'

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  // τι ρόλο παίζουν αυτές?
  // const next = () => {
  //   setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  // }

  // const prev = () => {
  //   setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  // }

  const jump = (page) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage))
  }

  return { jump, currentData } //next, prev, currentPage, maxPage
}

export default usePagination
