package com.learnnow;

import org.modelmapper.Condition;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@EnableJpaAuditing
public class LearnNowApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnNowApplication.class, args);
	}
	
	
	@Bean
	ModelMapper modelMapper() {
		System.out.println("creating model mapper");
		Condition<?, ?> condition = ctx -> {
		    Object sourceValue = ctx.getSource();
		    if (sourceValue == null) return false;
		    if (sourceValue instanceof Number) return ((Number) sourceValue).doubleValue() != 0.0;
		    if (sourceValue instanceof Boolean) return (Boolean) sourceValue;
		    if (sourceValue instanceof Character) return (Character) sourceValue != '\u0000';
		    return true;
		};
		ModelMapper mapper= new ModelMapper();
		//to transfer only properties matching by name 
		mapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT)
		//transfer not null props
		.setPropertyCondition(Conditions.isNotNull())
		.setPropertyCondition(condition);		
		return mapper;
	}

	@Bean
	PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
