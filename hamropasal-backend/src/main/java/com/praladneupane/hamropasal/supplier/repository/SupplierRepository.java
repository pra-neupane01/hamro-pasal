package com.praladneupane.hamropasal.supplier.repository;

import com.praladneupane.hamropasal.supplier.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    List<Supplier> findByActiveTrue();

    Optional<Supplier> findByPhone(String phone);

    Optional<Supplier> findByEmail(String email);

    List<Supplier> findByCompanyNameContainingIgnoreCase(String companyName);
}
