import { Link } from "react-router-dom";
import "./HeaderLinks.style.scss";
import { useAccountContext } from "@/context";

function HeaderLinks() {
  const { logout } = useAccountContext();
  return (
    <div className="HeaderLinks">
      <Link to={"/"}>Return To Menu</Link><img className="mini-logo" src="back_button.png"></img>|<Link to={"/sitemap"}>Site Map</Link><img className="mini-logo" src="map_button.png"></img>
      |<Link to={"/help"}>Help</Link><img className="mini-logo" src="help_button.png"></img>|
      <Link to={"/login"}>
        <span onClick={() => logout()}>Logout</span>
      </Link><img className="mini-logo" src="logout.png"></img>
    </div>
  );
}

export default HeaderLinks;
