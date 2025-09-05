package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repo;

    public BookServiceImpl(BookRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + id));
    }

    @Override
    public Book createBook(Book book) {
        // Ensure id is null so JPA will insert
        book.setId(null);
        return repo.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + id));
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        existing.setIsbn(book.getIsbn());
        existing.setPublisher(book.getPublisher());
        existing.setPublishedDate(book.getPublishedDate());
        return repo.save(existing);
    }

    @Override
    public void deleteBook(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with id " + id);
        }
        repo.deleteById(id);
    }
}
