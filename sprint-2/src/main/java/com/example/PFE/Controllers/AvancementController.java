package com.example.PFE.Controllers;

import com.example.PFE.Entities.Avancement.Avancement;
import com.example.PFE.Entities.Avancement.AvancementResponse;
import com.example.PFE.Entities.User;
import com.example.PFE.Exceptions.NotFoundException;
import com.example.PFE.Services.AvencementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AvancementController {
    private final AvencementService avencementService;
    @GetMapping("/avancements")
    public ResponseEntity<?> avancements(Principal principal){
        var user = (User)((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        try {
            List<AvancementResponse> avancements=avencementService.avancements(user);
            return ResponseEntity.ok().body(avancements);
        }catch (Exception e){
            return ResponseEntity.status(500).body("erreur lors de l'affichage de la liste d'avanecement");
        }

    }

}
