package com.praladneupane.hamropasal.common.model;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class SoftDeleteEntity extends BaseEntity {
    private boolean deleted = false;
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
