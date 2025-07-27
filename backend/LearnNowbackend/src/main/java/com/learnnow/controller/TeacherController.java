
//package com.learnnow.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.learnnow.dto.TeacherRequestDTO;
//import com.learnnow.dto.TeacherResponseDTO;
//import com.learnnow.service.TeacherService;
//
//@RestController
//@RequestMapping("/teachers")
//@CrossOrigin
//public class TeacherController {
//
//    @Autowired
//    private TeacherService teacherService;
//
//    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<TeacherResponseDTO> updateTeacherProfile(
//            @PathVariable Long id,
//            @RequestPart("teacher") TeacherRequestDTO teacherDTO,
//            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
//        
//    	 TeacherResponseDTO updatedTeacher = teacherService.updateTeacher(id, teacherDTO, imageFile);
//        return ResponseEntity.ok(updatedTeacher);
//    }
////    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////    public ResponseEntity<TeacherResponseDTO> updateTeacher(
////            @PathVariable Long id,
////            @RequestPart(name = "image", required = false) MultipartFile image,
////            @RequestPart("firstName") String firstName,
////            @RequestPart("lastName") String lastName,
////            @RequestPart("dob") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
////            @RequestPart("email") String email,
////            @RequestPart("qualification") String qualification,
////            @RequestPart("specialization") String specialization,
////            @RequestPart("experience") String experience,
////            @RequestPart("about") String about,
////            
////            @RequestPart("street") String street,
////            @RequestPart("city") String city,
////            @RequestPart("state") String state,
////            @RequestPart("zipCode") String zipCode,
////            @RequestPart("country") String country
////    ) {
////        TeacherRequestDTO teacherRequest = new TeacherRequestDTO();
////        teacherRequest.setFirstName(firstName);
////        teacherRequest.setLastName(lastName);
////        teacherRequest.setDob(dob);
////        teacherRequest.setEmail(email);
////        teacherRequest.setQualification(qualification);
////        teacherRequest.setSpecialization(specialization);
////        teacherRequest.setExperience(experience);
////        teacherRequest.setAbout(about);
////
////        teacherRequest.setStreet(street);
////        teacherRequest.setCity(city);
////        teacherRequest.setState(state);
////        teacherRequest.setCountry(country);
////        teacherRequest.setZipCode(zipCode);
////
////        TeacherResponseDTO updatedTeacher = teacherService.updateTeacher(id, teacherRequest, image);
////        return ResponseEntity.ok(updatedTeacher);
////    }
//
//    
//   
////    @GetMapping
////    public ResponseEntity<List<TeacherResponseDTO>> getAllTeachers() {
////        List<TeacherResponseDTO> teachers = teacherService.getAllTeachers();
////        return ResponseEntity.ok(teachers);
////    }
////
////   
////    @GetMapping("/{id}")
////    public ResponseEntity<TeacherResponseDTO> getTeacherById(@PathVariable Long id) {
////        try {
////            TeacherResponseDTO teacher = teacherService.getTeacherById(id);
////            return ResponseEntity.ok(teacher);
////        } catch (ResourceNotFoundException ex) {
////            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
////        }
////    }
////
////
////    @DeleteMapping("/{id}")
////    public ResponseEntity<String> deleteTeacher(@PathVariable Long id) {
////        String responseMessage = teacherService.deleteTeacher(id);
////        return ResponseEntity.ok(responseMessage);
////    }
//
//}

