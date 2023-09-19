import React from "react";
import { Button, Input, ProfilePic, Typography } from "..";
import navBarStyle from "./navBar.module.css";
import { FaSearch } from "react-icons/fa";
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
        <div className={navBarStyle.searchContainer}>
          <FaSearch width={25} className={navBarStyle.searchIcon} />
          <Input
            id="search"
            placeholder="Search"
            padding={"5px 0 5px 25px"}
            className={navBarStyle.input}
          />
        </div>
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
        <div className={navBarStyle.searchContainer}>
          <FaSearch width={25} className={navBarStyle.searchIcon} />
          <Input
            id="search"
            placeholder="Search"
            padding={"5px 0 5px 25px"}
            className={navBarStyle.input}
          />
        </div>
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
