import "./Footer.css";
import { Instagram, Facebook, Phone } from "lucide-react";
import logo from "../../assets/favicon.png";

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <img src={logo} alt="Olaventos logo" />
        <h3>Olaventos</h3>
      </div>
      <p>© Todos los derechos reservados. Olaventos 2025</p>
      <div className="iconos">
        <Instagram />
        <Facebook />
        <Phone />
      </div>
    </footer>
  );
}

export default Footer;

