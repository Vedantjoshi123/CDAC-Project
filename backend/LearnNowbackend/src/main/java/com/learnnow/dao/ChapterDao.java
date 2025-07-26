package com.learnnow.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnnow.pojo.Chapter;
import com.learnnow.pojo.Course;

public interface ChapterDao extends JpaRepository<Chapter, Long> {
    List<Chapter> findByCourseAndIsActiveTrue(Course course);
}
