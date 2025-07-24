package com.learnnow.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends UserEntity {

    @Column(length = 100)
    private String accessLevel; // optional admin-specific field
}