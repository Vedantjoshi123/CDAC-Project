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
import com.learnnow.exception.TeacherCantSendFeedbackException;
import com.learnnow.pojo.UserRole;
import com.learnnow.service.FeedBackService;
import com.learnnow.service.UserEntityService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/feedbacks")
@CrossOrigin
public class FeedBackController {
	@Autowired 
	private FeedBackService feedBackService;
	
//	@Autowired
//	private UserEntityService userEntityService;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFeedBackById(@PathVariable Long id)
	{
		return ResponseEntity.ok(feedBackService.getFeedBackId(id));
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
	 
//	 @PostMapping
//	 public ResponseEntity<FeedBackResponseDTO> addFeedBack(@Valid @RequestBody FeedBackRequestDTO dto) {
//		 if(userEntityService.getUserRoleById(dto.getUserId()).equals("TEACHER")) {
//			 return ResponseEntity.ok(feedBackService.addFeedBack(dto));
//		 }
//		 else {
//			 throw new TeacherCantSendFeedbackException("Teacher Can't send the Feedback");
//		 }
//	     
//	 }
	 @PostMapping
	 public ResponseEntity<FeedBackResponseDTO> addFeedBack(@Valid @RequestBody FeedBackRequestDTO dto) {
			return ResponseEntity.ok(feedBackService.addFeedBack(dto));
	 }
	 
   @GetMapping("/course/{courseId}")
    public ResponseEntity<List<FeedBackResponseDTO>> getFeedbackByCourse(@PathVariable Long courseId) {
        List<FeedBackResponseDTO> list = feedBackService.getFeedbackByCourseId(courseId);
        return ResponseEntity.ok(list);
    }


   @GetMapping("/teacher/{teacherId}")
   public ResponseEntity<List<FeedBackResponseDTO>> getFeedbacksByTeacherId(@PathVariable Long teacherId) {
       List<FeedBackResponseDTO> feedbacks = feedBackService.getFeedbackByTeacherId(teacherId);
       return ResponseEntity.ok(feedbacks);
   }

   @GetMapping("/average-rating/{courseId}")
   public ResponseEntity<Double> getAverageRating(@PathVariable Long courseId) {
       Double avg = feedBackService.getAverageRatingForCourse(courseId);
       return ResponseEntity.ok(avg);
   }



}
