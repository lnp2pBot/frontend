import { COMMUNITY_SHARE } from './constants'

/**
 * Simple function used to calculate the discount that a community order would
 * pay when compared to a regular order.
 *
 * @param fee The community fee, 100 means the community charges 100% of
 * what's available.
 * @returns The discount, expressed as a percentage.
 */
export const calculateDiscount= (fee: number) => COMMUNITY_SHARE * (100 - fee)