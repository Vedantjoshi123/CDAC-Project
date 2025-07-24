package com.learnnow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequestDTO {

    @NotBlank(message = "Question text is required.")
    @Size(max = 1000, message = "Question text cannot exceed 1000 characters.")
    private String questionText;

    @NotBlank(message = "Option A is required.")
    @Size(max = 255, message = "Option A cannot exceed 255 characters.")
    private String optA;

    @NotBlank(message = "Option B is required.")
    @Size(max = 255, message = "Option B cannot exceed 255 characters.")
    private String optB;

    @NotBlank(message = "Option C is required.")
    @Size(max = 255, message = "Option C cannot exceed 255 characters.")
    private String optC;

    @NotBlank(message = "Option D is required.")
    @Size(max = 255, message = "Option D cannot exceed 255 characters.")
    private String optD;

    @NotBlank(message = "Correct option is required (A/B/C/D).")
    @Size(max = 1, message = "Correct option must be a single character.")
    private String correctOpt;

    @NotNull(message = "Quiz ID is required.")
    private Long quizId;
}
