package com.example.PFE.Entities;

import com.example.PFE.Entities.Avancement.Avancement;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("INTERN")
public class Intern extends User {
    @OneToOne
    @JoinColumn(name = "intern_id", referencedColumnName = "id")
    private Avancement avancement;

}
