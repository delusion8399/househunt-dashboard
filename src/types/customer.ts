export interface Customer {
  _id: string;
  address1?: string;
  address2?: string;
  address?: string;
  avatar?: string;
  balance?: number;
  city?: string;
  country?: string;
  currency?: string;
  email: string;
  hasAcceptedMarketing?: boolean;
  hasDiscount?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
  isVerified?: boolean;
  name: string;
  mobile?: string;
  state?: string;
  totalAmountSpent?: number;
  totalOrders?: number;
  updatedAt?: number;
  vatRate?: number;
  zipCode?: string;
}

export interface CustomerLog {
  id: string;
  createdAt: number;
  description: string;
  ip: string;
  method: string;
  route: string;
  status: number;
}

export interface CustomerEmail {
  id: string;
  description: string;
  createdAt: number;
}

export interface CustomerInvoice {
  id: string;
  issueDate: number;
  status: string;
  amount: number;
}
