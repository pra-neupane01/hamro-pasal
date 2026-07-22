package com.praladneupane.hamropasal.common.dto.request;


import lombok.Builder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Builder
public record PaginationRequest(
        Integer pageNo,
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
