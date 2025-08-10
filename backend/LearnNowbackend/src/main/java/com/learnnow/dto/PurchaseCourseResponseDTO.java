package com.learnnow.dto;

import java.time.LocalDateTime;

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
public class PurchaseCourseResponseDTO extends BaseDTO{

    private Long studentId;
    private Long courseId;
    private String courseTitle;
    private Double amountPaid;
    private LocalDateTime purchaseDate;
    private String status; // ACTIVE, COMPLETED, etc.
}
