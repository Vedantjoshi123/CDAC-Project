package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.FeedBackRequestDTO;
import com.learnnow.dto.FeedBackResponseDTO;

public interface FeedBackService {
	FeedBackResponseDTO addFeedBack(FeedBackRequestDTO dto);
	List<FeedBackResponseDTO>getAllFeedBack();
	FeedBackResponseDTO updateFeedBack(Long id, FeedBackRequestDTO feedBackDTO);
	FeedBackResponseDTO getFeedBackUserId(Long id);
	List<FeedBackResponseDTO> getFeedBackByCourseId(Long courseId);
	void deleteFeedBack(Long id);
	// List<FeedBackResponseDTO> getFeedbacksForTeacher(Long teacherId);


}
