package com.learnnow.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.FeedBack;
import com.learnnow.pojo.Student;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);

	Optional<Student> findByIdAndIsActiveTrue(Long studentId);
}
