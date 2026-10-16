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
];
export const userRoleSchema = z.enum(UserRoleValues);
export const OrgTypeValues = ['SUPPLIER', 'BUYER'];
export const orgTypeSchema = z.enum(OrgTypeValues);
export const MemberRoleValues = ['owner', 'manager', 'staff'];
export const memberRoleSchema = z.enum(MemberRoleValues);
export const VisibilityValues = ['open', 'closed'];
export const visibilitySchema = z.enum(VisibilityValues);
export const VerificationMethodValues = ['ESIA', 'MANUAL'];
export const verificationMethodSchema = z.enum(VerificationMethodValues);
export const VerificationStatusValues = ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'];
export const verificationStatusSchema = z.enum(VerificationStatusValues);
/* ── Лоты (§4, ADR-008) ────────────────────────────────────────────────── */
export const LotStatusValues = [
    'DRAFT',
    'LISTED',
    'RESERVED',
    'SOLD',
    'WITHDRAWN',
    'EXPIRED',
];
export const lotStatusSchema = z.enum(LotStatusValues);
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
];
export const orderStatusSchema = z.enum(OrderStatusValues);
export const PaymentStatusValues = ['HELD', 'CAPTURED', 'REFUNDED'];
export const paymentStatusSchema = z.enum(PaymentStatusValues);
export const DeliveryTypeValues = ['BASE', 'EXPRESS'];
export const deliveryTypeSchema = z.enum(DeliveryTypeValues);
/* ── Отзывы, теги, опционы, подписи ────────────────────────────────────── */
export const ReviewTargetValues = ['DISH', 'SUPPLIER', 'BUYER'];
export const reviewTargetSchema = z.enum(ReviewTargetValues);
export const TagKindValues = ['QR', 'NFC'];
export const tagKindSchema = z.enum(TagKindValues);
/** Опцион физпоставки — только Call (ADR-007): покупатель обязуется забрать. */
export const OptionKindValues = ['CALL'];
export const optionKindSchema = z.enum(OptionKindValues);
export const SignatureKindValues = ['QUALITY_READY'];
export const signatureKindSchema = z.enum(SignatureKindValues);
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
];
export const ledgerAccountSchema = z.enum(LedgerAccountValues);
/* ── Настройки организации ─────────────────────────────────────────────── */
export const CommissionPayerValues = ['BUYER', 'SUPPLIER'];
export const commissionPayerSchema = z.enum(CommissionPayerValues);
//# sourceMappingURL=enums.js.map