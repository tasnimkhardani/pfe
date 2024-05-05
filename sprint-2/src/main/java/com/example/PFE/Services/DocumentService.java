package com.example.PFE.Services;


import com.example.PFE.Entities.Document;
import com.example.PFE.Entities.DownloadUploadModel;
import com.example.PFE.Repositories.DocumentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;



    public List<Document> storeFile(DownloadUploadModel documents) throws IOException {
        MultipartFile[] files=documents.getDocuments();
        for(MultipartFile file : files) {
            Document document = Document
                    .builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .data(file.getBytes())
                    .auteur(documents.getUser())
                    .tache(documents.getTache())
                    .build();

            document = documentRepository.save(document);
        }
    return documentRepository.findAll();



    }

    public Document getFiles(String fileName) {
        return documentRepository.findByName(fileName);
    }

    public void delete (Long id){
        Optional<Document> isExistdocument=documentRepository.findById(id);
        if(isExistdocument.isPresent()){
            documentRepository.deleteById(id);
        }
        else{
            throw new EntityNotFoundException("le document n'existe pas");

        }

    }
    }




