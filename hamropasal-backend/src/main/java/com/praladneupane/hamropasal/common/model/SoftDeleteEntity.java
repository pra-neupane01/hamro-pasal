package com.praladneupane.hamropasal.common.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SoftDeleteEntity extends BaseEntity {
    private boolean deleted = false;
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
