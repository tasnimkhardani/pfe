package com.example.PFE.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("PROF_SUPERVISOR")
public class ProfSupervisor extends User {
}
