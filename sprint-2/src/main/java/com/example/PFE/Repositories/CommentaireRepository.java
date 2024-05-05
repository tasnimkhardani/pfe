package com.example.PFE.Repositories;


import com.example.PFE.Entities.Commentaire.Commentaire;
import com.example.PFE.Entities.Tache.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire,Long> {
    List<Commentaire> findByTache(Tache tache);
    Optional<Commentaire> findById(Long id);


}
