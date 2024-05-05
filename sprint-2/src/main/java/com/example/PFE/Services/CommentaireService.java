package com.example.PFE.Services;


import com.example.PFE.Entities.*;
import com.example.PFE.Entities.Commentaire.Commentaire;
import com.example.PFE.Entities.Commentaire.CommentaireRequest;
import com.example.PFE.Entities.Commentaire.CommentaireResponse;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Repositories.CommentaireRepository;
import com.example.PFE.Repositories.TacheRepository;
import com.example.PFE.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentaireService {
    private final CommentaireRepository commentaireRepository;
    private final UserRepository userRepository;
    private final TacheRepository tacheRepository;
    public CommentaireResponse create(CommentaireRequest commentaire,User user) {
        Optional<User> auteur=userRepository.findById(user.getId());
        Optional<Tache> tache=tacheRepository.findById(commentaire.getTacheID());
            if(auteur.isPresent() && tache.isPresent()){
                Commentaire comment=Commentaire.builder()
                        .date(commentaire.getDate())
                        .auteur(auteur.get())
                        .content(commentaire.getContent())
                        .tache(tache.get())
                        .build();
                comment= commentaireRepository.save(comment);
                return CommentaireResponse.builder()
                        .content(comment.getContent())
                        .auteurID(comment.getAuteur().getId())
                        .tacheID(comment.getTache().getId())
                        .date(comment.getDate())
                        .id(comment.getId())
                        .build();
            }
            else{
                throw new EntityNotFoundException("erreur lors de la creation d'un commentaire");
            }
    }
    public CommentaireResponse update(Long id, CommentaireRequest commentaire) {
        Optional<Commentaire> existingCommentaire = commentaireRepository.findById(id);
        if (existingCommentaire.isPresent()) {
            Commentaire updatedCommentaire = existingCommentaire.get();
            if (commentaire.getContent() != null) {
                updatedCommentaire.setContent(commentaire.getContent());
            }

            updatedCommentaire= commentaireRepository.save(updatedCommentaire);
            return CommentaireResponse.builder()
                    .content(updatedCommentaire.getContent())
                    .auteurID(updatedCommentaire.getAuteur().getId())
                    .tacheID(updatedCommentaire.getTache().getId())
                    .date(updatedCommentaire.getDate())
                    .id(updatedCommentaire.getId())
                    .build();
        } else {
            throw new EntityNotFoundException("Commentaire with id " + id + " not found");
        }
    }
    public void delete(Long id) {
        Optional<Commentaire> existingCommentaire = commentaireRepository.findById(id);
        if (existingCommentaire.isPresent()) {
            commentaireRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Commentaire with ID '" + id + "' not found.");
        }
    }

    public List<CommentaireResponse> getAll(Tache tache) {
        List<Commentaire> comments= commentaireRepository.findByTache(tache);
        List<CommentaireResponse> commentaires=new ArrayList<>();
        for(Commentaire comment:comments){
            commentaires.add(CommentaireResponse.builder()
                    .content(comment.getContent())
                    .auteurID(comment.getAuteur().getId())
                    .tacheID(comment.getTache().getId())
                    .date(comment.getDate())
                    .id(comment.getId())
                    .build());
        }
        return commentaires;
    }
}
