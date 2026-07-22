package com.praladneupane.hamropasal.user.model;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
public enum Role {

    ADMIN(Set.of(
            Permission.PRODUCT_ADD
//


    )),
    CASHIER(Set.of(
            Permission.USER_ADD
    ));
    private final Set<Permission> permissions;
}
