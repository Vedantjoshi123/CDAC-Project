package com.learnnow.dto;

import com.learnnow.pojo.BaseEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonResponseDTO extends BaseEntity{
    private String title;
    private String content;
    private boolean isAvailable; 
}
