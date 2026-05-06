// Cloudflare Pages Function: POST /api/subscribe
// Strategy: try Beehiiv first if creds present, else fall back to Resend notify.
// At least one of (BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID) or RESEND_API_KEY must be set.

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad JSON" }, 400);
  }

  const email = (body?.email || "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return json({ error: "Enter a valid email" }, 400);
  }

  if (env.BEEHIIV_API_KEY && env.BEEHIIV_PUBLICATION_ID) {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "buildquietwinloud.com",
          utm_medium: "landing",
        }),
      }
    );

    if (beehiivRes.ok) return json({ ok: true, via: "beehiiv" });
    const errBody = await beehiivRes.text();
    console.error("Beehiiv error", beehiivRes.status, errBody);
    // fall through to Resend backup
  }

  if (env.RESEND_API_KEY && env.RESEND_NOTIFY_TO && env.RESEND_NOTIFY_FROM) {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: env.RESEND_NOTIFY_FROM,
        to: env.RESEND_NOTIFY_TO,
        subject: `New BQWL waitlist signup: ${email}`,
        text: `Email: ${email}\nTime: ${new Date().toISOString()}\nUA: ${request.headers.get("user-agent") || "?"}\nIP: ${request.headers.get("cf-connecting-ip") || "?"}`,
      }),
    });

    if (resendRes.ok) return json({ ok: true, via: "resend" });
    const errBody = await resendRes.text();
    console.error("Resend error", resendRes.status, errBody);
    return json({ error: "Couldn't save. Try again in a minute." }, 500);
  }

  // No backend wired yet — log to function logs so signups aren't silently lost.
  console.log("Waitlist signup (no backend wired):", email);
  return json({ ok: true, via: "log" });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
