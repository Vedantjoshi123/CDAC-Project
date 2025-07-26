package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseRequestDTO {
    private String title;
    private String description;
    private double price;
    private double discount;
    private String thumbnail;
    private Long teacherId;
    private String resource; // PDF or document
    private String overview; // Bullet-point summary
    private Long categoryId;
}
