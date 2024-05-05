package com.example.PFE.Entities;

import com.example.PFE.Entities.Tache.Tache;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DownloadUploadModel {
   private MultipartFile[] documents;
   private Tache tache;
   private User user;
   private Date uploadDate;

}
