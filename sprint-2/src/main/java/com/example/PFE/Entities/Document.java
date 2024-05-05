package com.example.PFE.Entities;

import com.example.PFE.Entities.Tache.Tache;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
    @ManyToOne
    @JoinColumn(name = "tache_id")
    private Tache tache;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User auteur;


}
