package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.CourseDao;
import com.learnnow.dao.PurchaseDao;
import com.learnnow.dao.StudentDao;
import com.learnnow.dto.PurchaseCourseRequestDTO;
import com.learnnow.dto.PurchaseCourseResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Purchase;
import com.learnnow.pojo.PurchaseStatus;
import com.learnnow.pojo.Student;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService {
	 	@Autowired
	    private PurchaseDao purchaseDao;

	    @Autowired
	    private StudentDao studentDao;

	    @Autowired
	    private CourseDao courseDao;

	    @Autowired
	    private ModelMapper modelMapper;

	    // Add new purchase (enroll course)
	    public PurchaseCourseResponseDTO enrollCourse(PurchaseCourseRequestDTO dto) {
	        Student student = studentDao.findById(dto.getStudentId())
	                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + dto.getStudentId()));

	        Course course = courseDao.findById(dto.getCourseId())
	                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + dto.getCourseId()));

	        if (purchaseDao.existsByStudentAndCourse(student, course)) {
	            throw new RuntimeException("Student already enrolled in this course.");
	        }

	        Purchase purchase = new Purchase();
	        purchase.setStudent(student);
	        purchase.setCourse(course);
	        purchase.setPurchaseDate(java.time.LocalDateTime.now());
	        purchase.setStatus(PurchaseStatus.ACTIVE);
	        purchase.setAmountPaid(dto.getAmountPaid() != null ? dto.getAmountPaid() : course.getPrice());

	        Purchase savedPurchase = purchaseDao.save(purchase);

	        return convertToResponseDTO(savedPurchase);
	    }

	    // Get purchase by ID
	    public PurchaseCourseResponseDTO getPurchaseById(Long id) {
	        Purchase purchase = purchaseDao.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Purchase not found with id: " + id));
	        return convertToResponseDTO(purchase);
	    }

	    // Get all purchases
	    public List<PurchaseCourseResponseDTO> getAllPurchases() {
	        return purchaseDao.findAll()
	                .stream()
	                .map(this::convertToResponseDTO)
	                .collect(Collectors.toList());
	    }

	    // Cancel purchase (soft delete or change status)
	    public void cancelPurchase(Long id) {
	        Purchase purchase = purchaseDao.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Purchase not found with id: " + id));
	        purchase.setStatus(PurchaseStatus.CANCELED);
	        purchaseDao.save(purchase);
	    }

	    // Convert entity → DTO
	    private PurchaseCourseResponseDTO convertToResponseDTO(Purchase purchase) {
	        PurchaseCourseResponseDTO dto = modelMapper.map(purchase, PurchaseCourseResponseDTO.class);
	        dto.setStudentId(purchase.getStudent().getId());
	        dto.setCourseId(purchase.getCourse().getId());
	        dto.setCourseTitle(purchase.getCourse().getTitle());
	        dto.setStatus(purchase.getStatus().name());
	        return dto;
	    }

	    @Override
	    public boolean isEnrolled(Long userId, Long courseId) {
	        return purchaseDao.findActiveByStudentIdAndCourseId(userId, courseId).isPresent();
	    }

		@Override
		public List<PurchaseCourseResponseDTO> getCoursesByStudentId(Long studentId) {
			List<Purchase> purchases = purchaseDao.findActiveByStudentId(studentId);
	        return purchases.stream()
	                .map(this::convertToResponseDTO)
	                .collect(Collectors.toList());
		}
}
