package com.learnnow.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "questions")
@NoArgsConstructor
@Getter
@Setter
public class Questions extends BaseEntity {
    @Column(nullable = false, length = 1000)
    private String questionText;

    @Column(name = "option_a", nullable = false, length = 255)
    private String optA;

    @Column(name = "option_b", nullable = false, length = 255)
    private String optB;

    @Column(name = "option_c", nullable = false, length = 255)
    private String optC;

    @Column(name = "option_d", nullable = false, length = 255)
    private String optD;

    @Column(name = "correct_option", nullable = false, length = 1)
    private String correctOpt;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;
}

