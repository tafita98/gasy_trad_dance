import React from 'react'
import logo_instat from "../Saved Pictures/logo_nouveau_instat.png";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    // <!-- Footer Section -->
    <div className='vraiFooter'>
      <div class="section_container">
        <div class="footer_section ">
          <div class="footer_logo parti">
            <Link to={"#"}>
            <div style={{background:"#ffff",borderRadius:"50%",objectFit:"cover"}}>
              <img src={logo_instat} alt="Instat  Logo" />
              </div>
              <h2>Instat-microdonne</h2>
            </Link>
          </div>

          <div class="useful_links parti">
            <h3>Useful Links</h3>
            <ul>
              <li><Link to={"http://www.instat.mg"}>About</Link></li>
              <li><Link to={"http://www.instat.mg"}>Services</Link></li>
              <li><Link to={"http://www.instat.mg"}>Contact</Link></li>
            </ul>
          </div>

          <div class="contact_us parti">
            <h3>Contact</h3>
            <ul>
              <li>
                <i class="bx bx-current-location"></i>
                <span>Antananarivo, Madagascar</span>
              </li>
              <li>
                <i class="bx bxs-phone-call"></i> <span>032 11 878 79</span>
              </li>
              <li>
                <i class="bx bxs-time-five"></i>
                <span>Mon-friday : 08:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          <div class="follow_us parti">
            <h3>Follow</h3>
           
           <Link to={`https://web.facebook.com/INSTATMadagascar`} className="nav_link"> <i class="bx bxl-facebook-circle"> </i></Link>
            <i class="bx bxl-twitter"></i>
            <i class="bx bxl-instagram-alt"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
