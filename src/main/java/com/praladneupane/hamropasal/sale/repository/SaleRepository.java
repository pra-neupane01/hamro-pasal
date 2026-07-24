package com.praladneupane.hamropasal.sale.repository;

import com.praladneupane.hamropasal.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(s.netAmount) FROM Sale s WHERE s.createdAt BETWEEN :start AND :end")
    Double calculateTotalRevenueBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}