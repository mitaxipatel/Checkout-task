import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Checkout = () => {
    const [name, setName] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({}); // Track touched fields

    const navigate = useNavigate();

    // Validation functions
    const validateName = (value) => value.trim() !== "";
    const validateShippingAddress = (value) => value.trim() !== "";
    const validateCardNumber = (value) => /^\d{16}$/.test(value);  // 16 digits
    const validateCvv = (value) => /^\d{3,4}$/.test(value);  // 3 or 4 digits
    const validateExpiryDate = (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);  // MM/YY format

    // Handle onBlur to set touched and show error only after focus
    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // Handle change and validate each field onBlur only if touched
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (touched.name) {
            setErrors((prev) => ({ ...prev, name: validateName(value) ? "" : "Name is required" }));
        }
    };

    const handleShippingAddressChange = (e) => {
        const value = e.target.value;
        setShippingAddress(value);
        if (touched.shippingAddress) {
            setErrors((prev) => ({ ...prev, shippingAddress: validateShippingAddress(value) ? "" : "Shipping address is required" }));
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        if (touched.cardNumber) {
            setErrors((prev) => ({ ...prev, cardNumber: validateCardNumber(value) ? "" : "Card number must be 16 digits" }));
        }
    };

    const handleCvvChange = (e) => {
        const value = e.target.value;
        setCvv(value);
        if (touched.cvv) {
            setErrors((prev) => ({ ...prev, cvv: validateCvv(value) ? "" : "CVV must be 3 or 4 digits" }));
        }
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value;
        setExpiryDate(value);
        if (touched.expiryDate) {
            setErrors((prev) => ({ ...prev, expiryDate: validateExpiryDate(value) ? "" : "Expiry date must be in MM/YY format" }));
        }
    };

    // Check if all fields are valid
    const isFormValid = () => {
        const formErrors = {
            name: validateName(name) ? "" : "Name is required",
            shippingAddress: validateShippingAddress(shippingAddress) ? "" : "Shipping address is required",
            cardNumber: validateCardNumber(cardNumber) ? "" : "Card number must be 16 digits",
            cvv: validateCvv(cvv) ? "" : "CVV must be 3 or 4 digits",
            expiryDate: validateExpiryDate(expiryDate) ? "" : "Expiry date must be in MM/YY format",
        };
        setErrors(formErrors);

        // Return true if all validations pass
        return !Object.values(formErrors).some(error => error !== "");
    };

    // Handle form submission
    const handleSubmit = () => {
        if (isFormValid()) {
            // Submit the form data if valid
            const data = JSON.stringify({
                name,
                shippingAddress,
                cardNumber,
                cvv,
                expiryDate,
                totalAmount : 100
            });

            const config = {
                method: 'post',
                url: 'http://localhost:4000/checkout',
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    navigate("/success"); 
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                <h2>Checkout</h2>

                {/* Name Field */}
                <div className="input-group">
                    <label>Name</label>
                    <input 
                        name="name" 
                        onChange={handleNameChange} 
                        onBlur={() => handleBlur('name')}
                        value={name}
                    />
                    {touched.name && errors.name && <p className="error-text" style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                {/* Shipping Address Field */}
                <div className="input-group">
                    <label>Shipping Address</label>
                    <input 
                        name="shippingAddress" 
                        onChange={handleShippingAddressChange} 
                        onBlur={() => handleBlur('shippingAddress')}
                        value={shippingAddress}
                    />
                    {touched.shippingAddress && errors.shippingAddress && <p className="error-text" style={{ color: 'red' }}>{errors.shippingAddress}</p>}
                </div>

                {/* Card Number Field */}
                <div className="input-group">
                    <label>Card Number</label>
                    <input 
                        type="number" 
                        name="cardNumber" 
                        maxLength="16"
                        onChange={handleCardNumberChange} 
                        onBlur={() => handleBlur('cardNumber')}
                        value={cardNumber}
                    />
                    {touched.cardNumber && errors.cardNumber && <p className="error-text" style={{ color: 'red' }}>{errors.cardNumber}</p>}
                </div>

                {/* CVV Field */}
                <div className="input-group">
                    <label>CVV</label>
                    <input 
                        type="number" 
                        name="cvv" 
                        maxLength="3"
                        onChange={handleCvvChange} 
                        onBlur={() => handleBlur('cvv')}
                        value={cvv}
                    />
                    {touched.cvv && errors.cvv && <p className="error-text" style={{ color: 'red' }}>{errors.cvv}</p>}
                </div>

                {/* Expiry Date Field */}
                <div className="input-group">
                    <label>Expiry Date (MM/YY)</label>
                    <input 
                        type="text" 
                        name="expiryDate" 
                        placeholder="MM/YY"
                        onChange={handleExpiryDateChange} 
                        onBlur={() => handleBlur('expiryDate')}
                        value={expiryDate}
                    />
                    {touched.expiryDate && errors.expiryDate && <p className="error-text" style={{ color: 'red' }}>{errors.expiryDate}</p>}
                </div>

                {/* Submit Button */}
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default Checkout;
