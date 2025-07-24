package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionResponseDTO extends BaseDTO {

//    private Long id;
    private String questionText;
    private String optA;
    private String optB;
    private String optC;
    private String optD;
    private String correctOpt;
    private Long quizId;
    private String quizTitle;
//    private LocalDateTime createdOn;
//    private LocalDateTime updatedOn;
    private boolean active;
}
