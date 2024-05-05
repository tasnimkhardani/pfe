package com.example.PFE.Repositories;

import com.example.PFE.Entities.Role;
import com.example.PFE.Entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);


    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.role = ?2 WHERE u.id = ?1")
    void updateRoleByEmail(Long Id, Role newRole);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.isEnabled = ?2 WHERE u.id = ?1")
    void updateEnabledStatusById(Long id, boolean isEnabled);

    @Query("SELECT u FROM User u WHERE u.role <> 'ADMIN'")
    List<User> findUsers();


    List<User> findByRole(Role role);
}
