export class SettingsModel {
  constructor(
    readonly layout: {
      readonly current: string;
      readonly params: Record<string, Record<string, number>>;
    },
    readonly template: string,
    readonly navigation: string,
  ) {}
}
