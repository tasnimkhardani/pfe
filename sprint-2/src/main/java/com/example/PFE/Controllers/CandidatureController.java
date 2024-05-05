package com.example.PFE.Controllers;

import com.example.PFE.Entities.Candidatures;
import com.example.PFE.Entities.Document;
import com.example.PFE.Entities.Candidature;
import com.example.PFE.Entities.User;
import com.example.PFE.Services.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CandidatureController {
    private final CandidatureService candidatureService;

    @PostMapping("/postuler")
    public ResponseEntity<String> postuler(
            Principal candidat,
            @RequestParam("sujetID") Long sujetID,
            @RequestParam("CV") MultipartFile file) throws IOException {
        var user = (User)((UsernamePasswordAuthenticationToken) candidat).getPrincipal();

        Candidature sujetCandidat = candidatureService.postuler(user.getId(), sujetID, file);

        if (sujetCandidat != null) {
            return ResponseEntity.ok("Succès"); // Return success message in French
        } else {
            return ResponseEntity.ok("Le candidat a déjà postulé pour ce sujet."); // Return message if candidate has already applied in French
        }


    }
    @GetMapping("/candidature/download/{name}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String name) {
        Document file = candidatureService.getFile(name);

        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }

    @PutMapping("/candidature/accepter/{candidatureId}")
    public ResponseEntity<String> accepterCandidat(@PathVariable("candidatureId") Long candidatSujetId) {
        try {
            candidatureService.accepterCandidat(candidatSujetId);
            return ResponseEntity.ok("Candidat accepté avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de l'acceptation du candidat : " + e.getMessage());
        }
    }

    @PutMapping("/candidature/rejeter/{candidatSujetId}")
    public ResponseEntity<String> rejeterCandidat(@PathVariable Long candidatSujetId) {
        try {
            candidatureService.rejeterCandidat(candidatSujetId);
            return ResponseEntity.ok("Candidat rejeté avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec du rejet du candidat : " + e.getMessage());
        }
    }
    @GetMapping("/candidature/all")
    public ResponseEntity<?> getAllCandidatures() {
        try {
            List<Candidatures> candidaturesList = candidatureService.getAllCandidatures();
            return ResponseEntity.ok(candidaturesList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la récupération de toutes les candidatures : " + e.getMessage());
        }
    }
    @GetMapping("/candidature/accepete")
    public ResponseEntity<?> getAllCandidaturesAccepte() {
        try {
            List<Candidatures> candidaturesList = candidatureService.getAcceptedCandidatures();
            return ResponseEntity.ok(candidaturesList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec de la récupération de toutes les candidatures : " + e.getMessage());
        }
    }
    @PostMapping("/candidature/encadrant")
    public ResponseEntity<String> AssocierEncadrant(@RequestBody Map<String, Long> ids) {
        try {
            candidatureService.AssocierEncadrant(ids.get("Encadrant_Id"), ids.get("Intern_Id"));
            return ResponseEntity.ok().body("succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Échec d'associer l'encadrant au sujet");
        }
    }


}
