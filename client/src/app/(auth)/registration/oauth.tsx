import React from "react";
import { Typography } from "../../components";
import Image from "next/image";
import googleLogo from "@/assets/images/google.png";
import githubLogo from "@/assets/images/github.svg";

import Link from "next/link";

const Oauth: React.FC = () => {
  return (
    <div>
      <LinkOauth href="http://localhost:8000/auth/login/google">
        <Image src={googleLogo.src} width={25} height={20} alt="google logo" />
        <Typography color="inherit" marginLeft={5}>
          Sign in with Google
        </Typography>
      </LinkOauth>
      <LinkOauth href="http://localhost:8000/auth/login/github">
        <Image src={githubLogo.src} width={20} height={20} alt="google logo" />
        <Typography color="inherit" marginLeft={10}>
          Sign in with Github
        </Typography>
      </LinkOauth>
    </div>
  );
};

export default Oauth;

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

const LinkOauth: React.FC<LinkProps> = ({ children, href }) => {
  const LINK_STYLE = {
    padding: "6px 15px",
    margin: "15px 0",
    border: "none",
    fontSize: "16px",
    display: "flex",
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#ffffff",
    color: "rgba(129, 129, 129, 255)",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 2.6px",
  };

  return (
    <Link href={href} style={LINK_STYLE}>
      {children}
    </Link>
  );
};
