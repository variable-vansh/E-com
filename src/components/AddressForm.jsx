import { DeliveryDetails } from "./DeliveryDetails";
import "../styles/AddressForm.css";

export const AddressForm = ({
  isAddressView,
  addressDetails,
  onAddressChange,
  grandTotal,
  cart,
  cartMix,
  grainsData,
  productsData,
  onOrderSuccess, // New prop to handle order success
}) => {
  return (
    <div className={`address-form-container ${isAddressView ? "visible" : ""}`}>
      <div className="address-form-header">
        <h3 style={{ marginLeft: "auto", marginRight: "auto" }}>
          Delivery Address
        </h3>
      </div>
      <div className="address-form-content">
        <DeliveryDetails
          addressDetails={addressDetails}
          onAddressChange={onAddressChange}
          grandTotal={grandTotal}
          cart={cart}
          cartMix={cartMix}
          grainsData={grainsData}
          productsData={productsData}
          onOrderSuccess={onOrderSuccess} // Pass the callback
        />
      </div>
    </div>
  );
};
