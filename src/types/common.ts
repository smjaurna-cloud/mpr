/**
 * Common Type Definitions & Standard Data Contracts
 * มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 */

import { IdentifierType, MemberCategory } from "@/data/authData";
import { SystemRole, MonasticStatus } from "@/data/mockData";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: Record<string, string[]>;
  timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface RegisterFormData {
  memberCategory: MemberCategory;
  title: string;
  fullName: string;
  paliName?: string;
  sanghaRank?: string;
  vassa?: number;
  originTemple?: string;
  studentCode?: string;
  positionCode?: string;
  idCardNo?: string;
  email: string;
  phone?: string;
  password?: string;
  department?: string;
  agreePdpa?: boolean;
}

export interface LoginCredentials {
  identifierName: string;
  secretCode: string;
  idType?: IdentifierType;
}

export interface ContactInquiryPayload {
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  targetDepartment: string;
  subject: string;
  message: string;
}

export interface QuickDataUpdatePayload {
  moduleId: string;
  adminPersonaId: string;
  updateType?: "FORM_EDIT" | "BATCH_IMPORT" | "QUICK_SYNC";
  formData?: Record<string, unknown>;
  batchRows?: Array<Record<string, unknown>>;
  customSummary?: string;
}
