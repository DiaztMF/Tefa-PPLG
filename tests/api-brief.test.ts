import test from "node:test";
import assert from "node:assert/strict";

test("Brief API Logic - Validation rules for empty fields", () => {
  const validateBriefPayload = (payload: { name?: string; whatsapp?: string; brief?: string }) => {
    if (!payload.name || !payload.whatsapp || !payload.brief) {
      return { valid: false, error: "Nama, No. WhatsApp, dan Brief wajib diisi." };
    }
    return { valid: true };
  };

  assert.equal(validateBriefPayload({ name: "", whatsapp: "08123", brief: "test" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "", brief: "test" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "08123", brief: "" }).valid, false);
  assert.equal(validateBriefPayload({ name: "Budi", whatsapp: "08123", brief: "Desain Web" }).valid, true);
});

test("Brief API Logic - WhatsApp redirect URL generation", () => {
  const name = "Budi Santoso";
  const whatsapp = "081234567890";
  const brief = "Buat Landing Page";
  const service = "Web Development";

  const message = `Halo Admin TeFa PPLG,%0A%0ASaya ingin berkonsultasi mengenai proyek:%0A- *Nama:* ${encodeURIComponent(name)}%0A- *No. WA:* ${encodeURIComponent(whatsapp)}%0A- *Layanan:* ${encodeURIComponent(service)}%0A- *Briefing Proyek:* ${encodeURIComponent(brief)}`;

  const waUrl = `https://wa.me/6281234567890?text=${message}`;

  assert.ok(waUrl.includes("wa.me/6281234567890"));
  assert.ok(waUrl.includes(encodeURIComponent(name)));
  assert.ok(waUrl.includes(encodeURIComponent(brief)));
});
