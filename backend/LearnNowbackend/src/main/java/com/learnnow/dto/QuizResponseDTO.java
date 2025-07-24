package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizResponseDTO extends BaseDTO{
    
//    private Long id;
    private String title;
    private String description;
    private Long courseId;
    private String courseName;
//    private LocalDateTime createdOn;
//    private LocalDateTime updatedOn;
    private boolean active;
}
