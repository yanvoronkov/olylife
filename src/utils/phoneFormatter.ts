/**
 * Flexible non-rigid phone formatter for Uzbekistan and messengers.
 * Features:
 * - Clean, natural Backspace deletion (never gets stuck on prefixes or punctuation).
 * - Automatic formatting for Uzbekistan (+998) and international numbers (+7, etc.).
 * - Unrestricted input for Telegram/WhatsApp handles (@username) or letters.
 */
export function formatFlexiblePhone(input: string, prevValue: string = ""): string {
  if (!input) return "";

  // 1. If user deleted everything down to the prefix (+, +9, +99, +998, +998 (, etc.), clear completely
  const isDeleting = prevValue.length > input.length;
  const trimmed = input.trim();
  if (isDeleting && (trimmed === "+" || trimmed === "+9" || trimmed === "+99" || trimmed === "+998" || trimmed === "+998 (" || trimmed === "+998 (")) {
    return "";
  }

  // 2. If starts with @ or contains letters, allow free typing
  if (input.startsWith("@") || /[a-zA-Zа-яА-ЯёЁ_]/.test(input)) {
    return input;
  }

  // 3. Extract digits
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";

  // If user deleted and only 998 remains, allow clearing to empty
  if (isDeleting && digits === "998") {
    return "";
  }

  // If user hit Backspace on a formatted string and is deleting a formatting character,
  // ensure we remove the previous digit if needed
  if (isDeleting && prevValue.endsWith("-") || prevValue.endsWith(" ") || prevValue.endsWith(")")) {
    const prevDigits = prevValue.replace(/\D/g, "");
    if (prevDigits === digits && digits.length > 0) {
      digits = digits.slice(0, -1);
    }
  }

  if (!digits) return "";

  // 4. Other international codes (+7, +375, etc.)
  if (input.startsWith("+") && !digits.startsWith("998")) {
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

  // 5. Uzbekistan number with 998 prefix
  if (digits.startsWith("998")) {
    const local = digits.slice(3);
    if (!local) {
      return isDeleting ? "" : "+998 (";
    }
    let res = "+998 (" + local.substring(0, 2);
    if (local.length > 2) {
      res += ") " + local.substring(2, 5);
    }
    if (local.length > 5) {
      res += "-" + local.substring(5, 7);
    }
    if (local.length > 7) {
      res += "-" + local.substring(7);
    }
    return res;
  }

  // 6. Local Uzbekistan input without 998 (e.g. 90, 91, 93, 94, 95, 97, 98, 99, 33, 88, 71, 77)
  if (digits.startsWith("9") || digits.startsWith("3") || digits.startsWith("8") || digits.startsWith("7")) {
    let res = "+998 (" + digits.substring(0, 2);
    if (digits.length > 2) {
      res += ") " + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      res += "-" + digits.substring(5, 7);
    }
    if (digits.length > 7) {
      res += "-" + digits.substring(7);
    }
    return res;
  }

  return input.startsWith("+") ? "+" + digits : digits;
}
