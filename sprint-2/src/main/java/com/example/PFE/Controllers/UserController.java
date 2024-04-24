package com.example.PFE.Controllers;

import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.UserRepository;
import com.example.PFE.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }
    @DeleteMapping("/user/delete/{userId}")
    ResponseEntity<String> deleteUser(@PathVariable Long userId){
        try {
            Optional<User> userExist = userRepository.findById(userId) ;
            if (userExist.isPresent()) {
                userRepository.deleteById(userId);
                return ResponseEntity.ok("utilisateur  supprimé avec succès");
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"utlisateur n'existe pas");

            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la suppression de l'utilisateur  : " + e.getMessage());
        }
    }
    @PutMapping("/user/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(userId, user);
            return ResponseEntity.ok("utilisateur  modifié avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la modification de l'utilisateur ");
        }
    }
}
