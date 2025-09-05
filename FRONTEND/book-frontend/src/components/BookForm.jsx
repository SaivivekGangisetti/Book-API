import React, { useState, useEffect } from 'react'

export default function BookForm({ onCreate, onUpdate, editing, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishedDate: ''
  })

  useEffect(() => {
    if (editing) {
      // format LocalDate -> yyyy-MM-dd expected by <input type="date">
      setForm({
        title: editing.title || '',
        author: editing.author || '',
        isbn: editing.isbn || '',
        publisher: editing.publisher || '',
        publishedDate: editing.publishedDate || ''
      })
    }
  }, [editing])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      await onUpdate(editing.id, form)
    } else {
      await onCreate(form)
      setForm({ title:'', author:'', isbn:'', publisher:'', publishedDate:'' })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'grid', gap:8 }}>
      <h3>{editing ? 'Edit Book' : 'Add Book'}</h3>

      <input name="title" required placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="author" required placeholder="Author" value={form.author} onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
      <input name="publisher" placeholder="Publisher" value={form.publisher} onChange={handleChange} />
      <input name="publishedDate" type="date" placeholder="Published Date" value={form.publishedDate || ''} onChange={handleChange} />

      <div>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
      </div>
    </form>
  )
}
