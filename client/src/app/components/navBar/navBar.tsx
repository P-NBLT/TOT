import React from "react";
import { Button, ProfilePic, Typography, SearchBar } from "..";
import navBarStyle from "./navBar.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { useDeviceDetect } from "@/app/hooks/useDeviceDetect";

// for development only
import pic from "@/assets/images/google.png";

type NavBarProps = {
  type: "public" | "private";
};

const NavBar: React.FC<NavBarProps> = ({ type }) => {
  const { isMobile } = useDeviceDetect();
  return (
    <header className={navBarStyle.default}>
      {isMobile ? <PrivateMobile /> : <PrivateDesktop />}
    </header>
  );
};

export default NavBar;

const PrivateDesktop: React.FC = () => {
  return (
    <div className={navBarStyle.content}>
      <div className={navBarStyle.rightContainer}>
        <Typography color="white" fontSize={24}>
          Tales Of Tatooine
        </Typography>
        <SearchBar variant={"navbar"} />
      </div>
      <div className={navBarStyle.leftContainer}>
        <Button variant="navBar">
          <RiNotification2Fill className={navBarStyle.iconNav} />
          Notification
        </Button>
        <Button variant="navBar">
          <BsFillPeopleFill className={navBarStyle.iconNav} />
          Network
        </Button>
        <Button variant="navBar">
          <IoMdSettings className={navBarStyle.iconNav} />
          Settings
        </Button>
        <Button variant="navBar">
          <IoMdLogOut className={navBarStyle.iconNav} /> Logout
        </Button>
      </div>
    </div>
  );
};

const PrivateMobile: React.FC = ({}) => {
  return (
    <div className={navBarStyle.content}>
      <div className={navBarStyle.rightContainer}>
        <ProfilePic source={pic.src} location="profile" />
        <SearchBar />
      </div>
      <div className={navBarStyle.leftContainer}>
        <Button variant="navBar">
          <AiFillMessage className={navBarStyle.iconNav} />
          Network
        </Button>
        <Button variant="navBar">
          <IoMdSettings className={navBarStyle.iconNav} />
          Settings
        </Button>
      </div>
    </div>
  );
};
