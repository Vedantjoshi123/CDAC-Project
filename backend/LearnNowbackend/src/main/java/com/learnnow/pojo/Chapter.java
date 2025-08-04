package com.learnnow.pojo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chapters")
@Getter
@Setter
public class Chapter extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 500)
    private String resource; // PDF link or other reference

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Lesson> lessons = new ArrayList<>();
}
