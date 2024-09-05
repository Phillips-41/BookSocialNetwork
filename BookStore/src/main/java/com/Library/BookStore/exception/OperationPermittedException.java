package com.Library.BookStore.exception;

public class OperationPermittedException extends RuntimeException {
    public OperationPermittedException(String msg) {
        super(msg);
    }
}
