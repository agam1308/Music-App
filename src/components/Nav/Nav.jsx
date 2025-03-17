import { useState } from "react";
import useAudio from "../../context/AudioContext";

const Nav = () => {
  const { setSearch } = useAudio();
  const [currentValue, setCurrentValue] = useState("");
  return (
    <>
      <nav
        className="navbar border-bottom border-primary py-3 fixed-top bg-body"
        style={{ height: "80px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand display-5" href="">
            Amplifier
          </a>
          <div className="d-flex gap-3">
            <input
              type="text"
              placeholder="Search Song"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <button onClick={() => setSearch(currentValue)}>Search</button>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Amplifier
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    Songs
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    Albums
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    Artists
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
