"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const invoiceData = {
  invoiceNumber: "INV-2024-0042",
  waybillNumber: "WB-2024-7891",
  date: "April 10, 2026",
  dueDate: "April 25, 2026",
  status: "Unpaid" as "Paid" | "Unpaid" | "Pending",

  store: {
    name: "StaffMS Solutions",
    tagline: "Smart Workforce Management",
    address: "42 Business Park, Rajkot",
    state: "Gujarat, India — 360001",
    email: "billing@staffms.com",
    phone: "+91 98765 43210",
    gstin: "24AABCS1429B1Z9",
    logoUrl: "logo.png",
  },

  customer: {
    name: "Rahul Mehta",
    company: "Nexus Technologies Pvt. Ltd.",
    address: "17 Tech Avenue, Ahmedabad",
    state: "Gujarat, India — 380015",
    email: "rahul.mehta@nexustech.in",
    phone: "+91 91234 56789",
  },

  items: [
    {
      id: "PRD-001",
      name: "Staff Management Software License",
      qty: 1,
      rate: 12000,
      discount: 10,
    },
    {
      id: "PRD-002",
      name: "Department Module Setup & Configuration",
      qty: 2,
      rate: 3500,
      discount: 0,
    },
    {
      id: "PRD-003",
      name: "API Integration Service",
      qty: 1,
      rate: 8000,
      discount: 5,
    },
    {
      id: "PRD-004",
      name: "Annual Support & Maintenance",
      qty: 1,
      rate: 5000,
      discount: 0,
    },
    {
      id: "PRD-005",
      name: "User Training Sessions (per session)",
      qty: 3,
      rate: 2000,
      discount: 15,
    },
  ],
  taxRate: 18,
  notes:
    "Payment is due within 15 days. Please include the invoice number in your payment reference. Bank transfer details have been sent separately.",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const itemAmount = (item: (typeof invoiceData.items)[0]) => {
  const gross = item.qty * item.rate;
  return gross - (gross * item.discount) / 100;
};

const subtotal = invoiceData.items.reduce((s, i) => s + itemAmount(i), 0);
const tax = (subtotal * invoiceData.taxRate) / 100;
const total = subtotal + tax;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill = true,
  stroke = false,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function calcHeight(): number {
  return (
    159 +
    126 +
    26 +
    42 +
    invoiceData.items.length * 54 +
    28 +
    26 * 2 +
    60 +
    84 +
    28 +
    52
  );
}

