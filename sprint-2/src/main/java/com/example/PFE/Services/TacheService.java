package com.example.PFE.Services;

import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.Commentaire.Commentaire;
import com.example.PFE.Entities.Document;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.Tache.TacheRequest;
import com.example.PFE.Entities.Tache.TacheResponse;
import com.example.PFE.Entities.User;
import com.example.PFE.Exceptions.TaskAlreadyExistsException;
import com.example.PFE.Exceptions.TaskNotFoundException;
import com.example.PFE.Repositories.AvancementRepository;
import com.example.PFE.Repositories.TacheRepository;
import com.example.PFE.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TacheService {

    private final TacheRepository tacheRepository;
    private final UserRepository userRepository;
    private final CommentaireService commentaireService;
    private  final  DocumentService documentService;
    private final AvancementRepository avancementRepository;

    public TacheResponse create(TacheRequest tach) {

        Tache tache= Tache.builder()
                .name(tach.getName())
                .valide(false)
                .description(tach.getDescription())
                .deadline(tach.getDeadline())
                .avancement(avancementRepository.findById(tach.getAvancementId()).get())
                .build();
        tache=tacheRepository.save(tache);

        TacheResponse task = TacheResponse.builder()
                .id(tache.getId())
                .name(tache.getName())
                .deadline(tache.getDeadline())
                .description(tache.getDescription())
                .valide(tache.isValide())
                .avancementId(tache.getAvancement().getId())
                .build();
        return task;

    }

public Tache update(Long id, TacheRequest tache) {
    Optional<Tache> isExistTache = tacheRepository.findById(id);

    if (isExistTache.isPresent()) {
        Tache existingTache = isExistTache.get();
        if (tache.getName() != null) {
            existingTache.setName(tache.getName());
        }
        if (tache.getDescription() != null) {
            existingTache.setDescription(tache.getDescription());
        }

        if (tache.getDeadline() != null) {
            existingTache.setDeadline(tache.getDeadline());
        }


        return tacheRepository.save(existingTache);
    } else {
        throw new TaskAlreadyExistsException(tache.getName());

    }

}

public void delete(Long id) {
    Optional<Tache> isExistTache = tacheRepository.findById(id);
    if (isExistTache.isPresent()) {
        List<Commentaire> commentaires=isExistTache.get().getCommentaires();
        List<Document> documents=isExistTache.get().getDocuments();
        for(Commentaire commentaire:commentaires){
            commentaireService.delete(commentaire.getId());
        }
        for(Document document:documents){
            documentService.delete(document.getId());
        }
        tacheRepository.deleteById(id);
    } else {
        throw new TaskNotFoundException(id);

    }

}

public List<TacheResponse> getAll(Long avancementId) {

    List<Tache> taches = tacheRepository.findAllByAvancement(avancementRepository.findById(avancementId).get());
    List<TacheResponse> tasks=new ArrayList<>();
    for (Tache tache : taches) {

        TacheResponse task = TacheResponse.builder()
                .id(tache.getId())
                .name(tache.getName())
                .deadline(tache.getDeadline())
                .description(tache.getDescription())
                .valide(tache.isValide())
                .build();
        tasks.add(task);

    }
    return tasks;
}

public TacheResponse get(String name) {
    Optional<Tache> isExistTache = tacheRepository.findByName(name);
    if (isExistTache.isPresent()) {
        Tache tache=isExistTache.get();

        TacheResponse task = TacheResponse.builder()
                .id(tache.getId())
                .name(tache.getName())
                .deadline(tache.getDeadline())
                .description(tache.getDescription())
                .valide(tache.isValide())
                .build();
        return task;
    } else {
        throw new TaskNotFoundException(name);
    }
}


public List<TacheResponse> getMyTasks(Principal connectedUser) {
    var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
    Optional<Avancement> avancement=avancementRepository.findByIntern_Id(user.getId());
    List<Tache> taches = tacheRepository.findAllByAvancement(avancement.get());
    List<TacheResponse> tasks=new ArrayList<>();
    for (Tache tache : taches) {

        TacheResponse task = TacheResponse.builder()
                .id(tache.getId())
                .name(tache.getName())
                .deadline(tache.getDeadline())
                .description(tache.getDescription())
                .valide(tache.isValide())
                .build();
        tasks.add(task);

    }
    return tasks;
}

    public void updateValide(boolean valid ,Long idTache ) {
        Optional<Tache> tache=tacheRepository.findById(idTache);
        if(tache.isPresent()){
            tache.get().setValide(valid);
        }
        else throw new TaskNotFoundException(idTache);
    }
}
