export const Roles = ["CLIENT", "ADMIN"] as const;
export type Roles = (typeof Roles)[number];

export class Role {
    private readonly role: Roles;

    constructor(role: Roles) {
        this.role = role;
    }

    static assign(role: Roles): Role {
        if (!Roles.includes(role)) {
            throw new Error("Invalid role");
        }
        return new Role(role);
    }

    
}