class User {
    constructor(id, username, passwordHash, email) {
      this.id = id;
      this.username = username;
      this.password = passwordHash;
      this.email = email;
      this.EmailIndex = email;
    }
  
    toJson() {
      return {
        id: this.id,
        username: this.username,
        password: this.password,
        email: this.email,
        EmailIndex: this.EmailIndex
      };
    }
  }
  
  module.exports = User;
  