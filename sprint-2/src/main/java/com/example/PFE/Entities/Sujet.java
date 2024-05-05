package com.example.PFE.Entities;

import com.example.PFE.Entities.Avancement.Avancement;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Sujet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private   Long id;
    private String titre;
    private String description;
    @OneToOne
    private Avancement avancement;

}
