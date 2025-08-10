package com.learnnow.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.PurchaseCourseRequestDTO;
import com.learnnow.dto.PurchaseCourseResponseDTO;
import com.learnnow.service.PurchaseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @PostMapping("/enroll")
    public ResponseEntity<PurchaseCourseResponseDTO> enrollCourse(@Valid @RequestBody PurchaseCourseRequestDTO request) {
        return ResponseEntity.ok(purchaseService.enrollCourse(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseCourseResponseDTO> getPurchase(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseService.getPurchaseById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> cancelPurchase(@PathVariable Long id) {
        purchaseService.cancelPurchase(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Course purchase is cancelled successfully");
        return ResponseEntity.ok(response);  // 200 OK with JSON body
    }
    
    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkEnrollment(@RequestParam Long userId, @RequestParam Long courseId) {
        boolean enrolled = purchaseService.isEnrolled(userId, courseId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("enrolled", enrolled);
        return ResponseEntity.ok(response);
    }
    
    // Get all active courses for logged in student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<PurchaseCourseResponseDTO>> getCoursesByStudent(@PathVariable Long studentId) {
        List<PurchaseCourseResponseDTO> courses = purchaseService.getCoursesByStudentId(studentId);
        return ResponseEntity.ok(courses);
    }
}
