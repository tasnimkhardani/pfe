package com.example.PFE.Entities.Tache;



import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.Commentaire.Commentaire;
import com.example.PFE.Entities.Document;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Date deadline;
    @ManyToOne
    @JoinColumn(name = "avancement_id", referencedColumnName = "id")
    private Avancement avancement;
    @OneToMany(mappedBy = "tache", cascade = CascadeType.ALL)
    private List<Commentaire> commentaires;
    @OneToMany(mappedBy = "tache", cascade = CascadeType.ALL)
    private List<Document> documents;
    private boolean valide;

}
