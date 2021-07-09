import rules from "../rbac-rules";

export const roleNames = {
  ROLE_USER: {
    name: "User",
    role: "user",
  }, ROLE_ADMIN: {
    name: "Admin",
    role: "admin",
  }
};

// export const rolesUtil = (roles) => {
// if (isAdmin(roles)) {
//   return rules['ROLE_ADMIN'].home
// } else {
//   return rules['ROLE_USER'].home
// }
// };


export const rolesUtil = role => rules[role].home;
