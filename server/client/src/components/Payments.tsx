import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { AppThunkDispatch } from "../app/store";
import { handleToken } from "../features/auth/authSlice";
import types from "../types/react-stripe-checkout";

const Payments = (): ReactElement => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const stripeKey = process.env.REACT_APP_STRIPE_KEY as string;

  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      stripeKey={stripeKey}
      amount={500}
      token={(token) => dispatch(handleToken(token))}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default Payments;
