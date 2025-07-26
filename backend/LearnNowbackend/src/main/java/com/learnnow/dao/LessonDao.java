package com.learnnow.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnnow.pojo.Lesson;
import com.learnnow.pojo.Chapter;

public interface LessonDao extends JpaRepository<Lesson, Long> {
    List<Lesson> findByChapterAndIsActiveTrue(Chapter chapter);
}
