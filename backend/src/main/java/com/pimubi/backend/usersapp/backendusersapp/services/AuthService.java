package com.pimubi.backend.usersapp.backendusersapp.services;

import com.nimbusds.jose.JOSEException;
import com.pimubi.backend.usersapp.backendusersapp.dto.AuthenticationRequest;
import com.pimubi.backend.usersapp.backendusersapp.dto.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private TokenProvider tokenProvider;
    public TokenDto login(AuthenticationRequest authenticationRequest) throws JOSEException {

        // TODO: compare password from auth request to the password in db
        String email = "pablo@gmail.com";
        List<String>roles = new ArrayList<>();
        boolean isAdmin = true;
        return new TokenDto(tokenProvider.generateToken( email, roles, isAdmin));
    }
}
