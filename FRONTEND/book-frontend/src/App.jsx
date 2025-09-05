import React, { useState, useEffect } from 'react'
import BookForm from './components/bookform'
import BookList from './components/booklist'
import { getBooks, createBook, updateBook, deleteBook } from './services/bookservice'

export default function App() {
  const [books, setBooks] = useState([])
  const [editing, setEditing] = useState(null) // book being edited

  const fetchBooks = async () => {
    try {
      const res = await getBooks()
      setBooks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchBooks() }, [])

  const handleCreate = async (book) => {
    await createBook(book)
    fetchBooks()
  }

  const handleUpdate = async (id, book) => {
    await updateBook(id, book)
    setEditing(null)
    fetchBooks()
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return
    await deleteBook(id)
    fetchBooks()
  }

  const handleEdit = (book) => {
    setEditing(book)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
      <h1>Book Manager — MVP</h1>
      <BookForm
        key={editing ? editing.id : 'new'}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editing={editing}
        onCancel={() => setEditing(null)}
      />
      <hr />
      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
