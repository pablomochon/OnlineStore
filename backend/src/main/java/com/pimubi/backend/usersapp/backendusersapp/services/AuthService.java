package com.pimubi.backend.usersapp.backendusersapp.services;

import com.nimbusds.jose.JOSEException;
import com.pimubi.backend.usersapp.backendusersapp.dto.AuthenticationRequest;
import com.pimubi.backend.usersapp.backendusersapp.dto.TokenDto;
import com.pimubi.backend.usersapp.backendusersapp.models.entities.User;
import com.pimubi.backend.usersapp.backendusersapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TokenDto login(AuthenticationRequest authenticationRequest) throws JOSEException, AuthenticationException {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        // Buscar el usuario por nombre de usuario en la base de datos
        User user = userRepository.findByUsername(username);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            // Las credenciales son inválidas
            throw new AuthenticationException("Invalid username or password");
        }

        // Obtener el rol del usuario
        String role = user.getRole();

        // Verificar si el usuario es administrador
        boolean isAdmin = role.equalsIgnoreCase("admin");

        // Generar el token JWT
        String token = tokenProvider.generateToken(username, role, isAdmin);

        // Crear y devolver el objeto TokenDto
        return new TokenDto(token);
    }
}
