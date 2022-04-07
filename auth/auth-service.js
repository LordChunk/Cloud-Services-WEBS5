

const authService = {
  register: async (user) => {
      // Create new user
      const salt = bcrypt.genSaltSync(10);
      const newUser = new User({
        // Generate UID
        uid: mongoose.Types.ObjectId(),
        email: user.email,
        // Hash password
        hash: bcrypt.hashSync(user.password, salt),
        salt: salt,
        isOwner: user.isOwner,
      });

      // Save user to db
      return await newUser.save();
  },
  login: (user) => {
    // Find user in db
    User.findOne({ username: user.username }, function(err, user) {
      if (err) {
        console.log(err);
      }
      // Check if user exists
      if (!user) {
        return false;
      }
      // Check if password is correct
      if (bcrypt.compareSync(user.password, user.password)) {
        return true;
      }
    });
  },
  getUsers: async () => {

  }
}

module.exports = authService;