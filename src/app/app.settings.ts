export class AppSettings {
  public static get API_ENDPOINT(): string {
    return  'http://localhost:5000';
  }

  public static get NOTIFICATION_OPTIONS() {
    return { timeOut: 10000 };
  }
}
