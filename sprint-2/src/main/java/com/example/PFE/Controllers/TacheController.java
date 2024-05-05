package com.example.PFE.Controllers;


import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.Tache.TacheRequest;
import com.example.PFE.Entities.Tache.TacheResponse;
import com.example.PFE.Exceptions.TaskAlreadyExistsException;
import com.example.PFE.Exceptions.TaskNotFoundException;
import com.example.PFE.Services.TacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TacheController {
    private final TacheService tacheService;

    @PostMapping("/create")
    public ResponseEntity<?> createTache(@RequestBody TacheRequest tache) {
        try {
            TacheResponse createdTache = tacheService.create(tache);
            return ResponseEntity.ok(createdTache);
        } catch (TaskAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTache(@PathVariable("id") Long id, @RequestBody TacheRequest tache) {
        try {
            Tache updatedTache = tacheService.update(id, tache);
            return ResponseEntity.ok().body("la tache a été mettre a jour avec succes");
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTache (@PathVariable("id") Long id) {
        try {
            tacheService.delete(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Tache supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/getAll/{avancementId}")
    public ResponseEntity<List<TacheResponse>> getAllTaches(@PathVariable Long avancementId) {
        List<TacheResponse> taches = tacheService.getAll(avancementId);
        return ResponseEntity.ok(taches);
    }
    @GetMapping("/getMyTasks")
    public ResponseEntity<?> getTacheByName(Principal currentUser) {
        try {
            List<TacheResponse> taches = tacheService.getMyTasks(currentUser);
            return ResponseEntity.ok(taches);
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/get/{name}")
    public ResponseEntity<?> getTacheByName(@PathVariable("name") String name) {
        try {
            TacheResponse tache = tacheService.get(name);
            return ResponseEntity.ok(tache);
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/valide/{idTache}/{isValid}")
    public ResponseEntity<?> getTacheStatus(@PathVariable("isValid") boolean valid,@PathVariable("idTache") Long idTahe) {
        try {
            tacheService.updateValide(valid,idTahe);
            return ResponseEntity.ok().body("la tache est "+valid);
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
