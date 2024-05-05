package com.example.PFE.Entities;

import com.example.PFE.Entities.Avancement.Avancement;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
@DiscriminatorValue("PROF_SUPERVISOR")
public class ProfSupervisor extends User {
    @OneToMany(mappedBy = "profSupervisor", cascade = CascadeType.ALL)
    private List<Avancement> avancements;

}
