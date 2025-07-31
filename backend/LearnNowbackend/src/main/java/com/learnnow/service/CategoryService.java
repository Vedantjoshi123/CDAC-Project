package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.CategoryRequestDTO;
import com.learnnow.dto.CategoryResponseDTO;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRequestDTO dto);

	void softDeleteCategory(Long id);

	List<CategoryResponseDTO> getAllActiveCategories();

	CategoryResponseDTO getActiveCategoryById(Long id);

	CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO dto);
}
