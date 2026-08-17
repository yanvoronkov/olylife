/**
 * Flexible non-rigid phone formatter for Uzbekistan and messengers.
 * Automatically formats Uzbekistan numbers while allowing Telegram handles (@username)
 * and international phone formats without strict blocking.
 */
export function formatFlexiblePhone(input: string): string {
  if (!input) return "";

  // 1. If starts with @ or contains letters (Telegram / WhatsApp handle), leave as free text
  if (input.startsWith("@") || /[a-zA-Zа-яА-ЯёЁ_]/.test(input)) {
    return input;
  }

  // 2. Extract digits only
  const digits = input.replace(/\D/g, "");
  if (!digits) return input.startsWith("+") ? "+" : "";

  // 3. International number (not Uzbekistan) starting with + (e.g. +7, +375, +994)
  if (input.startsWith("+") && !digits.startsWith("998")) {
    // If Russian / KZ (+7)
    if (digits.startsWith("7")) {
      const rest = digits.slice(1);
      let res = "+7";
      if (rest.length > 0) res += " (" + rest.substring(0, 3);
      if (rest.length >= 3) res += ") " + rest.substring(3, 6);
      if (rest.length >= 6) res += "-" + rest.substring(6, 8);
      if (rest.length >= 8) res += "-" + rest.substring(8, 10);
      return res;
    }
    return "+" + digits;
  }

  // 4. Uzbekistan number starting with 998
  if (digits.startsWith("998")) {
    const rest = digits.slice(3);
    let res = "+998";
    if (rest.length > 0) {
      res += " (" + rest.substring(0, 2);
    }
    if (rest.length >= 2) {
      res += ") " + rest.substring(2, 5);
    }
    if (rest.length >= 5) {
      res += "-" + rest.substring(5, 7);
    }
    if (rest.length >= 7) {
      res += "-" + rest.substring(7, 9);
    }
    return res;
  }

  // 5. Local 9-digit Uzbekistan input (e.g. user typed 90..., 91..., 93..., 94..., 95..., 97..., 98..., 99..., 33..., 88..., 71...)
  if (digits.length <= 9 && (digits.startsWith("9") || digits.startsWith("3") || digits.startsWith("8") || digits.startsWith("7"))) {
    let res = "+998 (" + digits.substring(0, 2);
    if (digits.length >= 2) {
      res += ") " + digits.substring(2, 5);
    }
    if (digits.length >= 5) {
      res += "-" + digits.substring(5, 7);
    }
    if (digits.length >= 7) {
      res += "-" + digits.substring(7, 9);
    }
    return res;
  }

  // 6. Fallback: keep original with + if started with +
  return input.startsWith("+") ? "+" + digits : digits;
}
