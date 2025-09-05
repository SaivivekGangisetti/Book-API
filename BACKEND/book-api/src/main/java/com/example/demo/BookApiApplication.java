package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookApiApplication extends ServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(BookApiApplication.class, args);
    }
}
