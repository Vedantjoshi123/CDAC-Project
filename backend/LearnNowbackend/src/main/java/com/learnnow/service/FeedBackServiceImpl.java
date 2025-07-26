package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learnnow.dao.FeedBackDao;
import com.learnnow.dto.FeedBackRequestDTO;
import com.learnnow.dto.FeedBackResponseDTO;
import com.learnnow.pojo.FeedBack;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FeedBackServiceImpl implements FeedBackService {

    private final FeedBackDao feedBackDao;
    private final ModelMapper mapper;


    @Override
    public FeedBackResponseDTO addFeedBack(FeedBackRequestDTO dto) {
        FeedBack feedBack = mapper.map(dto, FeedBack.class);
        feedBack.setActive(true);
        FeedBack saved = feedBackDao.save(feedBack);
        return mapper.map(saved, FeedBackResponseDTO.class);
    }

    @Override
    public List<FeedBackResponseDTO> getAllFeedBack() {
        return feedBackDao.findAll().stream()
                .filter(FeedBack::isActive) // Optional: Only active feedback
                .map(f -> mapper.map(f, FeedBackResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public FeedBackResponseDTO updateFeedBack(Long id, FeedBackRequestDTO feedBackDTO) {
        FeedBack feedBack = feedBackDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));

        feedBack.setComment(feedBackDTO.getComment()); 
        feedBack.setRating(feedBackDTO.getRating());

        FeedBack updated = feedBackDao.save(feedBack);
        return mapper.map(updated, FeedBackResponseDTO.class);
    }

    @Override
    public FeedBackResponseDTO getFeedBackId(Long id) {
        FeedBack feedback = feedBackDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        return mapper.map(feedback, FeedBackResponseDTO.class);
    }

    @Override
    public void deleteFeedBack(Long id) {
        FeedBack feedback = feedBackDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        feedback.setActive(false);
        feedBackDao.save(feedback);
    }
    
    
    // need course table here
//    @Override
//    public List<FeedBackResponseDTO> getFeedbacksForTeacher(Long teacherId) {
//        List<FeedBack> feedbacks = feedBackDao.findActiveFeedbackByTeacherId(teacherId);
//        return feedbacks.stream()
//                .map(f -> {
//                    FeedBackResponseDTO dto = mapper.map(f, FeedBackResponseDTO.class);
//                    dto.setUserId(null); // hide student ID
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }


}
