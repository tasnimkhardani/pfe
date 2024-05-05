package com.example.PFE.Services;

import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.Avancement.AvancementResponse;
import com.example.PFE.Entities.User;
import com.example.PFE.Exceptions.NotFoundException;
import com.example.PFE.Repositories.AvancementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvencementService {
    private final AvancementRepository avancementRepository;
    public List<AvancementResponse> avancements(User user) {
            List<Avancement> avancements = avancementRepository.findAllByprofSupervisor(user);
            List<AvancementResponse> stages = new ArrayList<>();
            for (Avancement avancement : avancements) {
                stages.add(AvancementResponse.builder()
                        .sujet(avancement.getSujet().getTitre())
                        .id(avancement.getId())
                        .intern(avancement.getIntern().getNom() + avancement.getIntern().getPrenom())
                        .internId(avancement.getIntern().getId())
                        .build());
            }
            return stages;

    }
}
