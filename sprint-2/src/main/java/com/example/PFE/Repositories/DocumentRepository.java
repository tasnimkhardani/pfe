package com.example.PFE.Repositories;

import com.example.PFE.Entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document,Long> {
    Document findByName(String name);

}
