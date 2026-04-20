import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  try {
    const { html } = req.body;

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome', // Ruta estándar en contenedores Linux
  args: [
    "--no-sandbox", 
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage" // Importante para evitar errores de memoria en la nube
  ]
});

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf"
    });

    res.send(pdf);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando PDF" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor PDF corriendo en puerto", PORT);
});
