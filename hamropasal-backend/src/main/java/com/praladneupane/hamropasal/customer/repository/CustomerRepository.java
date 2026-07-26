package com.praladneupane.hamropasal.customer.repository;

import com.praladneupane.hamropasal.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    @Query("""
        SELECT c FROM Customer c
        WHERE (:search IS NULL OR LOWER(c.fullName) LIKE LOWER(CONCAT('%',:search,'%'))
               OR LOWER(c.email) LIKE LOWER(CONCAT('%',:search,'%'))
               OR c.phone LIKE CONCAT('%',:search,'%'))
        AND (:active IS NULL OR c.active = :active)
        AND c.deleted = false
    """)
    Page<Customer> search(@Param("search") String search,
                          @Param("active") Boolean active,
                          Pageable pageable);

    long countByActiveTrue();
}
