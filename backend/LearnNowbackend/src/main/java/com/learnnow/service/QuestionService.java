package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.QuestionRequestDTO;
import com.learnnow.dto.QuestionResponseDTO;

public interface QuestionService {

    QuestionResponseDTO createQuestion(QuestionRequestDTO request);

    QuestionResponseDTO getQuestionById(Long id);

    List<QuestionResponseDTO> getAllQuestions();

    QuestionResponseDTO updateQuestion(Long id, QuestionRequestDTO request);

    void deleteQuestion(Long id);
}
