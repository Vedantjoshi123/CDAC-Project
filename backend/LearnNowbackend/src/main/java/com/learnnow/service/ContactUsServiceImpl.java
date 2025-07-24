package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.learnnow.dao.ContactUsDao;
import com.learnnow.dto.ContactUsRequestDTO;
import com.learnnow.dto.ContactUsResponseDTO;
import com.learnnow.pojo.ContactUs;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
@Service
@Transactional
@AllArgsConstructor
public class ContactUsServiceImpl implements ContactUsService {
	private final ContactUsDao contactUsDao;
	private final ModelMapper mapper;
	
	@Override
	public ContactUsResponseDTO addContact(ContactUsRequestDTO dto) {
		ContactUs contactUs = mapper.map(dto, ContactUs.class);
		contactUs.setActive(true);
		ContactUs saved = contactUsDao.save(contactUs);
		return mapper.map(saved ,ContactUsResponseDTO.class);
	}

	@Override
	public List<ContactUsResponseDTO> getContactUsAll() {
		return contactUsDao.findAll().stream()
				.filter(ContactUs::isActive)
				.map(c->mapper.map(c, ContactUsResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ContactUsResponseDTO getContactUsById(Long id) {
		ContactUs contactUs = contactUsDao.findById(id).orElseThrow(()->new RuntimeException("Contact is not found with id : "+id));
		return mapper.map(contactUs,ContactUsResponseDTO.class);
	}

}
