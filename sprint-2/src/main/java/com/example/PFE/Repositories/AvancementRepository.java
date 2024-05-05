package com.example.PFE.Repositories;

import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvancementRepository extends JpaRepository<Avancement, Long> {
    Optional<Avancement> findByIntern_Id(Long internId);

    @Override
    Optional<Avancement> findById(Long aLong);

    @Modifying
    @Transactional
    @Query("UPDATE Avancement a SET a.profSupervisor = :profSupervisor WHERE a.id = :avancementId")
    void updateProfSupervisorById(Long avancementId, User profSupervisor);


    List<Avancement> findAllByprofSupervisor(User user);
}
