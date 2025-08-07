package com.learnnow.service;

import java.util.List;
import com.learnnow.dto.LessonRequestDTO;
import com.learnnow.dto.LessonResponseDTO;

public interface LessonService {
    LessonResponseDTO addLesson(Long chapterId, LessonRequestDTO dto);
    List<LessonResponseDTO> getLessonsByChapter(Long chapterId);
	LessonResponseDTO updateLesson(Long lessonId, LessonRequestDTO dto);
	void softDeleteLesson(Long lessonId);
    
}
