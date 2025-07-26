package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.learnnow.dto.FeedBackRequestDTO;
import com.learnnow.dto.FeedBackResponseDTO;
import com.learnnow.service.FeedBackService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedBackController {
	@Autowired 
	private FeedBackService feedBackService;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFeedBackByUserId(@PathVariable Long id)
	{
		return ResponseEntity.ok(feedBackService.getFeedBackUserId(id));
	}
	
	 @GetMapping
	    public ResponseEntity<List<FeedBackResponseDTO>> getAllFeedbacks() 
	 {
	        return ResponseEntity.ok(feedBackService.getAllFeedBack());
	 }
	 
	 @PutMapping("/{id}")
	    public ResponseEntity<FeedBackResponseDTO> updateFeedback(@PathVariable Long id, @RequestBody FeedBackRequestDTO dto) {
	        return ResponseEntity.ok(feedBackService.updateFeedBack(id, dto));
	    }
	 
	 @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
	        feedBackService.deleteFeedBack(id);
	        return ResponseEntity.ok("Feedback deleted successfully");
	    }
	 
	 @PostMapping
	 public ResponseEntity<FeedBackResponseDTO> addFeedBack(@Valid @RequestBody FeedBackRequestDTO dto) {
	     return ResponseEntity.ok(feedBackService.addFeedBack(dto));
	 }
	 @GetMapping("/course/{courseId}")
	    public ResponseEntity<List<FeedBackResponseDTO>> getFeedbackByCourseId(@PathVariable Long courseId) {
	        List<FeedBackResponseDTO> feedbackList = feedBackService.getFeedBackByCourseId(courseId);
	        return ResponseEntity.ok(feedbackList);
	    }
	 
	 
//	 @GetMapping("/teacher/{teacherId}")     //need course table
//	 public ResponseEntity<List<FeedBackResponseDTO>> getFeedbacksForTeacher(@PathVariable Long teacherId) {
//	     return ResponseEntity.ok(feedBackService.getFeedbacksForTeacher(teacherId));
//	 }



}
