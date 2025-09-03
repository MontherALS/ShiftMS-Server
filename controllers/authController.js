import jwt from "jsonwebtoken";
//TODO make it work and add roles for normal users and adminds (add notifcation system) 
const DummyData = {
  id: 11221,
  email: "admin@gmail.com",
  password: "a123",
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== DummyData.email || password !== DummyData.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: DummyData.id, email: DummyData.email }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
