package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<LessonResponseDTO> addLesson(
        @PathVariable Long chapterId,
        @RequestBody LessonRequestDTO dto) {
        
        return ResponseEntity.ok(lessonService.addLesson(chapterId, dto));
    }

    @GetMapping("/{chapterId}")
    public ResponseEntity<List<LessonResponseDTO>> getLessonsByChapter(@PathVariable Long chapterId) {
        return ResponseEntity.ok(lessonService.getLessonsByChapter(chapterId));
    }

//    @PutMapping("/{lessonId}")
//    public ResponseEntity<LessonResponseDTO> updateLesson(
//        @PathVariable Long lessonId,
//        @RequestBody LessonRequestDTO dto) {
//        
//        return ResponseEntity.ok(lessonService.updateLesson(lessonId, dto));
//    }
//
//    @DeleteMapping("/{lessonId}")
//    public ResponseEntity<String> deleteLesson(@PathVariable Long lessonId) {
//        lessonService.softDeleteLesson(lessonId);
//        return ResponseEntity.ok("Lesson deleted successfully");
//    }

}
