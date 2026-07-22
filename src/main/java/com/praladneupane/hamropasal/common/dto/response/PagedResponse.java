package com.praladneupane.hamropasal.common.dto.response;

import lombok.Builder;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
public record PagedResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last,
        boolean first,
        boolean hasNext,
        boolean hasPrevious,
        long number

) {
    public static <T> PagedResponse<T> toPagedResponse(Page<T> page) {
        return PagedResponse.<T>builder()
                .content(page.getContent())
                .page(page.getTotalPages())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .last(page.isLast())
                .first(page.isFirst())
                .hasNext(page.hasNext())
                .hasPrevious(page.hasPrevious())
                .number(page.getNumber())
                .build();
    }
}
