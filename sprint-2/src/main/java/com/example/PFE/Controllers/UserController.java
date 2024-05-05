package com.example.PFE.Controllers;

import com.example.PFE.Entities.Role;
import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.UserRepository;
import com.example.PFE.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.example.PFE.Entities.ChangePasswordRequest;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    // sprint 1
    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/user/get/{userID}")
    public User getUser(@PathVariable Long userId){
            Optional<User> userExist = userRepository.findById(userId) ;
            if (userExist.isPresent()) {

                return userExist.get();
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"utlisateur n'existe pas");

            }
    }
    @GetMapping("/encadrants")
    public List<User> getEncadrants(){
        return userRepository.findByRole(Role.valueOf("PROF_SUPERVISOR"));
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
    @PutMapping("/user/update")
    public ResponseEntity<String> update(Principal currentUser, @RequestBody User user) {
        try {
            User updatedUser = userService.update(currentUser, user);
            return ResponseEntity.ok("utilisateur  modifié avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la modification de l'utilisateur ");
        }
    }
    @PutMapping("user/changePassword")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request, Principal connectedUser) {
        try {
            userService.changePassword(request, connectedUser);
            return ResponseEntity.ok("le mot de passe a été modifer avec succes");
        }catch (Exception e){
            return ResponseEntity.status(500).body("Échec de la modification du mot de passe ");
        }
    }
    @PutMapping("/user/updateEnabledStatus/{userId}")
    public ResponseEntity<String> updateEnabledStatus(@PathVariable Long userId, @RequestParam boolean isEnabled) {
        try {
            Optional<User > user=userRepository.findById(userId);
            userRepository.updateEnabledStatusById(user.get().getId(), isEnabled);
            //logout if isenabled is false
            return ResponseEntity.ok("Statut isEnabled de l'utilisateur mis à jour avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la mise à jour du statut isEnabled de l'utilisateur : " + userId);
        }
    }

}
