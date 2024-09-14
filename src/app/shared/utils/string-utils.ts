export class StringUtils {
  public static convertCamelCaseToTitleCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  }

  public static convertTitleCaseToCamelCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join('');
  }
}
