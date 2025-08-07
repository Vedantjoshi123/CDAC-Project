package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;
import com.learnnow.service.ChapterService;

@RestController
@RequestMapping("/chapters")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @PostMapping(value = "/{courseId}", consumes = "multipart/form-data")
    public ResponseEntity<ChapterResponseDTO> addChapter(@PathVariable Long courseId,
                                                         @ModelAttribute ChapterRequestDTO dto) {
        return ResponseEntity.ok(chapterService.addChapter(courseId, dto));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<List<ChapterResponseDTO>> getChapters(@PathVariable Long courseId) {
        return ResponseEntity.ok(chapterService.getChaptersByCourse(courseId));
    }

    @PutMapping(value = "/{chapterId}", consumes = "multipart/form-data")
    public ResponseEntity<ChapterResponseDTO> updateChapter(@PathVariable Long chapterId,
                                                            @ModelAttribute ChapterRequestDTO dto) {
        return ResponseEntity.ok(chapterService.updateChapter(chapterId, dto));
    }

    @DeleteMapping("/{chapterId}")
    public ResponseEntity<String> deleteChapter(@PathVariable Long chapterId) {
        chapterService.deleteChapter(chapterId);
        return ResponseEntity.ok("Chapter deleted successfully.");
    }

}
