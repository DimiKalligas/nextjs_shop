import { useState } from 'react'

const usePagination = (noOfRecords, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(noOfRecords / itemsPerPage)

  // const currentData = () => {
  const begin = (currentPage - 1) * itemsPerPage // η begin είναι σελίδα διορθωμένη ως προς το 1
  const end = begin + itemsPerPage
  // return data.slice(begin, end)
  // return { begin, end }
  // }

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

  console.log('inside usePagination, returning', jump, begin, end)
  return { jump, begin, end } //next, prev, currentPage, maxPage
}

export default usePagination
