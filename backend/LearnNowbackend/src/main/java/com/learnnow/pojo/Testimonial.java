package com.learnnow.pojo;

import jakarta.persistence.Entity;
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
    private String feedback;
    private int rating;
}
