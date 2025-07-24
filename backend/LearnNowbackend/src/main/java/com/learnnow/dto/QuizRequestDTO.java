package com.learnnow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizRequestDTO {
    
    @NotBlank(message = "Title is required.")
    @Size(max = 255, message = "Title cannot exceed 255 characters.")
    private String title;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000, message = "Description cannot exceed 1000 characters.")
    private String description;

    @NotNull(message = "Course ID is required.")
    private Long courseId;
}
