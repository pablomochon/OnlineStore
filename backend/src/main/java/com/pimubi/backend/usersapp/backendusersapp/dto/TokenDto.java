package com.pimubi.backend.usersapp.backendusersapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenDto {

    private String token;

    public TokenDto() {
    }

    public TokenDto(String token) {
        this.token = token;
    }

    @JsonProperty("token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
