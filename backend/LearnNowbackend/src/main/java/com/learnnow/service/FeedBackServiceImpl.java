package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.CourseDao;
import com.learnnow.dao.FeedBackDao;
import com.learnnow.dao.StudentDao;
import com.learnnow.dto.FeedBackRequestDTO;
import com.learnnow.dto.FeedBackResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.FeedBack;
import com.learnnow.pojo.Student;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedBackServiceImpl implements FeedBackService {

    @Autowired
    private FeedBackDao feedBackDao;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private ModelMapper modelMapper;

    // Add new feedback
    public FeedBackResponseDTO addFeedBack(FeedBackRequestDTO dto) {
        Student student = studentDao.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + dto.getStudentId()));

        Course course = courseDao.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + dto.getCourseId()));

        FeedBack feedback = new FeedBack();
        feedback.setComment(dto.getComment());
        feedback.setRating(dto.getRating());
        feedback.setStudent(student);
        feedback.setCourse(course);

        FeedBack savedFeedback = feedBackDao.save(feedback);

        return convertToResponseDTO(savedFeedback);
    }

    // Get feedback by ID
    public FeedBackResponseDTO getFeedBackId(Long id) {
        FeedBack feedback = feedBackDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        return convertToResponseDTO(feedback);
    }

    // Get all feedbacks
    public List<FeedBackResponseDTO> getAllFeedBack() {
        return feedBackDao.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Update existing feedback
    public FeedBackResponseDTO updateFeedBack(Long id, FeedBackRequestDTO dto) {
        FeedBack existing = feedBackDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));

        Course course = courseDao.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + dto.getCourseId()));

        Student student = studentDao.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + dto.getStudentId()));

        existing.setComment(dto.getComment());
        existing.setRating(dto.getRating());
        existing.setCourse(course);
        existing.setStudent(student);

        return convertToResponseDTO(feedBackDao.save(existing));
    }

    // Delete feedback
    public void deleteFeedBack(Long id) {
        FeedBack feedback = feedBackDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
        feedBackDao.delete(feedback);
    }

    // Convert FeedBack -> FeedBackResponseDTO
    private FeedBackResponseDTO convertToResponseDTO(FeedBack feedback) {
        FeedBackResponseDTO dto = modelMapper.map(feedback, FeedBackResponseDTO.class);
        dto.setCourseId(feedback.getCourse().getId());
        dto.setStudentId(feedback.getStudent().getId());
        return dto;
    }
    
    
    public List<FeedBackResponseDTO> getFeedbackByCourseId(Long courseId) {
        List<FeedBack> feedbackList = feedBackDao.findByCourseIdAndIsActiveTrue(courseId);
        return feedbackList.stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }
    
    
    public List<FeedBackResponseDTO> getFeedbackByTeacherId(Long teacherId) {
        List<FeedBack> feedbacks = feedBackDao.findActiveFeedbackByTeacherId(teacherId);

        if (feedbacks.isEmpty()) {
            throw new ResourceNotFoundException("No feedbacks found for teacher ID: " + teacherId);
        }

        return feedbacks.stream()
                .map(f -> {
                    // Map common fields using ModelMapper
                    FeedBackResponseDTO dto = modelMapper.map(f, FeedBackResponseDTO.class);

                    // Manually set studentId and courseId
                    if (f.getStudent() != null) {
                        dto.setStudentId(f.getStudent().getId());
                    }
                    if (f.getCourse() != null) {
                        dto.setCourseId(f.getCourse().getId());
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }


}
