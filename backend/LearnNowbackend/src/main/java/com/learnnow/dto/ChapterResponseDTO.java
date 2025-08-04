package com.learnnow.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChapterResponseDTO extends BaseDTO {
    private String title;
    private String resource;
    private List<LessonResponseDTO> lessons; 
}
