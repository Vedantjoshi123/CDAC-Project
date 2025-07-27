package com.learnnow.pojo;

import java.util.List;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "teachers")
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("TEACHER")
public class Teacher extends UserEntity {
	

    @Size(max = 100)
    private String qualification;
	

    @Size(max = 100)
    private String specialization;

    @Size(max = 100)
    private String experience; // Example: "5 years"

    @Lob
    private String about; // Longer free-form description or biography

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<Course> courses;
}
