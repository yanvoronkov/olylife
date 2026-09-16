/**
 * Flexible non-rigid phone formatter for Uzbekistan (+998), Kyrgyzstan (+996),
 * international numbers and messengers.
 * Features:
 * - Clean, natural Backspace deletion (never gets stuck on prefixes or punctuation).
 * - Automatic formatting for Kyrgyzstan (+996) and Uzbekistan (+998).
 * - Unrestricted input for Telegram/WhatsApp handles (@username) or letters.
 */
export function formatFlexiblePhone(
  input: string,
  prevValue: string = "",
  preferredCity: "tashkent" | "bishkek" = "tashkent"
): string {
  if (!input) return "";

  // 1. If user deleted everything down to the prefix, clear completely
  const isDeleting = prevValue.length > input.length;
  const trimmed = input.trim();
  const prefixPatterns = [
    "+",
    "+9",
    "+99",
    "+998",
    "+998 (",
    "+996",
    "+996 (",
    "+7",
    "+7 (",
  ];
  if (isDeleting && prefixPatterns.includes(trimmed)) {
    return "";
  }

  // 2. If starts with @ or contains letters, allow free typing
  if (input.startsWith("@") || /[a-zA-Zа-яА-ЯёЁ_]/.test(input)) {
    return input;
  }

  // 3. Extract digits
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";

  // If user deleted and only country code remains, allow clearing to empty
  if (isDeleting && (digits === "998" || digits === "996" || digits === "7")) {
    return "";
  }

  // If user hit Backspace on a formatted string and is deleting a formatting character,
  // ensure we remove the previous digit if needed
  if (
    isDeleting &&
    (prevValue.endsWith("-") || prevValue.endsWith(" ") || prevValue.endsWith(")"))
  ) {
    const prevDigits = prevValue.replace(/\D/g, "");
    if (prevDigits === digits && digits.length > 0) {
      digits = digits.slice(0, -1);
    }
  }

  if (!digits) return "";

  // 4. Kyrgyzstan number with 996 prefix (+996 (XXX) XXX-XXX)
  if (digits.startsWith("996")) {
    const local = digits.slice(3);
    if (!local) {
      return isDeleting ? "" : "+996 (";
    }
    let res = "+996 (" + local.substring(0, 3);
    if (local.length > 3) {
      res += ") " + local.substring(3, 6);
    }
    if (local.length > 6) {
      res += "-" + local.substring(6, 9);
    }
    return res;
  }

  // 5. Uzbekistan number with 998 prefix (+998 (XX) XXX-XX-XX)
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
      res += "-" + local.substring(7, 9);
    }
    return res;
  }

  // 6. Other international codes (+7, +375, etc.)
  if (input.startsWith("+")) {
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

  // 7. Local input according to preferred city
  if (preferredCity === "bishkek") {
    // Kyrgyzstan mobile codes typically start with 7, 5, 9, 2
    let res = "+996 (" + digits.substring(0, 3);
    if (digits.length > 3) {
      res += ") " + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      res += "-" + digits.substring(6, 9);
    }
    return res;
  } else {
    // Uzbekistan local input
    let res = "+998 (" + digits.substring(0, 2);
    if (digits.length > 2) {
      res += ") " + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      res += "-" + digits.substring(5, 7);
    }
    if (digits.length > 7) {
      res += "-" + digits.substring(7, 9);
    }
    return res;
  }
}
