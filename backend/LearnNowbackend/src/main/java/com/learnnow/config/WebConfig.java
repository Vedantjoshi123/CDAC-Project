package com.learnnow.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	Path uploadPath = Paths.get(System.getProperty("user.dir"))
                .getParent() 
                .getParent() 
                .resolve("uploads")
                .toAbsolutePath();


         registry.addResourceHandler("/uploads/**")
                 .addResourceLocations(uploadPath.toUri().toString());
    }
}