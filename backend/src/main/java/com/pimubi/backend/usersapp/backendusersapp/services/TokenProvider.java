package com.pimubi.backend.usersapp.backendusersapp.services;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static com.nimbusds.jose.JWSAlgorithm.HS256;

@Service
public class TokenProvider {
    private static final String IS_ADMIN = "admin";
    @Value("${jwt.signing.key.secret}")
    private String tokenSecret;
    private final static String ROLES_CLAIM = "role";

    public String generateToken(String subject, String role, boolean isAdmin) throws JOSEException {
        JWSSigner signer = new MACSigner(tokenSecret);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(subject)
                .issueTime(currentDate())
                .expirationTime(new Date(System.currentTimeMillis() + 3600000)) //60 min
                .claim(ROLES_CLAIM, StringUtils.join(role, ", "))
                .claim(IS_ADMIN, isAdmin)
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }
    private Date currentDate() {
        return new Date(System.currentTimeMillis());
    }

}
