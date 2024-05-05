package com.example.PFE.Entities.Tache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TacheRequest {
    private String name;
    private String description;
    private Date deadline;
    private Long avancementId;

}
