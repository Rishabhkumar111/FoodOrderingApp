import {currencyFormatter} from "../utils/formatting.js";
import Button from "./UI/Button.jsx";
export default function MealItem({ data }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${data.image}`} alt={data.name} />
        <div>
          <h3>{data.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(data.price)}
          </p>
          <p className="meal-item-description">{data.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
