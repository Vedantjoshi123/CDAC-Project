package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.PurchaseCourseRequestDTO;
import com.learnnow.dto.PurchaseCourseResponseDTO;

import jakarta.validation.Valid;

public interface PurchaseService {

	PurchaseCourseResponseDTO enrollCourse(@Valid PurchaseCourseRequestDTO request);

	PurchaseCourseResponseDTO getPurchaseById(Long id);

	void cancelPurchase(Long id);

	boolean isEnrolled(Long userId, Long courseId);

	List<PurchaseCourseResponseDTO> getCoursesByStudentId(Long studentId);

}
