package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonRequestDTO {
    private String title;
    private String content;
    private Boolean isAvailable;
}
