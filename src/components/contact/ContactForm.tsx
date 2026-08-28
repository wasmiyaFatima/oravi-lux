"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        needsActivation?: boolean;
      } | null;

      if (!response.ok) {
        setStatus("error");
        setError(
          result?.needsActivation
            ? t("activation")
            : (result?.error ?? t("error")),
        );
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(t("error"));
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            disabled={status === "sending"}
            className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent disabled:opacity-60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm">
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            disabled={status === "sending"}
            className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent disabled:opacity-60"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={status === "sending"}
          className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent disabled:opacity-60"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === "sending"}
          className="resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent disabled:opacity-60"
        />
      </div>

      {status === "success" ? (
        <p className="text-sm text-accent" role="status">
          {t("success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-800" role="alert">
          {error || t("error")}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
