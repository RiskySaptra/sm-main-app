/**
 * Format a date string or Date object to a localized date string
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency: string = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculate stock level status
 */
export function calculateStockStatus(
  currentStock: number,
  minimumStock: number,
  maximumStock: number
): 'low' | 'optimal' | 'excess' {
  if (currentStock <= minimumStock) {
    return 'low';
  } else if (currentStock >= maximumStock) {
    return 'excess';
  }
  return 'optimal';
}

/**
 * Format large numbers with K/M/B suffixes
 */
export function formatLargeNumber(num: number): string {
  const units = ['', 'K', 'M', 'B'];
  const order = Math.floor(Math.log10(Math.abs(num)) / 3);
  const unitName = units[order];
  const value = num / Math.pow(1000, order);
  return value.toFixed(1).replace(/\.0$/, '') + unitName;
}

/**
 * Calculate percentage change between two numbers
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

/**
 * Format a percentage number
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Get color class based on stock status
 */
export function getStockStatusColor(status: 'low' | 'optimal' | 'excess'): string {
  const colorMap = {
    low: 'text-red-600',
    optimal: 'text-green-600',
    excess: 'text-yellow-600',
  };
  return colorMap[status];
}

/**
 * Get color class based on movement type
 */
export function getMovementTypeColor(
  type: 'PURCHASE' | 'SALE' | 'RETURN' | 'ADJUSTMENT' | 'TRANSFER'
): string {
  const colorMap = {
    PURCHASE: 'text-green-600',
    SALE: 'text-blue-600',
    RETURN: 'text-yellow-600',
    ADJUSTMENT: 'text-purple-600',
    TRANSFER: 'text-gray-600',
  };
  return colorMap[type];
}

/**
 * Get priority level color
 */
export function getPriorityColor(
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
): string {
  const colorMap = {
    HIGH: 'text-red-600',
    MEDIUM: 'text-yellow-600',
    LOW: 'text-blue-600',
  };
  return colorMap[priority];
}

/**
 * Format a quantity with its unit
 */
export function formatQuantity(
  quantity: number,
  unit: string = 'pcs'
): string {
  return `${quantity} ${unit}`;
}

/**
 * Check if a date is within the specified number of days
 */
export function isWithinDays(date: Date | string, days: number): boolean {
  const compareDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - compareDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
}