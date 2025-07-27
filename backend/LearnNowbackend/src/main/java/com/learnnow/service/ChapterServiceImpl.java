package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.ChapterDao;
import com.learnnow.dao.CourseDao;
import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;
import com.learnnow.pojo.Chapter;
import com.learnnow.pojo.Course;

@Service
public class ChapterServiceImpl implements ChapterService {

    @Autowired
    private ChapterDao chapterDao;

    @Autowired
    private CourseDao courseDao;

    @Override
    public ChapterResponseDTO addChapter(Long courseId, ChapterRequestDTO dto) {
        Course course = courseDao.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Chapter chapter = new Chapter();
        chapter.setTitle(dto.getTitle());
        chapter.setResource(dto.getResource());
        chapter.setCourse(course);

        Chapter saved = chapterDao.save(chapter);

        ChapterResponseDTO response = new ChapterResponseDTO();
        response.setId(saved.getId());
        response.setCreatedOn(saved.getCreatedOn());
        response.setUpdatedOn(saved.getUpdatedOn());
        response.setTitle(saved.getTitle());
        response.setResource(saved.getResource());

        return response;
    }

    @Override
    public List<ChapterResponseDTO> getChaptersByCourse(Long courseId) {
        Course course = courseDao.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return chapterDao.findByCourseAndIsActiveTrue(course).stream()
                .map(ch -> {
                    ChapterResponseDTO dto = new ChapterResponseDTO();
                    dto.setId(ch.getId());
                    dto.setCreatedOn(ch.getCreatedOn());
                    dto.setUpdatedOn(ch.getUpdatedOn());
                    dto.setTitle(ch.getTitle());
                    dto.setResource(ch.getResource());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteChapter(Long chapterId) {
        Chapter chapter = chapterDao.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        chapter.setActive(false);
        chapterDao.save(chapter);
    }
}
