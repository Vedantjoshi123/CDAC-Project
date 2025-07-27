//package com.learnnow.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//
//@Configuration
//public class S3Config {
//
//    @Value("${aws.s3.access-key}")
//    private String accessKey;
//
//    @Value("${aws.s3.secret-key}")
//    private String secretKey;
//
//    @Value("${aws.s3.region}")
//    private String region;
//
//    @Bean
//    public AmazonS3 amazonS3() {
//        BasicAWSCredentials creds = new BasicAWSCredentials(accessKey, secretKey);
//        return AmazonS3ClientBuilder.standard()
//                .withRegion(region)
//                .withCredentials(new AWSStaticCredentialsProvider(creds))
//                .build();
//    }
//}
//
