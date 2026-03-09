import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const CancellationPolicy = () => {
    return (
        <PolicyLayout>
            <h1 className="text-2xl font-poppins text-gray-900 mb-8 font-light">Cancellation Policy</h1>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                If you decide to cancel your order for any reason, please call our customer service on <a href="tel:+918001001313" className="underline hover:text-black hover:font-medium">+91-8001001313</a>.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Cancellation Requests for Orders That Are Not Yet Shipped</h2>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-4">
                <strong>Prepaid Orders:</strong> Refunds will be initiated to the original payment method (debit/credit card, net banking, or UPI) used at checkout. In rare cases, where the original card is no longer active, a cheque may be issued.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                <strong>For COD Orders:</strong> We will simply void the transaction to close the cancellation.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Cancellation Requests for Orders That Are Shipped/Handed Over to the Courier Partner</h2>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                You have the option to not accept the delivery and request the delivery personnel to return the package to us when they arrive at your location. We will initiate a refund after receiving a confirmation from the courier partner that the order wasn't accepted and has been returned to the sender.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Cancellation By Rare Jewels</h2>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-4">
                There may be certain orders that Rare Jewels cannot accept, and therefore, we reserve the right, at our sole discretion, to refuse or cancel any order. Some reasons may include limitation on quantity available for purchase, errors in pricing or product information, certain issues identified by our fraud checking department, or any other issue that Rare Jewels identifies for not accepting the order.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-4">
                We also reserve the right to ask for additional information for accepting orders in certain cases.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                We will notify you in case your order has been cancelled fully or partially or if any additional information is required to accept your order.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Exception</h2>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                Orders for customised, personalised, or engraved jewellery shall be treated as FINAL SALE and cannot be cancelled.
            </p>
            
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-1">Questions? We've got answers!</p>
            <p className="text-[14px] text-gray-700 leading-[1.8]">
                Reach out to our customer service team by phone or WhatsApp chat on +91-8001001313, or email at india.support@angara.com.
            </p>
        </PolicyLayout>
    );
};

export default CancellationPolicy;
