package com.example.PFE.Entities.Avancement;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvancementResponse {
    private Long id;
    private String sujet;
    private Long internId;
    private String intern;



}
