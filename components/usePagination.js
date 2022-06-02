import { useState } from 'react'

// θέλουμε να ξέρουμε: total # of items & items per page
const usePagination = (noOfRecords, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(noOfRecords / itemsPerPage)

  console.log('received # of products', noOfRecords)
  // παίζει μόνο στον client
  // const currentData = () => {
  //   const begin = (currentPage - 1) * itemsPerPage
  //   const end = begin + itemsPerPage
  //   return data.slice(begin, end)
  // }

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const jump = (page) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentPage, setCurrentPage, maxPage }
}

export default usePagination
