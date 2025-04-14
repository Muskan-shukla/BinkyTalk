// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
  },
};

// export const PATH_DASHBOARD = {...}; declares a constant PATH_DASHBOARD and exports it so that it can be imported and used in other modules.
// Inside PATH_DASHBOARD, there is an object with two properties:
// root, which is assigned the value of ROOTS_DASHBOARD.
// general, which is another object with a single property app. This property is assigned the result of calling the path function with ROOTS_DASHBOARD and the string "app" as arguments. So, path(ROOTS_DASHBOARD, "app") will return the string "/app".
