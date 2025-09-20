export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '111-222-3333',
    address: {
      street: '123 Oak Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA',
    },
  },
  {
    id: 'CUST-002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '222-333-4444',
    address: {
      street: '456 Maple Drive',
      city: 'Shelbyville',
      state: 'IL',
      zipCode: '62565',
      country: 'USA',
    },
  },
  {
    id: 'CUST-003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    phone: '333-444-5555',
    address: {
      street: '789 Pine Road',
      city: 'Capital City',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
    },
  },
  {
    id: 'CUST-004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    phone: '444-555-6666',
    address: {
      street: '101 Amazon Circle',
      city: 'Themyscira',
      state: 'DC',
      zipCode: '20001',
      country: 'USA',
    },
  },
  {
    id: 'CUST-005',
    name: 'Bruce Wayne',
    email: 'bruce.w@example.com',
    phone: '555-666-7777',
    address: {
      street: '1007 Mountain Drive',
      city: 'Gotham',
      state: 'NJ',
      zipCode: '07001',
      country: 'USA',
    },
  },
];