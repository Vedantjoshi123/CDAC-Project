package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.QuestionDao;
import com.learnnow.dao.QuizDao;
import com.learnnow.dto.QuestionRequestDTO;
import com.learnnow.dto.QuestionResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Questions;
import com.learnnow.pojo.Quiz;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private QuizDao quizDao;

    @Autowired
    private ModelMapper modelMapper;

    private QuestionResponseDTO mapToResponseDTO(Questions question) {
        QuestionResponseDTO dto = modelMapper.map(question, QuestionResponseDTO.class);
        dto.setQuizId(question.getQuiz().getId());
        dto.setQuizTitle(question.getQuiz().getTitle());
        return dto;
    }

    @Override
    public QuestionResponseDTO createQuestion(QuestionRequestDTO request) {
        Quiz quiz = quizDao.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + request.getQuizId()));

        Questions question = modelMapper.map(request, Questions.class);
        question.setQuiz(quiz);

        Questions saved = questionDao.save(question);
        return mapToResponseDTO(saved);
    }

    @Override
    public QuestionResponseDTO getQuestionById(Long id) {
        Questions question = questionDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        return mapToResponseDTO(question);
    }

    @Override
    public List<QuestionResponseDTO> getAllQuestions() {
        return questionDao.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public QuestionResponseDTO updateQuestion(Long id, QuestionRequestDTO request) {
        Questions question = questionDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));

        Quiz quiz = quizDao.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + request.getQuizId()));

        question.setQuestionText(request.getQuestionText());
        question.setOptA(request.getOptA());
        question.setOptB(request.getOptB());
        question.setOptC(request.getOptC());
        question.setOptD(request.getOptD());
        question.setCorrectOpt(request.getCorrectOpt());
        question.setQuiz(quiz);

        Questions updated = questionDao.save(question);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteQuestion(Long id) {
        Questions question = questionDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        questionDao.delete(question);
    }
}
