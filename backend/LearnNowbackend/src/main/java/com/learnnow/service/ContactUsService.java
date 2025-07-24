package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.ContactUsRequestDTO;
import com.learnnow.dto.ContactUsResponseDTO;

public interface ContactUsService {
	 ContactUsResponseDTO addContact(ContactUsRequestDTO dto);
	 List<ContactUsResponseDTO> getContactUsAll();
	 ContactUsResponseDTO getContactUsById(Long id);
}
