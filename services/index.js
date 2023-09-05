const project_categoryServices = require("./project_category/project_category.services");

module.exports = {
    usersServices: require("./users/users.services"),
    roleServices: require("./role/role.services"),
    designationServices: require("./designation/designation.services"),
    technology_skills_services: require("./technology_skills/technology_skills.services"),
    project_category_services: require("./project_category/project_category.services"),
    projectServices: require("./projects/projects.services"),
    assigned_project_services: require("./assigned_project/assigned_project.services"),
    daily_task_services: require("./daily_task/daily_task.services")
}