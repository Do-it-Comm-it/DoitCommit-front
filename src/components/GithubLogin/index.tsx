// Github Login Button Component
import React from "react";
import {signInGithub} from "@src/service/firebase";
import GithubButton from "react-github-login";

const GithubLogin = () => {
  return <GithubButton label="Sign In With Github" type="dark" onClick="{signInGithub}" />;
};

export default GithubLogin;
