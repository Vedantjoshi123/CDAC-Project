package com.learnnow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class QuestionUpdateDTO {

    @NotBlank(message = "Question text must not be blank")
    @Size(max = 1000, message = "Question text must be at most 1000 characters")
    private String questionText;

    @NotBlank(message = "Option A must not be blank")
    @Size(max = 255, message = "Option A must be at most 255 characters")
    private String optA;

    @NotBlank(message = "Option B must not be blank")
    @Size(max = 255, message = "Option B must be at most 255 characters")
    private String optB;

    @NotBlank(message = "Option C must not be blank")
    @Size(max = 255, message = "Option C must be at most 255 characters")
    private String optC;

    @NotBlank(message = "Option D must not be blank")
    @Size(max = 255, message = "Option D must be at most 255 characters")
    private String optD;

    @NotBlank(message = "Correct option must not be blank")
    @Size(max = 1, message = "Correct option must be a single character (A/B/C/D)")
    private String correctOpt;
}
