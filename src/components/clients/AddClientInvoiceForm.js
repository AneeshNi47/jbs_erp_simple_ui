import React, { useState } from 'react';

const ClientInvoiceForm = ({ onSubmit }) => {
    // State to hold form values
    const [formValues, setFormValues] = useState({
        basic_value: '0.00',
        tax_percentage: '18.00',
        retention: '0.00',
        tds_percentage: '0.0',
        wwf_percentage: '5',
        project: 7,
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues); // Pass the form data to a function prop (could be an API call)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Basic Value:
                    <input
                        type="number"
                        name="basic_value"
                        value={formValues.basic_value}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tax Percentage:
                    <input
                        type="number"
                        name="tax_percentage"
                        value={formValues.tax_percentage}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Retention:
                    <input
                        type="number"
                        name="retention"
                        value={formValues.retention}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    TDS Percentage:
                    <input
                        type="number"
                        name="tds_percentage"
                        value={formValues.tds_percentage}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    WWF Percentage:
                    <input
                        type="number"
                        name="wwf_percentage"
                        value={formValues.wwf_percentage}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Project ID:
                    <input
                        type="number"
                        name="project"
                        value={formValues.project}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Create Client Invoice</button>
        </form>
    );
};

export default ClientInvoiceForm;
