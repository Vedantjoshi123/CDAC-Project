package com.learnnow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.TestimonialRequestDTO;
import com.learnnow.service.TestimonialService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/testimonials")
@AllArgsConstructor
@CrossOrigin
public class TestimonialController {

    private final TestimonialService testimonialService;

    @PostMapping
    public ResponseEntity<?> addTestimonial(@RequestBody TestimonialRequestDTO dto) {
        return ResponseEntity.ok(testimonialService.addTestimonial(dto));
    }

    @GetMapping
    public ResponseEntity<?> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialService.softDelete(id);
        return ResponseEntity.ok("Testimonial deleted successfully");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTestimonial(@PathVariable Long id, @RequestBody TestimonialRequestDTO dto) {
        return ResponseEntity.ok(testimonialService.updateTestimonial(id, dto));
    }

}
