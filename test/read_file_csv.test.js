const { startProcess } = require("../src/start_process");

describe('test read files', () => {
  test('input fiel does not exist', async () => {
    const resp = await startProcess("inpu", ".csv", "square");
    expect(resp).toBe(false);
  });

  test('input extension does not exist', async () => {
    const resp = await startProcess("input", ".txt", "square");
    expect(resp).toBe(false);
  });

  test('input shape type does not exist', async () => {
    const resp = await startProcess("input", ".csv", "squa");
    expect(resp).toBe(false);
  });

  test('input read OK', async () => {
    const resp = await startProcess("input", ".csv", "square");
    expect(resp).toBe(true);
  });
});