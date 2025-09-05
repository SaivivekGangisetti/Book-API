import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:2030/api/books' })

export const getBooks = () => API.get("")   // no "/"
export const getBook = id => API.get(`/${id}`)
export const createBook = book => API.post("", book)
export const updateBook = (id, book) => API.put(`/${id}`, book)
export const deleteBook = id => API.delete(`/${id}`)
