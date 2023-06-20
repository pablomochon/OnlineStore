package com.pimubi.backend.usersapp.backendusersapp.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pimubi.backend.usersapp.backendusersapp.dto.Response;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * The RestAccessDeniedHandler is called by the ExceptionTranslationFilter
 * to handle all {@link  org.springframework.security.access.AccessDeniedException}
 * These exception are thrown when the authentication is valid but access is not authorized.
 *
 */
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
            throws IOException {
        ObjectMapper objMapper = new ObjectMapper();

        Response responseWrapper = Response.accessDenied(accessDeniedException.getMessage());

        final HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper(response);
        wrapper.setStatus(SC_FORBIDDEN);
        wrapper.setContentType(APPLICATION_JSON_VALUE);
        wrapper.getWriter().println(objMapper.writeValueAsString(responseWrapper));
        wrapper.getWriter().flush();
    }
}


