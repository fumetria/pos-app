import { expect, test } from 'vitest';
import { printer } from '../constants';

test('Is the printer connected?', async () => {
    expect(await printer.isPrinterConnected()).toBe(true);
})