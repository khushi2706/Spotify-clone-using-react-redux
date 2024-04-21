import React, { useRef, useState } from "react";
import Footer from "./Footer/Footer";
import SideBar from "./SideBar";
import Body from "./Body";
import NavBar from "./NavBar";
import { Container } from "./style";

function Dashboad() {
  const [headerBackground, setHeaderBackground] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  return (
    <Container>
      <div className="dash_body">
        <SideBar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <NavBar navBackground={navBackground} />
          <div className="contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Container>
  );
}

export default Dashboad;
