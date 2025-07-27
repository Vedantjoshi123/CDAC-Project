//package com.learnnow.service;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.learnnow.dao.AddressDao;
//import com.learnnow.dao.TeacherDao;
//import com.learnnow.dto.AddressRequestDTO;
//import com.learnnow.dto.TeacherRequestDTO;
//import com.learnnow.dto.TeacherResponseDTO;
//import com.learnnow.exception.ResourceNotFoundException;
//import com.learnnow.pojo.Address;
//import com.learnnow.pojo.Teacher;
//
//@Service
//@Transactional
//public class TeacherServiceImpl implements TeacherService {
//
//    @Autowired
//    private TeacherDao teacherDao;
//    
//    @Autowired
//    private AddressDao addressDao;
//    
//    @Autowired
//    private S3Service s3Service;
//
//    @Autowired
//    private ModelMapper mapper;
//    
//    @Override
//    @Transactional
//    public TeacherResponseDTO updateTeacherProfile(Long id, TeacherRequestDTO dto, MultipartFile imageFile) {
//
//        // Fetch teacher by ID
//        Teacher teacher = teacherDao.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "ID", id));
//
//        // Update basic info
//        teacher.setFirstName(dto.getFirstName());
//        teacher.setLastName(dto.getLastName());
//        teacher.setBio(dto.getBio());
//        teacher.setExperience(dto.getExperience());
//        teacher.setQualification(dto.getQualification());
//        teacher.setDob(dto.getDob());
//        teacher.setGender(dto.getGender());
//        teacher.setContact(dto.getContact());
//
//        // Handle address
//        AddressRequestDTO addrDTO = dto.getAddress();
//        if (addrDTO != null) {
//            Address address = teacher.getAddress();
//            if (address == null) {
//                address = new Address();
//            }
//            address.setCity(addrDTO.getCity());
//            address.setState(addrDTO.getState());
//            address.setCountry(addrDTO.getCountry());
//            address.setZipcode(addrDTO.getZipcode());
//            addressDao.save(address);
//            teacher.setAddress(address);
//        }
//
//        // Upload and update image if present
//        if (imageFile != null && !imageFile.isEmpty()) {
//            String imageUrl = s3Service.uploadFile(imageFile);
//            teacher.setImage(imageUrl);
//        }
//
//        Teacher updated = teacherDao.save(teacher);
//        return mapper.map(updated, TeacherResponseDTO.class);
//    
//    }
//
//    
//    
//    
////    @Override
////    public TeacherResponseDTO updateTeacher(Long teacherId, TeacherRequestDTO dto, MultipartFile imageFile) {
////        // 1. Find existing teacher
////        Teacher teacher = teacherDao.findById(teacherId)
////            .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id " + teacherId));
////
////        // 2. Update address via CascadeType.ALL
////        Address address = teacher.getMyAddress();
////        if (address == null) {
////            address = new Address();
////        }
////
////        address.setStreet(dto.getStreet());
////        address.setCity(dto.getCity());
////        address.setState(dto.getState());
////        address.setCountry(dto.getCountry());
////        address.setZipCode(dto.getZipCode());
////
////        // 3. Update teacher fields
////        teacher.setUserRole(UserRole.TEACHER);
////        teacher.setFirstName(dto.getFirstName());
////        teacher.setLastName(dto.getLastName());
////        teacher.setDob(dto.getDob());
////        teacher.setQualification(dto.getQualification());
////        teacher.setSpecialization(dto.getSpecialization());
////        teacher.setExperience(dto.getExperience());
////        teacher.setAbout(dto.getAbout());
////        teacher.setMyAddress(address); // attach updated address
////
////        // 4. Handle image upload (optional)
////
////        if (imageFile != null && !imageFile.isEmpty()) {
////            try {
////                // Save file to local folder
////                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
////                Path uploadPath = Paths.get("uploads"); // create this folder in root
////                if (!Files.exists(uploadPath)) {
////                    Files.createDirectories(uploadPath);
////                }
////                Path filePath = uploadPath.resolve(fileName);
////                Files.copy(imageFile.getInputStream(), filePath);
////
////                // Save file name/path to DB
////                teacher.setImage(fileName); // or use filePath.toString() if storing full path
////            } catch (IOException e) {
////                throw new RuntimeException("Failed to store image file", e);
////            }
////        }
////        // 4. Save teacher (will also save address due to cascade)
////        Teacher updatedTeacher = teacherDao.save(teacher);
////
////        return mapToResponseDTO(updatedTeacher);
////    }
//
////
////    @Override
////    public List<TeacherResponseDTO> getAllTeachers() {
////        return teacherDao.findAll().stream()
////                .map(this::mapToResponseDTO)
////                .collect(Collectors.toList());
////    }
////
////    @Override
////    public TeacherResponseDTO getTeacherById(Long id) {
////        Teacher teacher = teacherDao.findById(id)
////                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with ID: " + id));
////        return mapToResponseDTO(teacher);
////    }
////
////    @Override
////    public String deleteTeacher(Long id) {
////        Teacher teacher = teacherDao.findById(id)
////                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with ID: " + id));
////        teacher.setActive(false);
////        teacherDao.save(teacher);
////        return "Teacher deleted successfully with ID: " + id;
////    }
//
////    public TeacherResponseDTO mapToResponseDTO(Teacher teacher) {
////        TeacherResponseDTO dto = new TeacherResponseDTO();
////        dto.setId(teacher.getId());
////        dto.setCreatedOn(teacher.getCreatedOn());
////        dto.setUpdatedOn(teacher.getUpdatedOn());
////        dto.setFirstName(teacher.getFirstName());
////        dto.setLastName(teacher.getLastName());
////        dto.setEmail(teacher.getEmail());
////        dto.setDob(teacher.getDob());
////        dto.setImage(teacher.getImage());
////        dto.setUserRole(teacher.getUserRole());
////        dto.setQualification(teacher.getQualification());
////        dto.setSpecialization(teacher.getSpecialization());
////        dto.setExperience(teacher.getExperience());
////        dto.setAbout(teacher.getAbout());
////
////        if (teacher.getMyAddress() != null) {
////            dto.setStreet(teacher.getMyAddress().getStreet());
////            dto.setCity(teacher.getMyAddress().getCity());
////            dto.setState(teacher.getMyAddress().getState());
////            dto.setCountry(teacher.getMyAddress().getCountry());
////            dto.setZipCode(teacher.getMyAddress().getZipCode());
////        }
////
////        return dto;
////    }
//}
