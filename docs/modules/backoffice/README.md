# Backoffice Module

## Overview

The Backoffice module provides administrative functionalities for the store management system. It includes submodules for managing billing, stores, and users.

## Submodules

### Billing
- Manages invoices and billing-related operations.

### Store
- Manages store information.

### User
- Manages user accounts for the backoffice.

## Data Types

### CreateInvoiceDto
- `storeId` (string): The ID of the store.
- `amount` (number): The amount of the invoice.
- `description` (string): A description of the invoice.

### CreateStoreDto
- `name` (string): The name of the store.

### UpdateStoreDto
- `name` (string, optional): The new name of the store.

### CreateUserDto
- `firstName` (string): The first name of the user.
- `lastName` (string): The last name of the user.
- `email` (string): The email of the user.
- `storeId` (string): The ID of the store the user belongs to.
- `password` (string): The password of the user.

### UpdateUserDto
- `firstName` (string, optional): The new first name of the user.
- `lastName` (string, optional): The new last name of the user.
- `email` (string, optional): The new email of the user.
- `storeId` (string, optional): The new store ID for the user.
- `password` (string, optional): The new password for the user.