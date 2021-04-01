const attributesToUser = (attributes) => {
  const userObj = {};
  const namesObj = {};

  attributes.forEach((attribute) => {
    const name = attribute.Name;
    const value = attribute.Value;

    switch (name) {
      case 'given_name':
        namesObj.firstName = value;
        break;
      case 'family_name':
        namesObj.lastName = value;
        break;
      case 'email':
        userObj.email = value;
        break;
      case 'sub':
        userObj.id = value;
        break;
      default:
        break;
    }
  });

  userObj.name = `${namesObj.firstName} ${namesObj.lastName}`;

  return userObj;
};


export default attributesToUser;
