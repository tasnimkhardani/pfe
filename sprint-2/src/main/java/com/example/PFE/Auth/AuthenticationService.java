package com.example.PFE.Auth;

import com.example.PFE.Auth.Token.VerificationTokenRepository;
import com.example.PFE.Entities.Role;
import com.example.PFE.Entities.User;
import com.example.PFE.Exceptions.InvalidPasswordException;
import com.example.PFE.Exceptions.UserAlreadyExistsException;
import com.example.PFE.Exceptions.UserNotFoundException;
import com.example.PFE.Repositories.UserRepository;
import com.example.PFE.Security.JwtService;
import com.example.PFE.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    public User registerUser(RegisterationRequest request) {
        if (userService.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("l'utilisateur existe déjà");
        }

        // Create a new user entity
        User newUser = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(request.getTelephone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .isEnabled(true)
                .build();

        newUser = userRepository.save(newUser);



        return newUser;
    }






    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non enregistré"));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new InvalidPasswordException("Mot de passe incorrect");
        }


        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .user(user)
                .build();
    }

}