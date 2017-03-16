export class AppSettings {
  public static get API_ENDPOINT(): string {
    return  'http://10.100.8.89/api';
  }

  public static get NOTIFICATION_OPTIONS() {
    return { timeOut: 10000 };
  }
}
