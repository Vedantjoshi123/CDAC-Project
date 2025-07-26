package com.learnnow.service;

import java.util.List;
import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;

public interface ChapterService {
    ChapterResponseDTO addChapter(Long courseId, ChapterRequestDTO dto);
    List<ChapterResponseDTO> getChaptersByCourse(Long courseId);
    void deleteChapter(Long chapterId);
}