function drawInvoice(canvas: HTMLCanvasElement, logo: HTMLImageElement | null) {
  const W = 794,
    SCALE = 2;
  const H = calcHeight();

  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  const BLACK = "#111111",
    ORANGE = "#f97316";
  const GRAY = "#6b7280",
    GRAY_LINE = "#e5e7eb",
    WHITE = "#ffffff";
  const PAD = 36;

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, W, H);

  let y = 0;

  const HDR = 155;

  ctx.fillStyle = BLACK;
  ctx.fillRect(0, y, W, HDR);

  const logoMaxW = 260,
    logoMaxH = HDR - 30;
  const LX = 28,
    LY = y + 15;

  if (logo && logo.complete && logo.naturalWidth > 0) {
    const asp = logo.naturalWidth / logo.naturalHeight;
    let lw = logoMaxW,
      lh = logoMaxW / asp;
    if (lh > logoMaxH) {
      lh = logoMaxH;
      lw = lh * asp;
    }
    const ly = y + (HDR - lh) / 2;
    ctx.drawImage(logo, LX, ly, lw, lh);
  } else {
    ctx.fillStyle = ORANGE;
    roundRect(ctx, LX, y + (HDR - 48) / 2, 48, 48, 12);
    ctx.fill();
    ctx.fillStyle = WHITE;
    ctx.font = "bold 26px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("S", LX + 24, y + HDR / 2 + 10);
    ctx.textAlign = "left";
    ctx.fillStyle = WHITE;
    ctx.font = "bold 24px Georgia";
    ctx.fillText(invoiceData.store.name, LX + 60, y + 54);
    ctx.fillStyle = ORANGE;
    ctx.font = "12px sans-serif";
    ctx.fillText(invoiceData.store.tagline, LX + 60, y + 74);
  }

  ctx.fillStyle = "#fff";
  ctx.font = "15px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(
    invoiceData.store.address + "  |  " + invoiceData.store.state,
    W - 30,
    y + 42,
  );
  ctx.fillText(
    invoiceData.store.email + "   ·   " + invoiceData.store.phone,
    W - 30,
    y + 65,
  );
  ctx.fillText("GSTIN: " + invoiceData.store.gstin, W - 30, y + 88);
  ctx.textAlign = "left";

  y += HDR;

  ctx.fillStyle = ORANGE;
  ctx.fillRect(0, y, W, 4);
  y += 4;

  y += 16;
  const sec2StartY = y;

  ctx.fillStyle = GRAY;
  ctx.font = "bold 8px sans-serif";
  ctx.fillText("INVOICE TO", PAD, y + 10);
  y += 26;

  ctx.fillStyle = BLACK;
  ctx.font = "bold 14px Georgia";
  ctx.fillText(invoiceData.customer.name, PAD, y);
  y += 14;

  ctx.fillStyle = "#374151";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText(invoiceData.customer.company, PAD, y);
  y += 13;

  ctx.fillStyle = GRAY;
  ctx.font = "10px sans-serif";
  for (const line of [
    invoiceData.customer.address + ", " + invoiceData.customer.state,
    invoiceData.customer.email,
    invoiceData.customer.phone,
  ]) {
    ctx.fillText(line, PAD, y);
    y += 13;
  }

  const metaR = W - PAD;
  const metaL = metaR - 150;

  let my = sec2StartY;

  ctx.fillStyle = BLACK;
  ctx.font = "bold 26px Georgia";
  ctx.textAlign = "right";
  ctx.fillText("INVOICE", metaR, my + 20);

  ctx.fillStyle = ORANGE;
  ctx.font = "bold 10px sans-serif";
  ctx.fillText(invoiceData.invoiceNumber, metaR, my + 36);

  const metaLine = (label: string, val: string, vy: number) => {
    ctx.fillStyle = GRAY;
    ctx.font = "9.5px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(label, metaL, vy);
    ctx.fillStyle = BLACK;
    ctx.font = "bold 9.5px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(val, metaR, vy);
    ctx.textAlign = "left";
  };

  metaLine("Waybill No.", invoiceData.waybillNumber, my + 52);
  metaLine("Issue Date", invoiceData.date, my + 66);
  metaLine("Due Date", invoiceData.dueDate, my + 80);

  const sc =
    invoiceData.status === "Paid"
      ? { bg: "#dcfce7", text: "#16a34a" }
      : invoiceData.status === "Unpaid"
        ? { bg: "#fee2e2", text: "#dc2626" }
        : { bg: "#fef9c3", text: "#ca8a04" };
  ctx.font = "bold 9px sans-serif";
  const sw = ctx.measureText(invoiceData.status.toUpperCase()).width + 20;
  ctx.fillStyle = sc.bg;
  roundRect(ctx, metaR - sw, my + 90, sw, 20, 10);
  ctx.fill();
  ctx.fillStyle = sc.text;
  ctx.textAlign = "center";
  ctx.fillText(invoiceData.status.toUpperCase(), metaR - sw / 2, my + 104);
  ctx.textAlign = "left";

  y = Math.max(y, my + 118);

  ctx.strokeStyle = GRAY_LINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, y);
  ctx.lineTo(W - PAD, y);
  ctx.stroke();
  y += 14;

  const rowH = 54;
  const headH = 42;
  const tW = W - PAD * 2;
  const tTop = y;

  const totalRows = invoiceData.items.length + 3;

  const c = {
    numL: PAD + 12,
    descL: PAD + 48,
    qtyC: PAD + 330,
    rateR: PAD + 444,
    discR: PAD + 546,
    amtR: W - PAD - 6,
  };

  ctx.strokeStyle = GRAY_LINE;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(PAD, tTop, tW, headH + totalRows * rowH);

  ctx.fillStyle = "#fafafa";
  ctx.fillRect(PAD, tTop, tW, headH);

  ctx.fillStyle = "#000";
  ctx.font = "bold 11px sans-serif";

  ctx.textAlign = "left";
  ctx.fillText("#", c.numL, tTop + 26);
  ctx.fillText("DESCRIPTION", c.descL, tTop + 26);

  ctx.textAlign = "center";
  ctx.fillText("QTY", c.qtyC, tTop + 26);

  ctx.textAlign = "right";
  ctx.fillText("RATE", c.rateR, tTop + 26);
  ctx.fillText("DISC%", c.discR, tTop + 26);
  ctx.fillText("AMOUNT", c.amtR, tTop + 26);

  ctx.textAlign = "left";

  ctx.beginPath();
  ctx.moveTo(PAD, tTop + headH);
  ctx.lineTo(PAD + tW, tTop + headH);
  ctx.stroke();

  y += headH;

  invoiceData.items.forEach((item, i) => {
    const rY = y + i * rowH;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(PAD, rY, tW, rowH);

    ctx.strokeStyle = GRAY_LINE;
    ctx.beginPath();
    ctx.moveTo(PAD, rY + rowH);
    ctx.lineTo(PAD + tW, rY + rowH);
    ctx.stroke();

    const cols = [
      c.descL - 20,
      c.qtyC - 40,
      c.rateR - 60,
      c.discR - 60,
      c.amtR - 80,
    ];
    cols.forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, rY);
      ctx.lineTo(x, rY + rowH);
      ctx.stroke();
    });

    ctx.fillStyle = "#000";
    ctx.font = "11px sans-serif";

    ctx.fillText(String(i + 1), c.numL, rY + 28);
    ctx.fillText(item.name, c.descL, rY + 26);

    ctx.fillStyle = GRAY;
    ctx.font = "10px sans-serif";
    ctx.fillText(`(${item.id})`, c.descL, rY + 42);

    ctx.fillStyle = "#000";
    ctx.font = "11px sans-serif";

    ctx.textAlign = "center";
    ctx.fillText(String(item.qty), c.qtyC, rY + 28);

    ctx.textAlign = "right";
    ctx.fillText(fmt(item.rate), c.rateR, rY + 28);

    ctx.fillText(
      item.discount > 0 ? `${item.discount}%` : "-",
      c.discR,
      rY + 28,
    );

    ctx.fillText(fmt(itemAmount(item)), c.amtR, rY + 28);

    ctx.textAlign = "left";
  });

  y += invoiceData.items.length * rowH;

  const drawTotalRow = (
    label: string,
    value: string,
    isBold = false,
    bg = "#fff",
  ) => {
    const rY = y;

    ctx.fillStyle = bg;
    ctx.fillRect(PAD, rY, tW, rowH);

    ctx.strokeStyle = GRAY_LINE;
    ctx.beginPath();
    ctx.moveTo(PAD, rY);
    ctx.lineTo(PAD + tW, rY);
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = `${isBold ? "bold" : ""} 12px sans-serif`;
    ctx.textAlign = "right";
    ctx.fillText(label, c.discR, rY + 30);

    ctx.font = `${isBold ? "bold" : ""} 12px sans-serif`;
    ctx.fillText(value, c.amtR, rY + 30);

    ctx.textAlign = "left";

    y += rowH;
  };

  drawTotalRow("Subtotal", fmt(subtotal));

  drawTotalRow(`GST (${invoiceData.taxRate}%)`, fmt(tax));

  drawTotalRow("TOTAL", fmt(total), true, "#f3f4f6");

  ctx.fillStyle = ORANGE;
  ctx.fillRect(0, y + 100, W, 3);
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, y + 100 + 3, W, 48);
  ctx.fillStyle = "#d1d5db";
  ctx.font = "10px sans-serif";
  ctx.fillText(
    "Thank you for choosing " + invoiceData.store.name + "!",
    PAD,
    y + 130,
  );
  ctx.fillStyle = GRAY;
  ctx.textAlign = "right";
  ctx.fillText(
    `${invoiceData.invoiceNumber}  ·  ${invoiceData.date}`,
    W - PAD,
    y + 130,
  );
  ctx.textAlign = "left";
}

export default function Invoice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sh_token");
    if (!token) {
      alert("Auth required");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const img = new Image();
    img.src = invoiceData.store.logoUrl;
    img.onload = () => drawInvoice(canvasRef.current!, img);
    img.onerror = () => drawInvoice(canvasRef.current!, null);
  }, []);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const jsPDF = (await import("jspdf")).jsPDF;
    const imgData = canvas.toDataURL("image/png");
    const pdfW = 210;
    const pdfH = (canvas.height / canvas.width) * pdfW;
    const pdf = new jsPDF("p", "mm", [pdfW, pdfH]);
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto mb-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Invoice Preview</h1>
            <p className="text-sm text-gray-500">{invoiceData.invoiceNumber}</p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </button>
        </div>
        <div
          className="mx-auto shadow-2xl rounded-2xl overflow-hidden"
          style={{ width: 794 }}
        >
          <canvas ref={canvasRef} />
        </div>
      </main>
    </div>
  );
}
