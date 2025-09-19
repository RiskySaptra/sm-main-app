# Authentication Module

## Overview

The Authentication module handles user authentication, authorization, and role-based access control (RBAC) for the store management system. It uses NestJS's built-in authentication features with @nestjs/passport and @nestjs/jwt for secure JWT-based authentication with refresh tokens and comprehensive role management.

## Data Types

### CreateUserDto
- `email` (string): The email of the user.
- `firstName` (string): The first name of the user.
- `lastName` (string): The last name of the user.
- `password` (string): The password of the user.
- `role` (UserRole, optional): The role of the user.
- `storeId` (string): The ID of the store the user belongs to.

### LoginDto
- `email` (string): The email of the user.
- `password` (string): The password of the user.

## Entities

### User
- `id` (string): The unique identifier for the user.
- `email` (string): The user's email address.
- `firstName` (string): The user's first name.
- `lastName` (string): The user's last name.
- `password` (string): The user's hashed password.
- `role` (UserRole): The user's role.
- `isActive` (boolean): Whether the user's account is active.
- `refreshToken` (string, optional): The refresh token for the user.
- `store` (Store): The store the user belongs to.
- `createdAt` (Date): The date and time the user was created.
- `updatedAt` (Date): The date and time the user was last updated.
- `lastLoginAt` (Date, optional): The date and time of the user's last login.

### UserRole (Enum)
- `SUPER_ADMIN`
- `ADMIN`
- `MANAGER`
- `SALES_MANAGER`
- `PURCHASE_MANAGER`
- `INVENTORY_MANAGER`
- `FINANCE_MANAGER`
- `CUSTOMER`
- `USER`