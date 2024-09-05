package com.Library.BookStore.feedback;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackResponse {
    private double note;
    private String comment;
    private boolean ownFeedBack;
}
