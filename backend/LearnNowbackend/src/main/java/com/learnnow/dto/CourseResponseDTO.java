package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseResponseDTO extends BaseDTO{
    private String title;
    private String description;
    private double price;
    private double discount;
    private String thumbnail;
    private String resource;
    private String overview;
    private boolean isActive;
    private Long teacherId;
    private Long categoryId;
}
