import { Link } from "react-router-dom";

export function HomePage(): JSX.Element {
  return (
    <section className="subpage-container">
      <h1>The complete eating-out calculator</h1>
      <ul>
        <li>Discounts</li>
        <li>Tips</li>
        <li>Bill-splitting</li>
        <li>Round Up</li>
        <li>Miscellaneous Price Adjustments</li>
        <li>Save Your Settings</li>
      </ul>
      <Link to="/calculate">
        <button className="submit-button">Get Started</button>
      </Link>
    </section>
  );
}
