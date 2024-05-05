package com.example.PFE.Repositories;


import com.example.PFE.Entities.Sujet;
import com.example.PFE.Entities.Candidature;
import com.example.PFE.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    @Query("SELECT cs.candidat.id FROM Candidature cs WHERE cs.id = :CandidatureId")
    Long findUserIdBySujetCandidatId(@Param("CandidatureId") Long CandidatureId);
    @Query("SELECT cs FROM Candidature cs WHERE cs.statut = 'ATTENTE'")
    List<Candidature> findAllByStatutAttente();
    @Query("SELECT cs FROM Candidature cs WHERE cs.statut = 'ACCEPTE'")
    List<Candidature> findAllByStatutAccepter();
    boolean existsByCandidatAndSujet(User candidat, Sujet sujet);

}
