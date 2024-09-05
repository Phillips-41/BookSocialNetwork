package com.Library.BookStore.feedback;

import com.Library.BookStore.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("feedbacks")
@Tag(name = "Feedback")
public class FeedBackController {
    private final FeedBackService service;
    @PostMapping
    public ResponseEntity<Integer> saveFeedBack(@RequestBody @Valid FeedBackRequest request,
                                                Authentication connectedUser){
       return ResponseEntity.ok(service.saveFeedback(request,connectedUser));
    }
    @GetMapping("/book/{book-id}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBackByBook(
            @PathVariable("book-id") Integer bookId,
            @RequestParam(name = "page",defaultValue = "0",required = false) int page,
            @RequestParam(name = "size",defaultValue = "10",required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBackByBook(bookId,page,size, connectedUser));
    }
}
