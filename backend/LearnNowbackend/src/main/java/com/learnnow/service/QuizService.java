package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.QuizRequestDTO;
import com.learnnow.dto.QuizResponseDTO;

public interface QuizService {
    
    QuizResponseDTO createQuiz(QuizRequestDTO quizRequest);

    QuizResponseDTO getQuizById(Long id);

    List<QuizResponseDTO> getAllQuizzes();

    QuizResponseDTO updateQuiz(Long id, QuizRequestDTO quizRequest);

    void deleteQuiz(Long id);
}
