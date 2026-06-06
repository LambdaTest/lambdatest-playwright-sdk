import * as Playwright from 'playwright';

export default function smartuiSnapshot(
  page: Playwright.Page,
  snapshotName: string,
): Promise<void>;
