package com.example.PFE.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("ACAD_SUPERVISOR")
public class AcadSupervisor extends User {

}
