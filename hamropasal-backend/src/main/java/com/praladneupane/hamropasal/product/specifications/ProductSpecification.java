package com.praladneupane.hamropasal.product.specifications;

import com.praladneupane.hamropasal.product.dto.request.FilterProductRequest;
import com.praladneupane.hamropasal.product.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {

    public Specification<Product> filterProduct(FilterProductRequest request) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (request.productName() != null && !request.productName().isBlank()) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("name")),
                                "%" + request.productName().toLowerCase() + "%"
                        )
                );
            }

            if (request.categoryName() != null && !request.categoryName().isBlank()) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("category").get("name")),
                                "%" + request.categoryName().toLowerCase() + "%"
                        )
                );
            }

            if (request.barcode() != null && !request.barcode().isBlank()) {
                predicates.add(
                        cb.equal(root.get("barcode"), request.barcode())
                );
            }

            if (request.sku() != null && !request.sku().isBlank()) {
                predicates.add(
                        cb.equal(root.get("sku"), request.sku())
                );
            }

            if (request.minPrice() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("price"), request.minPrice())
                );
            }

            if (request.maxPrice() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("price"), request.maxPrice())
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}