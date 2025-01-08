export default Object.freeze({
  LOGIN: {
    route: "/users/login",
  },
  SIGN_UP: {
    route: "/users/signup",
  },
  FETCH_USER_DATA: {
    route: "/users/$userId",
  },
  FETCH_USERS: {
    route: "/users"
  },
  UPDATE_USER_PROFILE: {
    route: "/users/profile/$profileId"
  },
  CREATE_NEW_PROJECT: {
    route: '/projects'
  },
  USER_PROJECTS: {
    route: '/projects/user/$userId'
  },
  UPDATE_PROJECT_DETAILS: {
    route: "/projects/$projectId"
  },
  CREATE_NEW_TASK: {
    route: '/tasks'
  },
  TASK_DETAILS: {
    route: '/tasks/$taskId'
  },
  PROJECT_TASKS: {
    route: '/tasks/project/$projectId'
  },
  USER_TASKS: {
    route: '/tasks/user/$userId'
  }
});
