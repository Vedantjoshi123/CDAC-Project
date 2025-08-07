package com.learnnow.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dao.ChapterDao;
import com.learnnow.dao.CourseDao;
import com.learnnow.dto.ChapterRequestDTO;
import com.learnnow.dto.ChapterResponseDTO;
import com.learnnow.dto.LessonResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Chapter;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Lesson;

@Service
public class ChapterServiceImpl implements ChapterService {

    @Autowired
    private ChapterDao chapterDao;

    @Autowired
    private CourseDao courseDao;
    
    @Value("${upload.chapter.path}")
    private String uploadFolderRelativePath;

    @Override
    public ChapterResponseDTO addChapter(Long courseId, ChapterRequestDTO dto) {
        Course course = courseDao.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Chapter chapter = new Chapter();
        chapter.setCourse(course);
        return saveOrUpdateChapter(chapter, dto);
    }


    private ChapterResponseDTO saveOrUpdateChapter(Chapter chapter, ChapterRequestDTO dto) {
        try {
            chapter.setTitle(dto.getTitle());

            MultipartFile resource = dto.getResource();
            if (resource != null && !resource.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + resource.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

                String backendDir = System.getProperty("user.dir");
                File cdacRoot = new File(backendDir).getParentFile().getParentFile();
                File uploadDir = new File(cdacRoot, uploadFolderRelativePath);
                if (!uploadDir.exists()) Files.createDirectories(uploadDir.toPath());

                File dest = new File(uploadDir, fileName);
                resource.transferTo(dest);

                chapter.setResource(uploadFolderRelativePath + "/" + fileName);
            }

            Chapter saved = chapterDao.save(chapter);

            ChapterResponseDTO response = new ChapterResponseDTO();
            response.setId(saved.getId());
            response.setTitle(saved.getTitle());
            response.setResource(saved.getResource());
            response.setCreatedOn(saved.getCreatedOn());
            response.setUpdatedOn(saved.getUpdatedOn());
            return response;

        } catch (IOException e) {
            throw new RuntimeException("Failed to save chapter resource: " + e.getMessage(), e);
        }
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

                    // Map lessons to LessonResponseDTO list
                    if (ch.getLessons() != null) {
                        List<LessonResponseDTO> lessonsDto = ch.getLessons().stream()
                            .filter(Lesson::isActive) // Only active lessons
                            .map(lesson -> {
                                LessonResponseDTO lDto = new LessonResponseDTO();
                                lDto.setId(lesson.getId());
                                lDto.setTitle(lesson.getTitle());
                                lDto.setContent(lesson.getContent());
                                lDto.setAvailable(lesson.isAvailable());
                                lDto.setCreatedOn(lesson.getCreatedOn());
                                lDto.setUpdatedOn(lesson.getUpdatedOn());
                                return lDto;
                            }).collect(Collectors.toList());
                        dto.setLessons(lessonsDto);
                    } else {
                        dto.setLessons(List.of()); // empty list instead of null
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ChapterResponseDTO updateChapter(Long chapterId, ChapterRequestDTO dto) {
        Chapter chapter = chapterDao.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));
        return saveOrUpdateChapter(chapter, dto);
    }


    @Override
    public void deleteChapter(Long chapterId) {
        Chapter chapter = chapterDao.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));
        chapter.setActive(false);
        chapterDao.save(chapter);
    }


}
