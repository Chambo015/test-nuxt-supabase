class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

/**
 * Проверка на существование какого либо значения
 * @param value - value to check on exist
 * @param message - message error
 */
export default function assert(value: any, message: string) {
  if (!value) {
    throw new AssertionError(message);
  }
}
