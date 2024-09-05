package com.Library.BookStore.file;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {
    @Value("${spring.application.file.uploads.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(@NotNull MultipartFile sourceFile, @NotNull Integer userId) {
        final String finalUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile, finalUploadSubPath);
    }

    private String uploadFile(@NotNull MultipartFile sourceFile, @NotNull String finalUploadSubPath) {
        // Construct the full path for the file
        final String finalUploadPath = fileUploadPath + File.separator + finalUploadSubPath;
        File targetFolder = new File(finalUploadPath);

        // Create directory if it does not exist
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create directory: " + finalUploadPath);
                return null;  // Early exit as we can't proceed without directory
            }
        }

        // Determine file extension and target file path
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + File.separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);

        try {
            // Write file to disk
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File could not be saved", e);
        }
        return null;
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "";
        }
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }
}
