package com.learnnow.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequestDTO {
    private String title;
    private MultipartFile  icon;
    
}
