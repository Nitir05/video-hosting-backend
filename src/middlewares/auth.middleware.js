import { User } from "../models/user.models";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
export const verifyJwt = asyncHandler(async (req, _, next) => {
    //"_" is used as we are not using res
    try {
        const accessTokem =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!accessTokem) {
            throw new ApiError(401, "Unauthorized access");
        }

        const decodedToken = jwt.verify(
            accessTokem,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            //TODO: Discuss about frontend
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
