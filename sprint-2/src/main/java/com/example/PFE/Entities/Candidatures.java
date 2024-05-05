package com.example.PFE.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Candidatures {
    Long idCandidatures;
    User user;
    Sujet sujet;

}
