# Finance Module

## Overview

The Finance module handles all financial operations including transaction recording, sales reporting, and financial analytics. It provides comprehensive financial tracking and reporting capabilities using NestJS and TypeORM.

## Data Types

### CreatePaymentMethodDto
- `userId` (string): The ID of the user.
- `type` (PaymentMethodType): The type of payment method.
- `name` (string): The name of the payment method.
- `details` (PaymentMethodDetailsDto): Details of the payment method.
- `billingAddress` (BillingAddressDto): The billing address.
- `isDefault` (boolean, optional): Whether this is the default payment method.
- `metadata` (object, optional): Additional metadata.

### ProcessPaymentDto
- `referenceId` (string): The ID of the reference (e.g., order ID).
- `referenceType` (string): The type of the reference (e.g., "order").
- `amount` (number): The amount to be paid.
- `currency` (string): The currency of the payment.
- `method` (PaymentMethod): The payment method.
- `type` (PaymentType): The type of payment.
- `paymentDetails` (PaymentDetailsDto): Details of the payment.
- `billingAddress` (BillingAddressDto): The billing address.
- `description` (string, optional): A description of the payment.
- `metadata` (object, optional): Additional metadata.

### ProcessRefundDto
- `paymentId` (string): The ID of the payment to be refunded.
- `amount` (number): The amount to be refunded.
- `currency` (string): The currency of the refund.
- `reason` (RefundReason): The reason for the refund.
- `description` (string, optional): A description of the refund.
- `refundDetails` (object, optional): Details of the refund.
- `notes` (string[], optional): Notes about the refund.
- `metadata` (object, optional): Additional metadata.

## Entities

### PaymentMethod
- `id` (string): The unique identifier for the payment method.
- `userId` (string): The ID of the user.
- `store` (Store): The store the payment method belongs to.
- `storeId` (string): The ID of the store.
- `type` (PaymentMethodType): The type of payment method.
- `name` (string): The name of the payment method.
- `status` (PaymentMethodStatus): The status of the payment method.
- `details` (object): Details of the payment method.
- `billingAddress` (object): The billing address.
- `isDefault` (boolean): Whether this is the default payment method.
- `lastUsedAt` (Date, optional): The date and time the payment method was last used.
- `usageCount` (number): The number of times the payment method has been used.
- `gatewayId` (string, optional): The ID of the payment gateway.
- `gatewayToken` (string, optional): The token from the payment gateway.
- `metadata` (object, optional): Additional metadata.
- `createdAt` (Date): The date and time the payment method was created.
- `updatedAt` (Date): The date and time the payment method was last updated.
- `createdBy` (string, optional): The user who created the payment method.
- `updatedBy` (string, optional): The user who last updated the payment method.
- `version` (number): The version number of the record.

### Payment
- `id` (string): The unique identifier for the payment.
- `referenceId` (string): The ID of the reference (e.g., order ID).
- `referenceType` (string): The type of the reference (e.g., "order").
- `store` (Store): The store the payment belongs to.
- `storeId` (string): The ID of the store.
- `amount` (number): The amount of the payment.
- `refundedAmount` (number): The amount that has been refunded.
- `currency` (string): The currency of the payment.
- `status` (PaymentStatus): The status of the payment.
- `method` (PaymentMethod): The payment method.
- `type` (PaymentType): The type of payment.
- `transactionId` (string, optional): The transaction ID from the payment gateway.
- `authorizationCode` (string, optional): The authorization code from the payment gateway.
- `paymentDetails` (object, optional): Details of the payment.
- `billingAddress` (object, optional): The billing address.
- `description` (string, optional): A description of the payment.
- `notes` (string[]): Notes about the payment.
- `metadata` (object, optional): Additional metadata.
- `errorCode` (string, optional): The error code from the payment gateway.
- `errorMessage` (string, optional): The error message from the payment gateway.
- `gatewayResponse` (string, optional): The response from the payment gateway.
- `processedAt` (Date, optional): The date and time the payment was processed.
- `settledAt` (Date, optional): The date and time the payment was settled.
- `refundedAt` (Date, optional): The date and time the payment was refunded.
- `createdAt` (Date): The date and time the payment was created.
- `updatedAt` (Date): The date and time the payment was last updated.
- `createdBy` (string, optional): The user who created the payment.
- `updatedBy` (string, optional): The user who last updated the payment.
- `version` (number): The version number of the record.

## Enums

### PaymentMethodType
- `CREDIT_CARD`
- `DEBIT_CARD`
- `BANK_ACCOUNT`
- `DIGITAL_WALLET`

### PaymentMethodStatus
- `ACTIVE`
- `INACTIVE`
- `EXPIRED`
- `SUSPENDED`

### PaymentStatus
- `PENDING`
- `PROCESSING`
- `COMPLETED`
- `FAILED`
- `REFUNDED`
- `PARTIALLY_REFUNDED`
- `CANCELLED`

### PaymentType
- `SALE`
- `PURCHASE`
- `REFUND`
- `VOID`
- `AUTHORIZATION`
- `CAPTURE`

### RefundReason
- `DUPLICATE`
- `FRAUDULENT`
- `REQUESTED_BY_CUSTOMER`
- `OTHER`