package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponseDTO {
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
}
