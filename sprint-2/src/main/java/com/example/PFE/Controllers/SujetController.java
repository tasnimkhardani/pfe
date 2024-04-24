package com.example.PFE.Controllers;

import com.example.PFE.Entities.Sujet;
import com.example.PFE.Repositories.SujetRepository;
import com.example.PFE.Services.SujetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
@RestController
public class SujetController {
    @Autowired
    private SujetService sujetService;
    @Autowired
    private SujetRepository sujetRepository;
    @PostMapping("/sujet/create")
    public ResponseEntity<?> createSujet(@RequestBody Sujet sujet) {
        try {
            Sujet newSujet = sujetService.createSujet(sujet);

            return ResponseEntity.ok(newSujet);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la création du sujet : " + e.getMessage());
        }
    }

    @PutMapping("/sujet/update/{id}")
    public ResponseEntity<?> updateSujet(@PathVariable Long id, @RequestBody Sujet sujet) {
        try {
            Sujet updatedSujet = sujetService.updateSujet(id, sujet);
            return ResponseEntity.ok(updatedSujet);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la mise à jour du sujet : " + e.getMessage());
        }
    }

    @DeleteMapping("/sujet/delete/{id}")
    public ResponseEntity<String> deleteSujet(@PathVariable Long id) {
        try {
            Optional<Sujet> sujetExist = sujetRepository.findById(id);
            if (sujetExist.isPresent()) {
                sujetRepository.deleteById(id);
                return ResponseEntity.ok("Sujet supprimé avec succès");
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"sujet nexiste pas");

            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la suppression du sujet : " + e.getMessage());
        }
    }

    @GetMapping("/sujet/get/{id}")
    public ResponseEntity<?> getSujetById(@PathVariable Long id) {
        try {
            Sujet sujet = sujetService.getSujetById(id);
            return ResponseEntity.ok(sujet);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la récupération du sujet : " + e.getMessage());
        }
    }

    @GetMapping("/sujets/all")
    public ResponseEntity<?> getAllSujets() {
        try {
            List<Sujet> sujets = sujetService.getAllSujets();
            return ResponseEntity.ok(sujets);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la récupération de tous les sujets : " + e.getMessage());
        }

    }
}
