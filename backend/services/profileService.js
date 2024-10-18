const userModel = require("../models/profileModel");

const createProfile = async ({ user_id, name, bio, profile_pic }) => {
  try {
    console.log("creating profile");
    const profile = await userModel.createProfile(user_id, name, bio, profile_pic);
    console.log("creating profile successful:", profile);
    return profile;
  } catch (error) {
    console.log("error creating profile:", error.message);
    throw error;
  }
};

const updateProfile = async ({ id, name, bio, profile_pic }) => {
  try {
    console.log("updating profile");
    const profile = await userModel.updateProfile(id, name, bio, profile_pic);
    console.log("updating profile successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating profile:", error.message);
    throw error;
  }
};

const updateProfilePic = async ({ id, profile_pic }) => {
  try {
    console.log("updating profile pic");
    const profile = await userModel.updateProfilePic(id, profile_pic);
    console.log("updating profile pic successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating profile pic:", error.message);
    throw error;
  }
};

const updateBio = async ({ id, bio }) => {
  try {
    console.log("updating bio");
    const profile = await userModel.updateBio(id, bio);
    console.log("updating bio successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating bio:", error.message);
    throw error;
  }
};

const updateName = async ({ id, name }) => {
  try {
    console.log("updating name");
    const profile = await userModel.updateName(id, name);
    console.log("updating name successful:", profile);
    return profile;
  } catch (error) {
    console.log("error updating name:", error.message);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    console.log("fetching profile");
    const profile = await userModel.getProfileById(id);
    console.log("fetching profile successful:", profile);
    return profile;
  } catch (error) {
    console.log("error fetching profile:", error.message);
    throw error;
  }
};

const getProfiles = async () => {
  try {
    console.log("fetching profiles");
    const profiles = await userModel.getProfiles();
    console.log("fetching profiles successful:", profiles);
    return profiles;
  } catch (error) {
    console.log("error fetching profiles:", error.message);
    throw error;
  }
};

module.exports = {
  createProfile,
  updateProfile,
  updateProfilePic,
  updateBio,
  updateName,
  getProfiles,
  getProfileById,
};