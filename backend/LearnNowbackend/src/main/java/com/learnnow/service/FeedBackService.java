package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.FeedBackRequestDTO;
import com.learnnow.dto.FeedBackResponseDTO;

public interface FeedBackService {
	FeedBackResponseDTO addFeedBack(FeedBackRequestDTO dto);
	
	
	List<FeedBackResponseDTO>getAllFeedBack();
	FeedBackResponseDTO updateFeedBack(Long id, FeedBackRequestDTO feedBackDTO);
	FeedBackResponseDTO getFeedBackId(Long id);
	void deleteFeedBack(Long id);
	
	List<FeedBackResponseDTO> getFeedbackByTeacherId(Long teacherId);
	List<FeedBackResponseDTO> getFeedbackByCourseId(Long courseId);


	Double getAverageRatingForCourse(Long courseId);




}
