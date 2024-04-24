package com.example.PFE.Services;

import com.example.PFE.Entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getUsers();
    Optional<User> findByEmail(String email);
    void saveUserVerificationToken(User theUser, String verificationToken);

    String validateToken(String theToken);
}
