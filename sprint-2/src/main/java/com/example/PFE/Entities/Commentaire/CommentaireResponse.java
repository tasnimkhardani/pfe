package com.example.PFE.Entities.Commentaire;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentaireResponse {
    private long id;
    private Long auteurID;
    private Date date;
    private String content;
    private Long tacheID;
}
