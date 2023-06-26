package com.pimubi.backend.usersapp.backendusersapp.controllers;

import com.nimbusds.jose.JOSEException;
import com.pimubi.backend.usersapp.backendusersapp.dto.AuthenticationRequest;
import com.pimubi.backend.usersapp.backendusersapp.dto.Response;
import com.pimubi.backend.usersapp.backendusersapp.dto.TokenDto;
import com.pimubi.backend.usersapp.backendusersapp.services.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authenticationService;

    @RequestMapping(value = {"/login"}, produces = "application/json", method = POST)
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)
            throws AuthenticationException, JOSEException, com.pimubi.backend.usersapp.backendusersapp.services.AuthenticationException {

        TokenDto loggedInUserInfo = authenticationService.login(authenticationRequest); // return tokendto
        return Response.success(loggedInUserInfo).toResponseEntity();
    }
}
