package com.example.PFE.Entities.Commentaire;

import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private User auteur;
    private Date date;
    private String content;
    @ManyToOne
    @JoinColumn(name = "tache_id")
    private Tache tache;
}
