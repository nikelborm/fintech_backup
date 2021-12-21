
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Currency {
    xcd = "xcd",
    bbd = "bbd",
    usd = "usd",
    cny = "cny",
    cop = "cop",
    crc = "crc",
    dop = "dop",
    gtq = "gtq",
    hnl = "hnl",
    hkd = "hkd",
    jmd = "jmd",
    nio = "nio",
    pyg = "pyg",
    pen = "pen",
    eur = "eur",
    twd = "twd",
    ttd = "ttd",
    mxn = "mxn",
    rub = "rub",
    czk = "czk"
}

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    middleName?: Nullable<string>;
    email: string;
    password: string;
    isOwner: boolean;
    isCustomer: boolean;
    isEmployer: boolean;
    billingInfo?: Nullable<BillingInfoInput>;
}

export interface ConnectToEstablishmentInput {
    matchRequestCode: string;
}

export interface BillingInfoInput {
    cardNumber: number;
    date: string;
    cvc: number;
}

export interface CreateEstablishmentInput {
    ownersIds?: Nullable<number[]>;
    employersIds?: Nullable<number[]>;
    address: string;
    ITN: string;
    name: string;
}

export interface CreateMatchRequestInput {
    establishmentId: number;
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    currentUser(): Nullable<User> | Promise<Nullable<User>>;
    establishments(): Establishment[] | Promise<Establishment[]>;
}

export interface IMutation {
    login(username: string, password: string): Nullable<User> | Promise<Nullable<User>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
    createEstablishment(createEstablishmentInput: CreateEstablishmentInput): Nullable<Establishment> | Promise<Nullable<Establishment>>;
    sendTipAttempt(tipAmount: number): string | Promise<string>;
    createPaymentIntent(tipAmount: number, recipientUserId: number, comment?: Nullable<string>): string | Promise<string>;
    createMatchRequest(createMatchRequestInput: CreateMatchRequestInput): Nullable<MatchRequest> | Promise<Nullable<MatchRequest>>;
    connectToEstablishment(connectToEstablishmentInput: ConnectToEstablishmentInput): Nullable<MatchRequest> | Promise<Nullable<MatchRequest>>;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: Nullable<string>;
    email: string;
    password?: Nullable<string>;
    isOwner: boolean;
    isCustomer: boolean;
    isEmployer: boolean;
    ownEstablishments: Establishment[];
    employedInEstablishments: Establishment[];
    receivedTransactions: TransactionLog[];
    sentTransactions: TransactionLog[];
    billingInfo?: Nullable<BillingInfo>;
}

export interface BillingInfo {
    cardNumber: number;
    date: string;
    cvc: number;
}

export interface Establishment {
    id: number;
    owners?: Nullable<User[]>;
    employers?: Nullable<User[]>;
    address: string;
    ITN: number;
    name: string;
    matchRequests?: Nullable<MatchRequest[]>;
}

export interface MatchRequest {
    id: number;
    createdByUser?: Nullable<User>;
    wasUsedToInviteUser?: Nullable<User>;
    establishment?: Nullable<Establishment>;
    code: string;
    createdAt: Date;
    willExpireAt: Date;
    wasUsedAt?: Nullable<Date>;
}

export interface TransactionLog {
    id: number;
    recipient: User;
    sender?: Nullable<User>;
    moneyAmount: number;
    currency: string;
    comment: string;
    creationDate: Date;
}

type Nullable<T> = T | null;
