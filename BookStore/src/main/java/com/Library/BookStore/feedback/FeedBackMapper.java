package com.Library.BookStore.feedback;

import com.Library.BookStore.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedBackMapper {
    public FeedBack toFeedBackMap(FeedBackRequest request) {
        return FeedBack.builder()
                .note(request.note())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .shareable(false) // Not required and has no impact :: just to satisfy lombok
                        .archived(false)
                        .build())
                .build();
    }


    public FeedBackResponse toFeedBackResponse(FeedBack f, Integer id) {
        return FeedBackResponse.builder()
                .note(f.getNote())
                .comment(f.getComment())
                .ownFeedBack(Objects.equals(f.getCreatedBy(),id))
                .build();

    }
}
