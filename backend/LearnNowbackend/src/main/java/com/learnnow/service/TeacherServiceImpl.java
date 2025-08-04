package com.learnnow.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dao.AddressDao;
import com.learnnow.dao.TeacherDao;
import com.learnnow.dto.TeacherRequestDTO;
import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Address;
import com.learnnow.pojo.Teacher;

import jakarta.transaction.Transactional;

@Service
public class TeacherServiceImpl implements TeacherService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private AddressDao addressDao;

    @Transactional
    public TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto, MultipartFile file) {
        Teacher teacher = teacherDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id " + id));

        // Update basic fields
        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setDob(dto.getDob());
        teacher.setQualification(dto.getQualification());
        teacher.setSpecialization(dto.getSpecialization());
        teacher.setExperience(dto.getExperience());
        teacher.setAbout(dto.getAbout());

        // Handle image upload
        if (file != null && !file.isEmpty()) {
            try {
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Clean filename and create unique name
                String filename = StringUtils.cleanPath(file.getOriginalFilename());
                String uniqueFilename = System.currentTimeMillis() + "_" + filename;
                Path filePath = uploadPath.resolve(uniqueFilename);
                
                // Delete old image if exists
                if (teacher.getImage() != null) {
                    Path oldImage = Paths.get(UPLOAD_DIR, 
                        teacher.getImage().replace("/uploads/", ""));
                    Files.deleteIfExists(oldImage);
                }
                
                file.transferTo(filePath);
                teacher.setImage("/uploads/" + uniqueFilename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image: " + e.getMessage());
            }
        }

        // Handle address
        Address address = teacher.getMyAddress();
        if (address == null) {
            address = new Address();
        }
        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setCountry(dto.getCountry());
        address.setZipCode(dto.getZipCode());
        address = addressDao.save(address);
        teacher.setMyAddress(address);

        teacher = teacherDao.save(teacher);
        return mapToResponseDTO(teacher);
    }

    private TeacherResponseDTO mapToResponseDTO(Teacher teacher) {
        TeacherResponseDTO response = new TeacherResponseDTO();
        response.setId(teacher.getId());
        response.setFirstName(teacher.getFirstName());
        response.setLastName(teacher.getLastName());
        response.setEmail(teacher.getEmail());
        response.setDob(teacher.getDob());
        response.setImageUrl(teacher.getImage());
        response.setQualification(teacher.getQualification());
        response.setSpecialization(teacher.getSpecialization());
        response.setExperience(teacher.getExperience());
        response.setAbout(teacher.getAbout());

        if (teacher.getMyAddress() != null) {
            response.setStreet(teacher.getMyAddress().getStreet());
            response.setCity(teacher.getMyAddress().getCity());
            response.setState(teacher.getMyAddress().getState());
            response.setCountry(teacher.getMyAddress().getCountry());
            response.setZipCode(teacher.getMyAddress().getZipCode());
        }

        return response;
    }

	@Override
	public TeacherResponseDTO findById(Long id) {
		 Teacher teacher = teacherDao.findById(id)
			        .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id " + id));
		 return mapToResponseDTO(teacher);
	}
}
