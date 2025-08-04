package com.learnnow.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnnow.pojo.Course;

public interface CourseDao extends JpaRepository<Course, Long> {

	List<Course> findByIdAndIsActiveTrue(Long courseId);

	List<Course> findByIsActiveTrue();
}
