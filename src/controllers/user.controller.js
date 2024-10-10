import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  // get user detail
  const { username, fullName, email, password } = req.body;

  // validation - not empty
  if (
    [username, fullName, email, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // check if user already exist: email, username

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist!");
  }

  const avatarLocalpath = req.files?.avatar[0]?.path;
  console.log("avatarLocalpath: ", avatarLocalpath);

  //   const coverImageLocalpath = req.files?.coverImage[0]?.path;
  let coverImageLocalpath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalpath = req.files?.coverImage[0]?.path;
  }
  console.log("coverImageLocalpath: ", coverImageLocalpath);

  // check for image, check for avatar

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required!");
  }
  // upload them on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImage = await uploadOnCloudinary(coverImageLocalpath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!");
  }

  // create user object
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password and refresh token field in response
  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something wents wrong while registering user!");
  }

  // return res
  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
