export interface ContactsType extends Record<string, unknown> {
    title: string;
    phone: string | null;
    email: string | null;
    address: string | null;
}