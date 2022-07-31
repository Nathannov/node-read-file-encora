const { checkFileExist } = require("../src/file_verificacion");

describe('test read files', () => {
  test('input fiel does not exist', async () => {
    const resp = await checkFileExist("inpu", ".csv", "square");
    expect(resp).toBe(false);
  });

  test('input extension does not exist', async () => {
    const resp = await checkFileExist("input", ".txt", "square");
    expect(resp).toBe(false);
  });

  test('input shape type does not exist', async () => {
    const resp = await checkFileExist("input", ".csv", "squa");
    expect(resp).toBe(false);
  });

  test('input read OK', async () => {
    const resp = await checkFileExist("input", ".csv", "square");
    expect(resp).toBe(true);
  });
});