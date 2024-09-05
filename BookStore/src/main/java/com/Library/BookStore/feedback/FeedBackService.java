package com.Library.BookStore.feedback;

import com.Library.BookStore.book.Book;
import com.Library.BookStore.book.BookRepository;
import com.Library.BookStore.common.PageResponse;
import com.Library.BookStore.exception.OperationPermittedException;
import com.Library.BookStore.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedBackService {
    private final BookRepository bookRepository;
    private final FeedBackMapper feedBackMapper;
    private final FeedBackRepository feedBackRepository;
    public Integer saveFeedback(FeedBackRequest request, Authentication connectedUser) {
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(()-> new EntityNotFoundException("Book is not found with that Id"+request.bookId()));
        if(book.isArchived() || !book.isShareable()){
            throw new OperationPermittedException("you cannot give feedback to this book");
        }
        User user = ((User) connectedUser.getPrincipal());
        if(Objects.equals(book.getOwner().getId(),user.getId())){
            throw new OperationPermittedException("you cannot feedback your own book");
        }
        FeedBack feedback=feedBackMapper.toFeedBackMap(request);
       return feedBackRepository.save(feedback).getId();
    }

    public PageResponse<FeedBackResponse> findAllFeedBackByBook(Integer bookId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<FeedBack> feedbacks = feedBackRepository.findAllFeedBackByOwner(pageable,user.getId());
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f-> feedBackMapper.toFeedBackResponse(f,user.getId()))
                .toList();
        return new PageResponse<>(
                feedBackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }


}
