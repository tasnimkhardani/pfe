package com.example.PFE.Services;

import com.example.PFE.Auth.Token.VerificationToken;
import com.example.PFE.Auth.Token.VerificationTokenRepository;
import com.example.PFE.Entities.ChangePasswordRequest;
import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findUsers();
    }


    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void saveUserVerificationToken(User theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }
    @Override
    public String validateToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if(token == null){
            return "Jeton de vérification invalide";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
            tokenRepository.delete(token);
            return "Le jeton a déjà expiré";
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "valide";
    }
    public User updateUser(Long userId, User newUserDetails) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (newUserDetails.getNom() != null) {
                user.setNom(newUserDetails.getNom());
            }
            if (newUserDetails.getPrenom() != null) {
                user.setPrenom(newUserDetails.getPrenom());
            }
            if (newUserDetails.getEmail() != null) {
                user.setEmail(newUserDetails.getEmail());
            }
            if (newUserDetails.getTelephone() != null) {
                user.setTelephone(newUserDetails.getTelephone());
            }



            return userRepository.save(user);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'identifiant : " + userId);
        }
    }
    public User update(Principal connectedUser, User newUserDetails) {
        var user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (newUserDetails.getNom() != null) {
            user.setNom(newUserDetails.getNom());
        }
        if (newUserDetails.getPrenom() != null) {
            user.setPrenom(newUserDetails.getPrenom());
        }
        if (newUserDetails.getEmail() != null) {
            user.setEmail(newUserDetails.getEmail());
        }
        if (newUserDetails.getTelephone() != null) {
            user.setTelephone(newUserDetails.getTelephone());
        }


        return userRepository.save(user);
    }
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

}
