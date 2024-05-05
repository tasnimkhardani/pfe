package com.example.PFE.Repositories;


import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TacheRepository extends JpaRepository<Tache,Long> {
    Optional<Tache> findByName(String name);
    Optional<Tache> findById(Long id);
    List<Tache> findAllByAvancement(Avancement avancement);


}
