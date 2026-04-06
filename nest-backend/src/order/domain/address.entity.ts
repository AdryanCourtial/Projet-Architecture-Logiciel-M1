export class Address {
  private constructor(
    private readonly id: number | null,
    private readonly accountId: number,
    private readonly street: string,
    private readonly city: string,
    private readonly postalCode: string,
    private readonly country: string,
    private readonly createdAt: Date = new Date()
  ) {}

  static create(
    accountId: number,
    street: string,
    city: string,
    postalCode: string,
    country: string
  ): Address {
    if (!street || street.trim().length === 0) {
      throw new Error('Street is required');
    }
    if (!city || city.trim().length === 0) {
      throw new Error('City is required');
    }
    if (!postalCode || postalCode.trim().length === 0) {
      throw new Error('Postal code is required');
    }
    if (!country || country.trim().length === 0) {
      throw new Error('Country is required');
    }

    return new Address(null, accountId, street, city, postalCode, country);
  }

  static reconstitute(
    id: number,
    accountId: number,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    createdAt: Date
  ): Address {
    return new Address(id, accountId, street, city, postalCode, country, createdAt);
  }

  getId(): number | null {
    return this.id;
  }

  getAccountId(): number {
    return this.accountId;
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getPostalCode(): string {
    return this.postalCode;
  }

  getCountry(): string {
    return this.country;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getFullAddress(): string {
    return `${this.street}, ${this.postalCode} ${this.city}, ${this.country}`;
  }
}
