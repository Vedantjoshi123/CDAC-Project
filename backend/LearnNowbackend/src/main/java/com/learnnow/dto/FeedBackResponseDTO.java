package com.learnnow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FeedBackResponseDTO extends BaseDTO {
    private Long studentId;
    private Long courseId;
    private String comment;
    private int rating;
}
