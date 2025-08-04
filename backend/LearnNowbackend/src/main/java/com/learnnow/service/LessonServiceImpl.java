package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.ChapterDao;
import com.learnnow.dao.LessonDao;
import com.learnnow.dto.LessonRequestDTO;
import com.learnnow.dto.LessonResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Chapter;
import com.learnnow.pojo.Lesson;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonDao lessonDao;

    @Autowired
    private ChapterDao chapterDao;

    @Override
    public LessonResponseDTO addLesson(Long chapterId, LessonRequestDTO dto) {
        Chapter chapter = chapterDao.findById(chapterId)
            .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));

        Lesson lesson = new Lesson();
        lesson.setTitle(dto.getTitle());
        lesson.setContent(dto.getContent());
        lesson.setAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true);
        lesson.setChapter(chapter);
        lesson.setActive(true);

        Lesson saved = lessonDao.save(lesson);
        return convertToDTO(saved);
    }

    @Override
    public List<LessonResponseDTO> getLessonsByChapter(Long chapterId) {
        Chapter chapter = chapterDao.findById(chapterId)
            .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));

        return lessonDao.findByChapterAndIsActiveTrue(chapter).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

//    @Override
//    public LessonResponseDTO updateLesson(Long lessonId, LessonRequestDTO dto) {
//        Lesson lesson = lessonDao.findById(lessonId)
//            .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
//
//        lesson.setTitle(dto.getTitle());
//        lesson.setContent(dto.getContent());
//        lesson.setAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : lesson.isAvailable());
//
//        Lesson updated = lessonDao.save(lesson);
//        return convertToDTO(updated);
//    }

//    @Override
//    public void softDeleteLesson(Long lessonId) {
//        Lesson lesson = lessonDao.findById(lessonId)
//            .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
//
//        lesson.setActive(false);
//        lessonDao.save(lesson);
//    }

    private LessonResponseDTO convertToDTO(Lesson lesson) {
        LessonResponseDTO dto = new LessonResponseDTO();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setContent(lesson.getContent());
        dto.setAvailable(lesson.isAvailable());
        dto.setCreatedOn(lesson.getCreatedOn());
        dto.setUpdatedOn(lesson.getUpdatedOn());
        return dto;
    }
    
}
