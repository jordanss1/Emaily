import StripeCheckout from "react-stripe-checkout";

declare module "react-stripe-checkout" {
  export interface StripeCheckoutProps {
    children?: React.ReactNode;
  }
}
