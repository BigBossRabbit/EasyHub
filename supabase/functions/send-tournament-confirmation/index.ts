import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "tournament@resend.dev";

interface RequestBody {
  name: string;
  email: string;
  signupNumber: number;
  isWaitingList: boolean;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, signupNumber, isWaitingList }: RequestBody = await req.json();

    if (!name || !email || signupNumber == null) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const statusText = isWaitingList ? "Waiting List" : "Confirmed";
    const statusColor = isWaitingList ? "#F59E0B" : "#22C55E";
    const subject = isWaitingList
      ? `Africa Bitcoin Day 2026 - Waiting List #${signupNumber}`
      : `Africa Bitcoin Day 2026 - You're In! #${signupNumber}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tournament Sign-Up Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Courier New',monospace;color:#e0e0e0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="padding:40px 20px;text-align:center;">
        <div style="background:linear-gradient(135deg,#FF7000,#FFD700);border-radius:16px 16px 0 0;padding:30px 20px;">
          <h1 style="margin:0;font-size:24px;color:#000;font-weight:900;letter-spacing:-0.5px;">AFRICA BITCOIN DAY 2026</h1>
          <p style="margin:8px 0 0;font-size:14px;color:#333;font-weight:700;">Pool Tournament - Sign-Up Confirmation</p>
        </div>
        <div style="background:#1a1a1a;border:1px solid #333;border-top:none;border-radius:0 0 16px 16px;padding:30px 20px;">
          <p style="font-size:16px;margin:0 0 20px;">Hey <strong style="color:#FFD700;">${name}</strong>,</p>
          <p style="font-size:14px;line-height:1.6;margin:0 0 24px;color:#ccc;">
            ${isWaitingList
              ? `You've been placed on the <strong style="color:#F59E0B;">waiting list</strong> for the Africa Bitcoin Day 2026 Pool Tournament. All 64 spots are currently claimed, but you'll be first in line if a spot opens up!`
              : `You're officially signed up for the <strong style="color:#22C55E;">Africa Bitcoin Day 2026 Pool Tournament</strong>! Get ready to compete!`
            }
          </p>
          <div style="background:#0a0a0a;border:2px solid #FF7000;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#888;font-weight:700;">Your Sign-Up Number</p>
            <p style="margin:0;font-size:56px;font-weight:900;color:#FF7000;line-height:1;">#${signupNumber}</p>
            <div style="display:inline-block;margin-top:12px;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:${statusColor}22;color:${statusColor};border:1px solid ${statusColor}44;">
              ${statusText}
            </div>
          </div>
          <div style="background:#0a0a0a;border:1px solid #333;border-radius:12px;padding:20px;margin:0 0 24px;text-align:left;">
            <p style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;font-weight:700;">Event Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;font-size:13px;color:#888;width:120px;">Date</td><td style="padding:6px 0;font-size:13px;color:#e0e0e0;font-weight:700;">Saturday, 23 May 2026</td></tr>
              <tr><td style="padding:6px 0;font-size:13px;color:#888;">Format</td><td style="padding:6px 0;font-size:13px;color:#e0e0e0;font-weight:700;">Pool Tournament - 64 Players</td></tr>
              <tr><td style="padding:6px 0;font-size:13px;color:#888;">Payment Due</td><td style="padding:6px 0;font-size:13px;color:#EF4444;font-weight:700;">1:00 PM - 23 May 2026</td></tr>
            </table>
          </div>
          ${!isWaitingList ? `
          <div style="background:#EF444411;border:1px solid #EF444433;border-radius:12px;padding:16px;margin:0 0 24px;text-align:left;">
            <p style="margin:0;font-size:13px;color:#FCA5A5;line-height:1.5;">
              <strong>Important:</strong> If payment is not completed by <strong>1:00 PM on 23 May 2026</strong>, your spot will be given to the next person on the waiting list.
            </p>
          </div>` : `
          <div style="background:#F59E0B11;border:1px solid #F59E0B33;border-radius:12px;padding:16px;margin:0 0 24px;text-align:left;">
            <p style="margin:0;font-size:13px;color:#FCD34D;line-height:1.5;">
              <strong>Tip:</strong> Show up on tournament day with your sign-up number. If any confirmed players don't pay by the deadline, spots go to waitlisted players who are present!
            </p>
          </div>`}
          <p style="font-size:13px;color:#888;line-height:1.6;margin:0 0 24px;text-align:center;">
            <strong>Save this email!</strong> Your sign-up number is your unique identifier for tournament day.
          </p>
          <div style="border-top:1px solid #333;padding-top:20px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;color:#888;">Powered by <strong style="color:#FF7000;">EasySats</strong> - Africa Bitcoin Day 2026</p>
            <p style="margin:0;font-size:11px;color:#555;">In partnership with ABC Hub, Jokers & EasySats</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `EasySats Tournament <${FROM_EMAIL}>`,
        to: [email],
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to send email", resendStatus: resendResponse.status, resendError: errorText }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await resendResponse.json();
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
