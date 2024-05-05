package com.example.PFE.Services;

import com.example.PFE.Entities.*;
import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CandidatureService {

    private final CandidatureRepository candidatSujetRepository;
    private final UserRepository userRepository;
    private final SujetRepository sujetRepository;
    private final DocumentRepository documentRepository;
    private final AvancementRepository avancementRepository;
    public Candidature postuler(Long candidatID, Long sujetID, MultipartFile file) throws IOException {
        Optional<User> candidat = userRepository.findById(candidatID);
        Optional<Sujet> sujet = sujetRepository.findById(sujetID);

        if (sujet.isPresent() && candidat.isPresent() && candidat.get().getRole()==Role.CANDIDAT) {
            boolean alreadyApplied = candidatSujetRepository.existsByCandidatAndSujet(candidat.get(), sujet.get());

            if (!alreadyApplied) {
                Document uploadedFile = uploadedFile(file); // Upload the file and get the File entity

                if (uploadedFile != null) {
                    Candidature sujetCandidat = new Candidature();
                    sujetCandidat.setCandidat(candidat.get());
                    sujetCandidat.setSujet(sujet.get());
                    sujetCandidat.setStatut(Statut.ATTENTE);
                    sujetCandidat.setFile(uploadedFile);
                    return candidatSujetRepository.save(sujetCandidat); // Save and return the SujetCandidat entity
                } else {
                    throw new IllegalStateException("Failed to upload file.");
                }
            }
        }
        return null;
    }


    public Document uploadedFile(MultipartFile file) throws IOException {
        Document newFile = documentRepository.save(Document.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .data(file.getBytes())
                .build());
        return newFile;
    }

    public Document getFile(String fileName) {
        return documentRepository.findByName(fileName);
    }

    public void accepterCandidat(Long candidatureId) {
        Optional<Candidature> optionalCandidatSujet = candidatSujetRepository.findById(candidatureId);
        if (optionalCandidatSujet.isPresent() && optionalCandidatSujet.get().getStatut()==Statut.ATTENTE) {
            Candidature candidature = optionalCandidatSujet.get();
            candidature.setStatut(Statut.ACCEPTE);
            candidatSujetRepository.save(candidature);
            Long userId=candidatSujetRepository.findUserIdBySujetCandidatId(candidatureId);
            userRepository.updateRoleByEmail(userId,Role.valueOf("INTERN"));
            Optional<User> user=userRepository.findById(userId);
            Avancement avancement=Avancement.builder()
                                .intern(user.get())
                                .sujet(candidature.getSujet())
                                .build();
            avancementRepository.save(avancement);

            //publisher.publishEvent(new SendMail(user));
        } else {
            throw new RuntimeException("Candidature non trouvé avec l'ID : " + candidatureId);
        }
    }

    public void rejeterCandidat(Long candidatSujetId) {
        Optional<Candidature> optionalCandidatSujet = candidatSujetRepository.findById(candidatSujetId);
        if (optionalCandidatSujet.isPresent()) {
            Candidature candidatSujet = optionalCandidatSujet.get();
            candidatSujet.setStatut(Statut.REJETE);
            candidatSujetRepository.save(candidatSujet);
            Optional<User> user=userRepository.findById(candidatSujetId);
            //publisher.publishEvent(new SendMail(user));

        } else {
            throw new RuntimeException("Candidature non trouvé avec l'ID : " + candidatSujetId);
        }
    }
    public List<Candidatures> getAllCandidatures() {
        List<Candidature> sujetCandidats = candidatSujetRepository.findAllByStatutAttente();
        List<Candidatures> candidaturesList = new ArrayList<>();

        for (Candidature sujetCandidat : sujetCandidats) {
            if(sujetCandidat.getStatut()==Statut.ATTENTE){
                Long userId = sujetCandidat.getCandidat().getId();
                Long sujetId = sujetCandidat.getSujet().getId();
                Long id=sujetCandidat.getId();
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

                Sujet sujet = sujetRepository.findById(sujetId)
                        .orElseThrow(() -> new RuntimeException("Sujet not found with id: " + sujetId));

                Candidatures candidatures = new Candidatures(id,user, sujet);
                candidaturesList.add(candidatures);
            }

        }

        return candidaturesList;
    }

    public List<Candidatures> getAcceptedCandidatures() {
        List<Candidature> sujetCandidats = candidatSujetRepository.findAllByStatutAccepter();
        List<Candidatures> candidaturesList = new ArrayList<>();

        for (Candidature sujetCandidat : sujetCandidats) {
            if(sujetCandidat.getStatut()==Statut.ACCEPTE){
                Long userId = sujetCandidat.getCandidat().getId();
                Long sujetId = sujetCandidat.getSujet().getId();
                Long id=sujetCandidat.getId();
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

                Sujet sujet = sujetRepository.findById(sujetId)
                        .orElseThrow(() -> new RuntimeException("Sujet not found with id: " + sujetId));

                Candidatures candidatures = new Candidatures(id,user, sujet);
                candidaturesList.add(candidatures);
            }

        }

        return candidaturesList;
    }
    public void AssocierEncadrant( Long Id_Encadrant,Long id_INTERN){
        Optional<User> Encadrant=userRepository.findById(Id_Encadrant);
        Optional<Avancement> avancement=avancementRepository.findByIntern_Id(id_INTERN);
        if(Encadrant.isPresent() && avancement.isPresent()){
            avancement.get().setProfSupervisor(Encadrant.get());
            avancementRepository.save(avancement.get());
        }
        else {
            throw new RuntimeException();
        }



    }

    }


