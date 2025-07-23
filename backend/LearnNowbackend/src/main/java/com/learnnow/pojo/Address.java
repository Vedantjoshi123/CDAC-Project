package com.learnnow.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
public class Address extends BaseEntity {
    @Column(length = 100, nullable = false)
    private String street;

    @Column(length = 50, nullable = false)
    private String city;

    @Column(length = 50, nullable = false)
    private String state;

    @Column(length = 6, nullable = false)
    private String zipCode;

    @Column(length = 50, nullable = false)
    private String country;

}
