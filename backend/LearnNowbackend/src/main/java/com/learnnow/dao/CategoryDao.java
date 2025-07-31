package com.learnnow.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.Category;


@Repository
public interface CategoryDao extends JpaRepository<Category, Long> {
	List<Category> findByIsActiveTrue();
	Optional<Category> findByIdAndIsActiveTrue(Long id);
	 boolean existsByTitleIgnoreCase(String title);
}
