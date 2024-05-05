package com.example.PFE.Controllers;


import com.example.PFE.Entities.Commentaire.CommentaireRequest;
import com.example.PFE.Entities.Commentaire.CommentaireResponse;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.TacheRepository;
import com.example.PFE.Services.CommentaireService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/commentaire")
@RequiredArgsConstructor
public class CommentaireController {
    private final CommentaireService commentaireService;
    private final TacheRepository tacheRepository;

    @PostMapping("/create")
    public ResponseEntity<CommentaireResponse> createCommentaire(@RequestBody CommentaireRequest commentaire, Principal auteur) {
        var user = (User)((UsernamePasswordAuthenticationToken) auteur).getPrincipal();
        CommentaireResponse createdCommentaire = commentaireService.create(commentaire,user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentaire);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCommentaire(@PathVariable("id") Long id, @RequestBody CommentaireRequest commentaire) {
        try {
            CommentaireResponse updatedCommentaire = commentaireService.update(id, commentaire);
            return ResponseEntity.ok(updatedCommentaire);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCommentaire(@PathVariable("id") Long id) {
        try {
            commentaireService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Commentaire with ID '" + id + "' deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CommentaireResponse>> getAllCommentairesByTache(@RequestParam("tacheId") Long tacheId) {
        Tache tache = tacheRepository.getById(tacheId);
        List<CommentaireResponse> commentaires = commentaireService.getAll(tache);
        return ResponseEntity.ok(commentaires);
    }
}
