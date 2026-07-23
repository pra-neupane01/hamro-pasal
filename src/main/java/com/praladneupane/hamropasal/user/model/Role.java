package com.praladneupane.hamropasal.user.model;

import java.util.Set;

public enum Role {

    ADMIN(Set.of(
            Permission.PRODUCT_ADD
    )),
    CASHIER(Set.of(
            Permission.USER_ADD
    ));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}
