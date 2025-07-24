package com.learnnow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.learnnow.pojo.Course;

@Repository
public interface CourseDao extends JpaRepository<Course, Long> {
}
