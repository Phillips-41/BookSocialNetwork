package com.Library.BookStore.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedBackRepository extends JpaRepository<FeedBack,Integer> {
    @Query("""
            SELECT feedBack
            FROM FeedBack feedBack
            WHERE book.owner.id =:userId
            """)
    Page<FeedBack> findAllFeedBackByOwner(Pageable pageable, Integer userId);
}
