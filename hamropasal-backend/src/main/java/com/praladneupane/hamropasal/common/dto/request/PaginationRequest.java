package com.praladneupane.hamropasal.common.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Builder
public record PaginationRequest(
        @Min(value = 0, message = "page number must be 0 or greater")
        Integer pageNo,

        @Min(value = 1, message = "page size must be at least 1")
        @Max(value = 100, message = "page size must not exceed 100")
        Integer pageSize,

        String sortBy,
        String sortDirection) {

    public Pageable toPageable() {

        int page = pageNo == null ? 0 : pageNo;
        int size = pageSize == null ? 10 : pageSize;

        String sortField =
                (sortBy == null || sortBy.isBlank())
                        ? "id"
                        : sortBy;

        Sort.Direction direction =
                "desc".equalsIgnoreCase(sortDirection)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        return PageRequest.of(
                page,
                size,
                Sort.by(direction, sortField)
        );
    }

}
