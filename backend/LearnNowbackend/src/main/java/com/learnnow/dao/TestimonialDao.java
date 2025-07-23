package com.learnnow.dao;

import com.learnnow.pojo.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestimonialDao extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByIsActiveTrue();
}
