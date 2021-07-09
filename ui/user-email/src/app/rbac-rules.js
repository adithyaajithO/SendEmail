// ROLE_USER, ROLE_ADMIN;
const rules = {
  ROLE_USER: {
    role: 'ROLE_USER',
    home: "/app/user",
  }, ROLE_ADMIN: {
    role: 'ROLE_ADMIN',
    home: "/app/admin",
  }
};

export default rules;
/* resource:action */

// src: https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/const
