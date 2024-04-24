package com.example.PFE.Auth;

import com.example.PFE.Auth.Token.VerificationToken;
import com.example.PFE.Auth.Token.VerificationTokenRepository;
import com.example.PFE.Entities.User;
import com.example.PFE.Exceptions.InvalidPasswordException;
import com.example.PFE.Exceptions.UserAlreadyExistsException;
import com.example.PFE.Exceptions.UserNotFoundException;
import com.example.PFE.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository tokenRepository;
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterationRequest registrationRequest, final HttpServletRequest request){
        try{
            if(registrationRequest.getRole()==null){
                return ResponseEntity.status(400).body("specifier le role");
            }

            User user = authenticationService.registerUser(registrationRequest);
            return  ResponseEntity.ok("le candidat est enrigster avec Succès ");
        }catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(500).body("Utilisateur avec l'adresse e-mail " + registrationRequest.getEmail() + " existe déjà");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("aucaun stagaire avec le e-mail "+registrationRequest.getEmailIntern());
        }
    }



    public String applicationURL(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non enregistré");
        } catch (InvalidPasswordException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'authentification");
        }
    }





}
