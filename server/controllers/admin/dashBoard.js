import User from "../../models/User.js";

export const dashBoard = async (req, res) => {
  try {

    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({
      role: "user",
      name: { $regex: search, $options: "i" }
    });

    const users = await User.find({
      role: "user",
      name: { $regex: search, $options: "i" }
    })
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};