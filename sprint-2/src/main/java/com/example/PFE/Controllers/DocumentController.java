package com.example.PFE.Controllers;

import com.example.PFE.Entities.Document;
import com.example.PFE.Entities.DownloadUploadModel;
import com.example.PFE.Entities.Tache.Tache;
import com.example.PFE.Entities.User;
import com.example.PFE.Repositories.TacheRepository;
import com.example.PFE.Services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final TacheRepository tacheRepository;

    @PostMapping("/submit")
    public ResponseEntity<String> storeFilesIntoDB(@RequestParam("documents") MultipartFile[] files,
                                                   @RequestParam("tache") Long tache,
                                                    Principal connectedUser,
                                                   @RequestParam("uploadDate") Date uploadDate
                                                   ) {
        Optional<Tache> task= tacheRepository.findById(tache);
        if(task.isPresent()) {
            try {
                var user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
                DownloadUploadModel documents = DownloadUploadModel.builder()
                        .documents(files)
                        .tache(task.get())
                        .user(user)
                        .uploadDate(uploadDate)
                        .build();
                List<Document> savedFiles = documentService.storeFile(documents);
                return ResponseEntity.ok().body("les documents sont telecharges avec succes " );
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("echec de telechargement.");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("echec de telechargement.");

        }
    }

    @GetMapping("/download/{name}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String name) {
        Document file = documentService.getFiles(name);

        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }


}
