package com.example.PFE.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private Document file;

    @Enumerated(EnumType.STRING)
    private Statut statut;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User candidat;
    @ManyToOne
    @JoinColumn(name = "sujet_id", referencedColumnName = "id")
    private Sujet sujet;
}
