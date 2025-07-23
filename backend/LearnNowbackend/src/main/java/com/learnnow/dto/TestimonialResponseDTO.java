package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialResponseDTO extends BaseDTO {

    private String name;
    private String role;
    private String feedback;
    private int rating;

    public TestimonialResponseDTO(Long id, LocalDateTime createdOn, LocalDateTime updatedOn,
                                  String name, String role, String feedback, int rating) {
        super(id, createdOn, updatedOn);
        this.name = name;
        this.role = role;
        this.feedback = feedback;
        this.rating = rating;
    }
}
