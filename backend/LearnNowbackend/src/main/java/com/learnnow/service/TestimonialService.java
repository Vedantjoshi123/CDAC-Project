package com.learnnow.service;

import com.learnnow.dao.TestimonialDao;
import com.learnnow.dto.TestimonialRequestDTO;
import com.learnnow.dto.TestimonialResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Testimonial;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TestimonialService {

    private final TestimonialDao testimonialDao;
    private final ModelMapper mapper;

    public TestimonialResponseDTO addTestimonial(TestimonialRequestDTO dto) {
        Testimonial testimonial = mapper.map(dto, Testimonial.class);
        Testimonial saved = testimonialDao.save(testimonial);
        return mapper.map(saved, TestimonialResponseDTO.class);
    }

    public List<TestimonialResponseDTO> getAllTestimonials() {
        return testimonialDao.findByIsActiveTrue()
                .stream()
                .map(t -> mapper.map(t, TestimonialResponseDTO.class))
                .collect(Collectors.toList());
    }

    public void softDelete(Long id) {
        Testimonial t = testimonialDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found"));
        t.setActive(false);
        testimonialDao.save(t);
    }
}
