package com.learnnow.dto;

import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FeedBackRequestDTO {
	
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    @NotBlank(message = "Comment cannot be blank")
    private String comment;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Integer rating;
}
