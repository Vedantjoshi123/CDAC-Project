package com.learnnow.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Testimonial extends BaseEntity {

    private String name;
    
    private String role;
    
    @Column(length = 1000)
    private String feedback;
    
    @Min(1)
    @Max(5)
    private int rating;
}
