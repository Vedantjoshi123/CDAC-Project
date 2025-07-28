package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.CategoryDao;
import com.learnnow.dto.CategoryRequestDTO;
import com.learnnow.dto.CategoryResponseDTO;
import com.learnnow.pojo.Category;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {
        Category category = new Category();
        mapDTOToEntity(dto, category);
        return mapEntityToDTO(categoryDao.save(category));
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO dto) {
        Category category = categoryDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        mapDTOToEntity(dto, category);
        return mapEntityToDTO(categoryDao.save(category));
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryDao.findAll().stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return mapEntityToDTO(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryDao.deleteById(id);
    }

    private void mapDTOToEntity(CategoryRequestDTO dto, Category category) {
        category.setTitle(dto.getTitle());
        category.setIcon(dto.getIcon());
    }

    private CategoryResponseDTO mapEntityToDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setTitle(category.getTitle());
        dto.setIcon(category.getIcon());
        dto.setCreatedOn(category.getCreatedOn());
        dto.setUpdatedOn(category.getUpdatedOn());
        return dto;
    }
}
