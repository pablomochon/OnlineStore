import './Footer.css'

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
          <div className="col-md-6">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="mr-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="mr-2">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <p>&copy; {new Date().getFullYear()} JavaSchool Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
