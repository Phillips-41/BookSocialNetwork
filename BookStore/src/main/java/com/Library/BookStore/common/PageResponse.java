package com.Library.BookStore.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
   private List<T> content;
   private int number;
   private int size;
   private long totalElement;
   private int totalPages;
   private boolean first;
   private boolean last;
}
