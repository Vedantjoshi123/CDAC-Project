package com.learnnow.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseRequestDTO {
    private String title;
    private String description;
    private double price;
    private double discount;
    private Long teacherId;
    private MultipartFile thumbnail;
    private MultipartFile resource;  // PDF or document
    private String overview;         // Bullet-point summary
    private Long categoryId;
}
