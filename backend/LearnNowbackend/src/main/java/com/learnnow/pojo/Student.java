package com.learnnow.pojo;

import java.util.List;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("STUDENT")
public class Student extends UserEntity {
	
    @Size(max = 50)
    private String gradeLevel;

    @Size(max = 100)
    private String collegeName;

    @Size(max = 15)
    private String contactNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Purchase> enrollments;
}