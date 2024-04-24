package com.example.PFE.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterationRequest {
       private String nom;
       private String prenom;
       private String email;
       private String telephone;
       private String password;
       private String emailIntern;
       private String role;

}
