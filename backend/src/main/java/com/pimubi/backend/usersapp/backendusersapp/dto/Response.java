package com.pimubi.backend.usersapp.backendusersapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public class Response<T> {
    private Status status;
    private List<T> items;

    public Response() {
    }

    private Response(Status status, T items) {
        this.status = status;
        this.items = items instanceof Collection
                ? new ArrayList((Collection) items)
                : Collections.singletonList(items);
    }

    @JsonProperty("status")
    public Status getStatus() {
        return this.status;
    }

    @JsonProperty("items")
    public List<T> getItems() {
        return items;
    }

    @JsonIgnore
    public T getItem() {
        return items.get(0);
    }

    public ResponseEntity<Response<T>> toResponseEntity() {
        HttpStatus responseStatus;
        switch (status) {
            case OTHER_ERROR: {
                responseStatus = HttpStatus.BAD_REQUEST;
                break;
            }
            case TOKEN_INVALID: {
                responseStatus = HttpStatus.UNAUTHORIZED;
                break;
            }
            case ACCESS_DENIED: {
                responseStatus = HttpStatus.FORBIDDEN;
                break;
            }
            default: {
                responseStatus = HttpStatus.OK;
            }
        }
        return new ResponseEntity<Response<T>>(this, responseStatus);
    }

    @Override
    public String toString() {
        return "Response{" +
                "status=" + status +
                ", items=" + items +
                '}';
    }

    public static <R> Response<R> success() {
        return new Response<R>(Status.OK, null);
    }

    public static <R> Response<R> success(R item) {
        return new Response<R>(Status.OK, item);
    }

    public static <R> Response<R> notFound(R item) {
        return new Response<>(Status.NOT_FOUND, item);
    }

    public static <R> Response<R> validationError(R item) {
        return new Response<>(Status.VALIDATION_ERROR, item);
    }

    public static <R> Response<R> tokenInvalid(R item) {
        return new Response<>(Status.TOKEN_INVALID, item);
    }

    public static <R> Response<R> failure(R item) {
        return new Response<>(Status.OTHER_ERROR, item);
    }

    public static <R> Response<R> accessDenied(R item) {
        return new Response<>(Status.ACCESS_DENIED, item);
    }

    public static enum Status {
        @JsonProperty("OK")
        OK,
        @JsonProperty("NF")
        NOT_FOUND,
        @JsonProperty("VE")
        VALIDATION_ERROR,
        @JsonProperty("OE")
        OTHER_ERROR,
        @JsonProperty("TI")
        TOKEN_INVALID,
        @JsonProperty("AD")
        ACCESS_DENIED,
    }
}