import { Link } from 'react-router-dom'
//img's
import presentation from "../../assets/presentation-640.png";
//styles
import "./welcomePage.css";

const WelcomePage = () => {
  return (
    <div className="content-wrapper">
      <div className="welcome-page__wrapper">
        <div className="welcome-page__description-wrapper">
          <h1>Modern inventory management software</h1>
          <p>Increase your profits by managing your inventory</p>
          <Link to='/login' className="welcome-page__login__link">
            Log in
          </Link>
        </div>
        <div className="welcome-page__img-wrapper">
          <img alt="" src={presentation} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
