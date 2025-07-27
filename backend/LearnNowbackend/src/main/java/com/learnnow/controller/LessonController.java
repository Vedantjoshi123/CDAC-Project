package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.LessonRequestDTO;
import com.learnnow.dto.LessonResponseDTO;
import com.learnnow.service.LessonService;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @PostMapping("/{chapterId}")
    public LessonResponseDTO addLesson(@PathVariable Long chapterId, @RequestBody LessonRequestDTO dto) {
        return lessonService.addLesson(chapterId, dto);
    }

    @GetMapping("/{chapterId}")
    public List<LessonResponseDTO> getLessons(@PathVariable Long chapterId) {
        return lessonService.getLessonsByChapter(chapterId);
    }

    @DeleteMapping("/{lessonId}")
    public void deleteLesson(@PathVariable Long lessonId) {
        lessonService.deleteLesson(lessonId);
    }
 

}
