package com.learnnow.service;

import java.util.List;
import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;

public interface ChapterService {
    List<ChapterResponseDTO> getChaptersByCourse(Long courseId);

	ChapterResponseDTO addChapter(Long courseId, ChapterRequestDTO dto);
}
