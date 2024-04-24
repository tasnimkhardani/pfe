package com.example.PFE.Repositories;

import com.example.PFE.Entities.Sujet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SujetRepository extends JpaRepository<Sujet,Long> {
   Optional<Sujet> findById(Long id);

}
