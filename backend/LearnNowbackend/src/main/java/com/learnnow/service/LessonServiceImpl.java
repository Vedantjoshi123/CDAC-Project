package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.ChapterDao;
import com.learnnow.dao.LessonDao;
import com.learnnow.dto.LessonRequestDTO;
import com.learnnow.dto.LessonResponseDTO;
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
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        Lesson lesson = new Lesson();
        lesson.setTitle(dto.getTitle());
   
        lesson.setChapter(chapter);

        Lesson saved = lessonDao.save(lesson);

        LessonResponseDTO response = new LessonResponseDTO();
        response.setId(saved.getId());
        response.setCreatedOn(saved.getCreatedOn());
        response.setUpdatedOn(saved.getUpdatedOn());
        response.setTitle(saved.getTitle());
        response.setContent(saved.getContent());

        return response;
    }

    @Override
    public List<LessonResponseDTO> getLessonsByChapter(Long chapterId) {
        Chapter chapter = chapterDao.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        return lessonDao.findByChapterAndIsActiveTrue(chapter).stream()
                .map(lesson -> {
                    LessonResponseDTO dto = new LessonResponseDTO();
                    dto.setId(lesson.getId());
                    dto.setCreatedOn(lesson.getCreatedOn());
                    dto.setUpdatedOn(lesson.getUpdatedOn());
                    dto.setTitle(lesson.getTitle());
                    dto.setContent(lesson.getContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonDao.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setActive(false);
        lessonDao.save(lesson);
    }
    
}
