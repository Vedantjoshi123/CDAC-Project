package com.learnnow.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.learnnow.pojo.Course;
import com.learnnow.pojo.FeedBack;

@Repository
public interface FeedBackDao extends JpaRepository<FeedBack, Long>{
	
	List<FeedBack> findByCourseIdAndIsActiveTrue(Long courseId);

	
	@Query("SELECT f FROM FeedBack f WHERE f.course.teacher.id = :teacherId AND f.isActive = true")
	List<FeedBack> findActiveFeedbackByTeacherId(@Param("teacherId") Long teacherId);


}
