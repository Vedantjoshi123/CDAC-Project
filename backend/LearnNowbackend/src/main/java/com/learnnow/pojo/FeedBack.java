package com.learnnow.pojo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
@Entity
@Table(name="feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedBack extends BaseEntity{
	@Column(name="user_id")
	private Long userId;
	@Column(name="course_id")
	private Long courseId;
	@Column(name="comment")
	private String comment;
	@Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
	@Column(name="rating")
	private Integer rating;

}
