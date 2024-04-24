package com.example.PFE.Services;

import com.example.PFE.Entities.Sujet;
import com.example.PFE.Repositories.SujetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SujetService  {
    @Autowired
    private SujetRepository sujetRepository;

    public Sujet createSujet(Sujet sujet) {
        return sujetRepository.save(sujet);
    }

    public Sujet updateSujet(Long id, Sujet sujet) {
        Sujet existingSujet = sujetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sujet non trouvé"));

        existingSujet.setTitre(sujet.getTitre());
        existingSujet.setDescription(sujet.getDescription());

        return sujetRepository.save(existingSujet);
    }



    public Sujet getSujetById(Long id) {
        return sujetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sujet not found"));
    }

    public List<Sujet> getAllSujets() {
        return sujetRepository.findAll();
    }
}
