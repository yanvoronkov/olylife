import React, { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAF6AZxG6zWS064W1",
  onSuccess,
  onError,
  onExpire,
  className = "my-2 flex justify-center",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (isMounted) onSuccess(token);
          },
          "error-callback": () => {
            if (isMounted && onError) onError();
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
          theme: "light",
          size: "flexible",
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.warn("Turnstile render warning:", err);
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);

      return () => {
        clearInterval(interval);
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {}
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
};
