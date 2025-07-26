package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;
import com.learnnow.service.ChapterService;

@RestController
@RequestMapping("/chapters")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @PostMapping("/{courseId}")
    public ChapterResponseDTO addChapter(@PathVariable Long courseId, @RequestBody ChapterRequestDTO dto) {
        return chapterService.addChapter(courseId, dto);
    }

    @GetMapping("/{courseId}")
    public List<ChapterResponseDTO> getChapters(@PathVariable Long courseId) {
        return chapterService.getChaptersByCourse(courseId);
    }

    @DeleteMapping("/{chapterId}")
    public void deleteChapter(@PathVariable Long chapterId) {
        chapterService.deleteChapter(chapterId);
    }
}
