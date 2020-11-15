import Role from '../model/Role';

export  const createRoles = async () => {
    try {
      // Count Documents
      const count = await Role.estimatedDocumentCount();
  
      // check for existing roles
      if (count > 0) return;
  
      const values = await Promise.all([
        // Create default Roles
      new Role({name: "user"}).save(),
      new Role({name: "moderator"}).save(),
      new Role({name: "admin"}).save(),
      ]);
  
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };