/**
 * Перечисления домена (§2.1, §4, §5). Единственный источник правды:
 * zod-схемы для валидации на границах + константы-массивы для switch/автодополнения.
 * Переходы статусов — только через конечные автоматы apps/api/src/domain/*.
 */
import { z } from 'zod';
export declare const UserRoleValues: readonly ["SUPPLIER", "BUYER", "VISITOR", "COURIER", "OPERATOR", "ADMIN"];
export declare const userRoleSchema: z.ZodEnum<["SUPPLIER", "BUYER", "VISITOR", "COURIER", "OPERATOR", "ADMIN"]>;
export type UserRole = z.infer<typeof userRoleSchema>;
export declare const OrgTypeValues: readonly ["SUPPLIER", "BUYER"];
export declare const orgTypeSchema: z.ZodEnum<["SUPPLIER", "BUYER"]>;
export type OrgType = z.infer<typeof orgTypeSchema>;
export declare const MemberRoleValues: readonly ["owner", "manager", "staff"];
export declare const memberRoleSchema: z.ZodEnum<["owner", "manager", "staff"]>;
export type MemberRole = z.infer<typeof memberRoleSchema>;
export declare const VisibilityValues: readonly ["open", "closed"];
export declare const visibilitySchema: z.ZodEnum<["open", "closed"]>;
export type Visibility = z.infer<typeof visibilitySchema>;
export declare const VerificationMethodValues: readonly ["ESIA", "MANUAL"];
export declare const verificationMethodSchema: z.ZodEnum<["ESIA", "MANUAL"]>;
export type VerificationMethod = z.infer<typeof verificationMethodSchema>;
export declare const VerificationStatusValues: readonly ["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED"];
export declare const verificationStatusSchema: z.ZodEnum<["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED"]>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export declare const LotStatusValues: readonly ["DRAFT", "LISTED", "RESERVED", "SOLD", "WITHDRAWN", "EXPIRED"];
export declare const lotStatusSchema: z.ZodEnum<["DRAFT", "LISTED", "RESERVED", "SOLD", "WITHDRAWN", "EXPIRED"]>;
export type LotStatus = z.infer<typeof lotStatusSchema>;
/** TTL условного резерва лота, минут (ADR-008). */
export declare const LOT_RESERVE_TTL_MINUTES = 15;
export declare const OrderStatusValues: readonly ["CREATED", "PAID_HELD", "CONFIRMED", "IDF_ISSUED", "PICKUP_SCHEDULED", "PICKED_UP", "AT_HUB", "OUT_FOR_DELIVERY", "DELIVERED", "ACCEPTED", "PAYOUT_RELEASED", "EXPIRED", "SUPPLIER_DEFAULT", "BUYER_REJECTED", "CLAIM_OPENED", "REFUNDED"];
export declare const orderStatusSchema: z.ZodEnum<["CREATED", "PAID_HELD", "CONFIRMED", "IDF_ISSUED", "PICKUP_SCHEDULED", "PICKED_UP", "AT_HUB", "OUT_FOR_DELIVERY", "DELIVERED", "ACCEPTED", "PAYOUT_RELEASED", "EXPIRED", "SUPPLIER_DEFAULT", "BUYER_REJECTED", "CLAIM_OPENED", "REFUNDED"]>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export declare const PaymentStatusValues: readonly ["HELD", "CAPTURED", "REFUNDED"];
export declare const paymentStatusSchema: z.ZodEnum<["HELD", "CAPTURED", "REFUNDED"]>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export declare const DeliveryTypeValues: readonly ["BASE", "EXPRESS"];
export declare const deliveryTypeSchema: z.ZodEnum<["BASE", "EXPRESS"]>;
export type DeliveryType = z.infer<typeof deliveryTypeSchema>;
export declare const ReviewTargetValues: readonly ["DISH", "SUPPLIER", "BUYER"];
export declare const reviewTargetSchema: z.ZodEnum<["DISH", "SUPPLIER", "BUYER"]>;
export type ReviewTarget = z.infer<typeof reviewTargetSchema>;
export declare const TagKindValues: readonly ["QR", "NFC"];
export declare const tagKindSchema: z.ZodEnum<["QR", "NFC"]>;
export type TagKind = z.infer<typeof tagKindSchema>;
/** Опцион физпоставки — только Call (ADR-007): покупатель обязуется забрать. */
export declare const OptionKindValues: readonly ["CALL"];
export declare const optionKindSchema: z.ZodEnum<["CALL"]>;
export type OptionKind = z.infer<typeof optionKindSchema>;
export declare const SignatureKindValues: readonly ["QUALITY_READY"];
export declare const signatureKindSchema: z.ZodEnum<["QUALITY_READY"]>;
export type SignatureKind = z.infer<typeof signatureKindSchema>;
export declare const LedgerAccountValues: readonly ["buyer_funds_held", "escrow", "supplier_payable", "ocean_commission", "ocean_logistics_revenue", "ocean_logistics_cost", "fines", "refunds"];
export declare const ledgerAccountSchema: z.ZodEnum<["buyer_funds_held", "escrow", "supplier_payable", "ocean_commission", "ocean_logistics_revenue", "ocean_logistics_cost", "fines", "refunds"]>;
export type LedgerAccount = z.infer<typeof ledgerAccountSchema>;
export declare const CommissionPayerValues: readonly ["BUYER", "SUPPLIER"];
export declare const commissionPayerSchema: z.ZodEnum<["BUYER", "SUPPLIER"]>;
export type CommissionPayer = z.infer<typeof commissionPayerSchema>;
//# sourceMappingURL=enums.d.ts.map