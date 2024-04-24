package com.example.PFE.Services;


import com.example.PFE.Entities.Role;
import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SeedDataService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        var newUser  = User.builder()
                .isEnabled(true)
                .nom("Tassnim")
                .prenom("Tassnim")
                .email("Tassnim")
                .telephone("123456")
                .password(passwordEncoder.encode("123456"))
                .role(Role.valueOf("ADMIN"))
                .build();
        userRepository.save(newUser);

    }
}