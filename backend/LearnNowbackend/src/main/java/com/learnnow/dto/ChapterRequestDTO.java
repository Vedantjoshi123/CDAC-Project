package com.learnnow.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChapterRequestDTO {
    private String title;
    private MultipartFile resource;
}
