package com.pimubi.backend.usersapp.backendusersapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableTransactionManagement
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public SecurityConfig() {
        // Ignores the default configuration, useless in our case (session management, etc..)
        super(true);
    }

    private CorsFilter corsFilter() {
        /*
         CORS requests are managed only if headers Origin and Access-Control-Request-Method are available on OPTIONS requests
         (this filter is simply ignored in other cases).
         This filter can be used as a replacement for the @Cors annotation.
        */
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        config.addAllowedHeader(HttpHeaders.ORIGIN);
        config.addAllowedHeader(HttpHeaders.CONTENT_TYPE);
        config.addAllowedHeader(HttpHeaders.ACCEPT);
        config.addAllowedHeader(HttpHeaders.AUTHORIZATION);
        config.addAllowedHeader(HttpHeaders.COOKIE);

        config.addAllowedMethod(HttpMethod.GET);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.POST);
        config.addAllowedMethod(HttpMethod.OPTIONS);
        config.addAllowedMethod(HttpMethod.DELETE);
        config.addAllowedMethod(HttpMethod.PATCH);

        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // That means that all spawned threads will contain the same SecurityContextHolder object
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);

        httpSecurity
                /*
                  Filters are added just after the ExceptionTranslationFilter so that Exceptions are catch by the exceptionHandling()
                  Further information about the order of filters, see FilterComparator
                 */
                .addFilterAfter(corsFilter(), ExceptionTranslationFilter.class)
                /*
                 Exception management is handled by the authenticationEntryPoint (for exception related to authentications)
                 and by the AccessDeniedHandler (for exception related to access rights)
                */
                .exceptionHandling()
                .authenticationEntryPoint(new SecurityAuthenticationEntryPoint())
                .accessDeniedHandler(new RestAccessDeniedHandler())
                .and()
                /*
                 anonymous() consider no authentication as being anonymous instead of null in the security context.
                */
                .anonymous()
                .and()
                /* No Http session is used to get the security context */
                .sessionManagement().sessionCreationPolicy(STATELESS)
                .and()
                .authorizeRequests()
                /* All access to the authentication service are permitted without authentication (actually as anonymous) */
                .antMatchers("/auth/**").permitAll()
                /* All the other requests need an authentication.
                 Role access is done on Methods using annotations like @PreAuthorize
                 */
                .anyRequest().authenticated();
    }
}



