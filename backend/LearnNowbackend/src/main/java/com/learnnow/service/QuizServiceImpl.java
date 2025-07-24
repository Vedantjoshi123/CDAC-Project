package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.QuizDao;
import com.learnnow.dto.QuizRequestDTO;
import com.learnnow.dto.QuizResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Quiz;
import com.learnnow.dao.CourseDao;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizDao quizDao;

    @Autowired
    private CourseDao courseDao;

    private QuizResponseDTO mapToResponseDTO(Quiz quiz) {
        QuizResponseDTO dto = new QuizResponseDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setCourseId(quiz.getCourse().getId());
        dto.setCourseName(quiz.getCourse().getTitle());
        dto.setCreatedOn(quiz.getCreatedOn());
        dto.setUpdatedOn(quiz.getUpdatedOn());
        dto.setActive(quiz.isActive());
        return dto;
    }

    @Override
    public QuizResponseDTO createQuiz(QuizRequestDTO request) {
        Course course = courseDao.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCourse(course);

        Quiz savedQuiz = quizDao.save(quiz);
        return mapToResponseDTO(savedQuiz);
    }

    @Override
    public QuizResponseDTO getQuizById(Long id) {
        Quiz quiz = quizDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));
        return mapToResponseDTO(quiz);
    }

    @Override
    public List<QuizResponseDTO> getAllQuizzes() {
        return quizDao.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public QuizResponseDTO updateQuiz(Long id, QuizRequestDTO request) {
        Quiz quiz = quizDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));

        Course course = courseDao.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCourse(course);

        Quiz updatedQuiz = quizDao.save(quiz);
        return mapToResponseDTO(updatedQuiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        Quiz quiz = quizDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));
        quizDao.delete(quiz);
    }
}
