export const RolesEnum = ["CLIENT", "ADMIN"] as const;
export type Roles = (typeof RolesEnum)[number];

export class Role {
    private readonly role: Roles;

    constructor(role: Roles) {
        this.role = role;
    }

    static assign(role: Roles): Role {
        if (!RolesEnum.includes(role)) {
            throw new Error("Invalid role");
        }
        return new Role(role);
    }

    getValue(): Roles { return this.role }

}