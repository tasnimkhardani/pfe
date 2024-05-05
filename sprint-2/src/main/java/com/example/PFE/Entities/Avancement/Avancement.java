package com.example.PFE.Entities.Avancement;

import com.example.PFE.Entities.Sujet;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Avancement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Sujet sujet;
    @OneToOne
    @JoinColumn(name = "intern_id", referencedColumnName = "id")
    private User intern;
    @OneToOne
    @JoinColumn(name = "prof_supervisor_id", referencedColumnName = "id")
    private User profSupervisor;
    @OneToMany(mappedBy = "avancement", cascade = CascadeType.ALL)
    List<Tache> taches;
}
