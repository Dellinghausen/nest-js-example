export const defaultBlacklist = [
  'card',
  'cnpj',
  'cpf',
  'cvv',
  'num',
  'pass',
  'phone',
  'secu',
  'telefone',
  'auth',
  'senha',
  'password',
  'authorization',
  'access_token',
];

export class SensitiveInformationFilter {
  private blacklist: string[];

  constructor(blacklist?: string[], private placeholder = '*sensitive*') {
    this.blacklist = blacklist || [...defaultBlacklist];
  }

  public filter(obj: Record<string, any>): Record<string, any> {
    const filteredObj: Record<string, any> = {};

    Object.keys(obj).forEach((key: string) => {
      const value = obj[key] ? obj[key] : '';

      if (this.isPlainObject(value)) {
        filteredObj[key] = this.filter(value);

        return;
      }

      if (this.isJSONString(value)) {
        filteredObj[key] = JSON.stringify(this.filter(JSON.parse(value)));

        return;
      }

      filteredObj[key] = value;

      // querystring params tratative
      if (typeof value === 'string' && this.isOnBlacklist(value)) {
        filteredObj[key] = this.filterPasswordParams(value);
      }

      if (this.isOnBlacklist(key)) {
        filteredObj[key] = this.setPlaceholder(value);
      }
    });

    return filteredObj;
  }

  protected isPlainObject(value: any) {
    // The logger will accept only "plain" objects like: { foo: 123 }
    return value?.constructor === Object || Array.isArray(value);
  }

  protected isJSONString(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    if (!value.startsWith('{') && !value.startsWith('[')) {
      return false;
    }

    try {
      JSON.parse(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  protected filterPasswordParams(value: string) {
    return value.replace(/(password=).*?(&|$)/, '$1' + this.placeholder + '$2');
  }

  protected setPlaceholder(value: unknown): string {
    if (typeof value !== 'string') {
      return this.placeholder;
    }

    if (value.length < 8) {
      return this.placeholder;
    }

    return `${value.slice(0, 2)}${this.placeholder}${value.slice(-2)}`;
  }

  protected isOnBlacklist(key: string): boolean {
    return this.blacklist.some((blacklistedKey) => key.toLowerCase().includes(blacklistedKey.toLowerCase()));
  }
}
