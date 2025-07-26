package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnnow.pojo.Course;

public interface CourseDao extends JpaRepository<Course, Long> {
}
