package com.learnnow.service;

import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dto.TeacherRequestDTO;
import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.pojo.Teacher;

public interface TeacherService {
	  public TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto, MultipartFile file);

	public TeacherResponseDTO findById(Long id);


}
