package com.learnnow.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learnnow.pojo.Course;
import com.learnnow.pojo.Purchase;
import com.learnnow.pojo.Student;

public interface PurchaseDao extends JpaRepository<Purchase, Long> {

	boolean existsByStudentAndCourse(Student student, Course course);
	
    @Query("SELECT p FROM Purchase p WHERE p.student.id = :studentId AND p.course.id = :courseId AND p.status = com.learnnow.pojo.PurchaseStatus.ACTIVE")
    Optional<Purchase> findActiveByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

	List<Purchase> findActiveByStudentId(Long studentId);

	
}
