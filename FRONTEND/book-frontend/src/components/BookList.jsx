import React from 'react'

export default function BookList({ books, onEdit, onDelete }) {
  return (
    <div>
      <h3>Books ({books.length})</h3>
      <table width="100%" border="1" cellPadding="6" style={{ borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>ISBN</th><th>Published</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign:'center' }}>No books yet</td></tr>
          )}
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.publishedDate}</td>
              <td>
                <button onClick={() => onEdit(b)}>Edit</button>
                <button onClick={() => onDelete(b.id)} style={{ marginLeft:8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
