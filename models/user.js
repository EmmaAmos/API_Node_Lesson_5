module.exports = (mongoose) => {
    const User = mongoose.model(
      'user',
      mongoose.Schema({
        userName: {
          type: String
        },
        email: {
          type: String
        },
        phoneNumber: {
          type: String
        },
        currentLocation: {
          type: String
        },
        theme_name: {
          type: String
        }
      })
    );
  
    return User;
  }
