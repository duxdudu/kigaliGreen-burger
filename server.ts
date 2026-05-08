import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key");

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  const PORT = 3000;

  app.use(express.json());

  // Socket.io for Real-time Tracking
  io.on("connection", (socket) => {
    console.log("Rider/User connected:", socket.id);
    
    socket.on("update-rider-location", (data) => {
      // Broadcast rider location to all subscribers for this order
      io.emit(`order-tracking-${data.orderId}`, {
        lat: data.lat,
        lng: data.lng,
        status: data.status,
        progress: data.progress
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Stripe Payment Intent API
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, items } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 1),
        currency: "rwf",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          itemsCount: items?.length || 0,
        }
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/orders", async (req, res) => {
    res.json({ success: true, orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
