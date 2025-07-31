package com.learnnow.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dao.CategoryDao;
import com.learnnow.dto.CategoryRequestDTO;
import com.learnnow.dto.CategoryResponseDTO;
import com.learnnow.exception.DuplicateResourceException;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Category;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Value("${upload.category.path}")
    private String uploadFolderRelativePath;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {
	   if (categoryDao.existsByTitleIgnoreCase(dto.getTitle())) {
	        throw new DuplicateResourceException("Category already present");
	    }
        return saveCategory(new Category(), dto);
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO dto) {
        Category existing = categoryDao.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category Id " + id + " is not found"));
        return saveCategory(existing, dto);
    }

    private CategoryResponseDTO saveCategory(Category category, CategoryRequestDTO dto) {
        try {
            MultipartFile iconFile = dto.getIcon();
            if (iconFile != null && !iconFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + iconFile.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");	
                
                String projectRoot = new File(System.getProperty("user.dir")).getParentFile().getAbsolutePath();
                // Get parent directory of backend (i.e., CDAC-Project)
                String backendDir = System.getProperty("user.dir");
                File projectRootDir = new File(backendDir); // one level up from backend
                File cdacProjectRoot = projectRootDir.getParentFile().getParentFile();
                
                File uploadDir = new File(cdacProjectRoot, uploadFolderRelativePath);
                
                if (!uploadDir.exists()) Files.createDirectories(uploadDir.toPath());

                File dest = new File(uploadDir, fileName);
                iconFile.transferTo(dest);

                category.setIcon(uploadFolderRelativePath  + "/" + fileName); // save relative path
            }

            category.setTitle(dto.getTitle());
            category.setActive(true); // in case of update, ensure it stays active

            Category saved = categoryDao.save(category);
            return convertToDTO(saved);

        } catch (IOException e) {
            throw new RuntimeException("Failed to save icon: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while saving category", e);
        }
    }

    private CategoryResponseDTO convertToDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setTitle(category.getTitle());
        dto.setIcon(category.getIcon());
        dto.setCreatedOn(category.getCreatedOn());
        dto.setUpdatedOn(category.getUpdatedOn());
        return dto;
    }

    @Override
    public List<CategoryResponseDTO> getAllActiveCategories() {
        return categoryDao.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getActiveCategoryById(Long id) {
        Category cat = categoryDao.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category Id " + id + " is not found"));
        return convertToDTO(cat);
    }

    @Override
    public void softDeleteCategory(Long id) {
        Category cat = categoryDao.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category Id " + id + " is not found"));
        cat.setActive(false);
        categoryDao.save(cat);
    }
}
