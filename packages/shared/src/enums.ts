/**
 * Перечисления домена (§2.1, §4, §5). Единственный источник правды:
 * zod-схемы для валидации на границах + константы-массивы для switch/автодополнения.
 * Переходы статусов — только через конечные автоматы apps/api/src/domain/*.
 */
import { z } from 'zod';

/* ── Роли и организации (§2.1) ─────────────────────────────────────────── */

export const UserRoleValues = [
  'SUPPLIER',
  'BUYER',
  'VISITOR',
  'COURIER',
  'OPERATOR',
  'ADMIN',
] as const;
export const userRoleSchema = z.enum(UserRoleValues);
export type UserRole = z.infer<typeof userRoleSchema>;

export const OrgTypeValues = ['SUPPLIER', 'BUYER'] as const;
export const orgTypeSchema = z.enum(OrgTypeValues);
export type OrgType = z.infer<typeof orgTypeSchema>;

export const MemberRoleValues = ['owner', 'manager', 'staff'] as const;
export const memberRoleSchema = z.enum(MemberRoleValues);
export type MemberRole = z.infer<typeof memberRoleSchema>;

export const VisibilityValues = ['open', 'closed'] as const;
export const visibilitySchema = z.enum(VisibilityValues);
export type Visibility = z.infer<typeof visibilitySchema>;

export const VerificationMethodValues = ['ESIA', 'MANUAL'] as const;
export const verificationMethodSchema = z.enum(VerificationMethodValues);
export type VerificationMethod = z.infer<typeof verificationMethodSchema>;

export const VerificationStatusValues = ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'] as const;
export const verificationStatusSchema = z.enum(VerificationStatusValues);
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;

/* ── Лоты (§4, ADR-008) ────────────────────────────────────────────────── */

export const LotStatusValues = [
  'DRAFT',
  'LISTED',
  'RESERVED',
  'SOLD',
  'WITHDRAWN',
  'EXPIRED',
] as const;
export const lotStatusSchema = z.enum(LotStatusValues);
export type LotStatus = z.infer<typeof lotStatusSchema>;

/** TTL условного резерва лота, минут (ADR-008). */
export const LOT_RESERVE_TTL_MINUTES = 15;

/* ── Заказы (§5.1) ─────────────────────────────────────────────────────── */

export const OrderStatusValues = [
  'CREATED',
  'PAID_HELD',
  'CONFIRMED',
  'IDF_ISSUED',
  'PICKUP_SCHEDULED',
  'PICKED_UP',
  'AT_HUB',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'ACCEPTED',
  'PAYOUT_RELEASED',
  'EXPIRED',
  'SUPPLIER_DEFAULT',
  'BUYER_REJECTED',
  'CLAIM_OPENED',
  'REFUNDED',
] as const;
export const orderStatusSchema = z.enum(OrderStatusValues);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const PaymentStatusValues = ['HELD', 'CAPTURED', 'REFUNDED'] as const;
export const paymentStatusSchema = z.enum(PaymentStatusValues);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const DeliveryTypeValues = ['BASE', 'EXPRESS'] as const;
export const deliveryTypeSchema = z.enum(DeliveryTypeValues);
export type DeliveryType = z.infer<typeof deliveryTypeSchema>;

/* ── Отзывы, теги, опционы, подписи ────────────────────────────────────── */

export const ReviewTargetValues = ['DISH', 'SUPPLIER', 'BUYER'] as const;
export const reviewTargetSchema = z.enum(ReviewTargetValues);
export type ReviewTarget = z.infer<typeof reviewTargetSchema>;

export const TagKindValues = ['QR', 'NFC'] as const;
export const tagKindSchema = z.enum(TagKindValues);
export type TagKind = z.infer<typeof tagKindSchema>;

/** Опцион физпоставки — только Call (ADR-007): покупатель обязуется забрать. */
export const OptionKindValues = ['CALL'] as const;
export const optionKindSchema = z.enum(OptionKindValues);
export type OptionKind = z.infer<typeof optionKindSchema>;

export const SignatureKindValues = ['QUALITY_READY'] as const;
export const signatureKindSchema = z.enum(SignatureKindValues);
export type SignatureKind = z.infer<typeof signatureKindSchema>;

/* ── Леджер (§5.3) ─────────────────────────────────────────────────────── */

export const LedgerAccountValues = [
  'buyer_funds_held',
  'escrow',
  'supplier_payable',
  'ocean_commission',
  'ocean_logistics_revenue',
  'ocean_logistics_cost',
  'fines',
  'refunds',
] as const;
export const ledgerAccountSchema = z.enum(LedgerAccountValues);
export type LedgerAccount = z.infer<typeof ledgerAccountSchema>;

/* ── Настройки организации ─────────────────────────────────────────────── */

export const CommissionPayerValues = ['BUYER', 'SUPPLIER'] as const;
export const commissionPayerSchema = z.enum(CommissionPayerValues);
export type CommissionPayer = z.infer<typeof commissionPayerSchema>;
