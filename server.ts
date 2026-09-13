import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { Database } from './server/db';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'alkhair-graphics-secret-key-2026';

// Lazy initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Ensure uploads directory exists
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function startServer() {
  const app = express();
  const db = Database.getInstance();

  app.use(cors());
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Static serving for user uploads
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Authentication Middleware
  const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
      (req as any).admin = decoded;
      next();
    } catch {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'AL Khair Graphics Backend' });
  });

  // XML Sitemap endpoint
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.header('Content-Type', 'application/xml');
      return res.sendFile(sitemapPath);
    }
    res.status(404).send('Sitemap not found');
  });

  // Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    const robotsPath = path.resolve(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.header('Content-Type', 'text/plain');
      return res.sendFile(robotsPath);
    }
    res.status(404).send('User-agent: *\nAllow: /\nSitemap: /sitemap.xml');
  });

  // Google Search Console verification endpoint
  app.get('/googlec7fa3181f2ab08ba.html', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.send('google-site-verification: googlec7fa3181f2ab08ba.html');
  });

  // Business Settings
  app.get('/api/settings', (req, res) => {
    res.json(db.getSettings());
  });

  app.put('/api/settings', authenticateAdmin, (req, res) => {
    const updated = db.updateSettings(req.body);
    res.json(updated);
  });

  // Services
  app.get('/api/services', (req, res) => {
    res.json(db.getServices());
  });

  app.post('/api/services', authenticateAdmin, (req, res) => {
    const service = db.addService(req.body);
    res.status(201).json(service);
  });

  app.put('/api/services/:id', authenticateAdmin, (req, res) => {
    const updated = db.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json(updated);
  });

  app.delete('/api/services/:id', authenticateAdmin, (req, res) => {
    const success = db.deleteService(req.params.id);
    if (!success) return res.status(404).json({ error: 'Service not found' });
    res.json({ success: true });
  });

  // Portfolio Items
  app.get('/api/portfolio', (req, res) => {
    res.json(db.getPortfolio());
  });

  app.post('/api/portfolio', authenticateAdmin, (req, res) => {
    const item = db.addPortfolio(req.body);
    res.status(201).json(item);
  });

  app.put('/api/portfolio/:id', authenticateAdmin, (req, res) => {
    const updated = db.updatePortfolio(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Portfolio item not found' });
    res.json(updated);
  });

  app.delete('/api/portfolio/:id', authenticateAdmin, (req, res) => {
    const success = db.deletePortfolio(req.params.id);
    if (!success) return res.status(404).json({ error: 'Portfolio item not found' });
    res.json({ success: true });
  });

  // Gallery
  app.get('/api/gallery', (req, res) => {
    res.json(db.getGallery());
  });

  app.post('/api/gallery', authenticateAdmin, (req, res) => {
    const item = db.addGallery(req.body);
    res.status(201).json(item);
  });

  app.put('/api/gallery/:id', authenticateAdmin, (req, res) => {
    const updated = db.updateGallery(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Gallery item not found' });
    res.json(updated);
  });

  app.delete('/api/gallery/:id', authenticateAdmin, (req, res) => {
    const success = db.deleteGallery(req.params.id);
    if (!success) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ success: true });
  });

  // Reviews
  app.get('/api/reviews', (req, res) => {
    res.json(db.getReviews());
  });

  app.post('/api/reviews', authenticateAdmin, (req, res) => {
    const review = db.addReview(req.body);
    res.status(201).json(review);
  });

  app.put('/api/reviews/:id', authenticateAdmin, (req, res) => {
    const updated = db.updateReview(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json(updated);
  });

  app.delete('/api/reviews/:id', authenticateAdmin, (req, res) => {
    const success = db.deleteReview(req.params.id);
    if (!success) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true });
  });

  // Quotes (Public submit + Admin manage)
  app.post('/api/quotes', (req, res) => {
    const { fullName, phoneNumber, serviceRequired, projectDetails } = req.body;
    if (!fullName || !phoneNumber || !serviceRequired || !projectDetails) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }
    const newQuote = db.addQuote(req.body);
    res.status(201).json({ success: true, quote: newQuote });
  });

  app.get('/api/quotes', authenticateAdmin, (req, res) => {
    res.json(db.getQuotes());
  });

  app.put('/api/quotes/:id', authenticateAdmin, (req, res) => {
    const { status, notes } = req.body;
    const updated = db.updateQuoteStatus(req.params.id, status, notes);
    if (!updated) return res.status(404).json({ error: 'Quote not found' });
    res.json(updated);
  });

  app.delete('/api/quotes/:id', authenticateAdmin, (req, res) => {
    const success = db.deleteQuote(req.params.id);
    if (!success) return res.status(404).json({ error: 'Quote not found' });
    res.json({ success: true });
  });

  // Contact Messages (Public submit + Admin manage)
  app.post('/api/contact', (req, res) => {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Please provide your name, phone number, and message' });
    }
    const newMsg = db.addMessage(req.body);
    res.status(201).json({ success: true, message: newMsg });
  });

  app.get('/api/contact', authenticateAdmin, (req, res) => {
    res.json(db.getMessages());
  });

  app.put('/api/contact/:id/read', authenticateAdmin, (req, res) => {
    const { isRead } = req.body;
    const updated = db.markMessageRead(req.params.id, isRead !== false);
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  });

  app.delete('/api/contact/:id', authenticateAdmin, (req, res) => {
    const success = db.deleteMessage(req.params.id);
    if (!success) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  });

  // Media upload (Base64 or image data)
  app.post('/api/upload', authenticateAdmin, (req, res) => {
    try {
      const { fileName, fileData } = req.body;
      if (!fileName || !fileData) {
        return res.status(400).json({ error: 'Missing file data' });
      }
      
      const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(UPLOADS_DIR, safeName);
      
      // Parse base64
      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(fileData, 'base64');
      
      fs.writeFileSync(filePath, buffer);
      const fileUrl = `/uploads/${safeName}`;
      res.status(201).json({ url: fileUrl, name: safeName, size: buffer.length });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save file: ' + err.message });
    }
  });

  // Dashboard Stats
  app.get('/api/stats', authenticateAdmin, (req, res) => {
    res.json(db.getStats());
  });

  // AI Assistant Chat Route (Powered by Gemini)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const settings = db.getSettings();
      const services = db.getServices();
      const serviceNames = services.map(s => s.name).join(', ');

      const systemPrompt = `You are "AL Khair AI", the official virtual design and printing consultant for AL Khair Graphics in Dera Ismail Khan (D.I. Khan), Pakistan.
Business Information:
- Studio Name: ${settings.name} (${settings.category})
- Location/Address: ${settings.address}
- Phone: ${settings.phone}
- WhatsApp: ${settings.whatsappNumber}
- Operating Hours: ${settings.hours} (We work 24/7 for urgent orders!)
- Services Offered: ${serviceNames}
- Specialties: Large Format Flex Printing (Star Flex, China Flex, Backlit Flex), Billboards & Hoardings, Shop Signboards & 3D Acrylic Letters, Custom 3D Wallpapers & Murals for homes & offices, Commercial Branding & Logos, Business Cards, Posters & Flyers, Social Media Graphics.

Behavior Guidelines:
- Language: You can understand and respond fluently in Roman Urdu (e.g. "Aap ka order 24 ghante me ready ho jayega"), Urdu (اردو), and English. Always match the customer's language.
- Tone: Friendly, respectful, professional, welcoming ("Assalam-o-Alaikum! Khush-aamdeed").
- Rates: Give realistic general estimates if asked (e.g., standard flex ~Rs. 18-35/sq.ft depending on China vs Star quality; 3D wallpapers per sq.ft or per wall; business cards 1000 cards packages), and advise them that exact final discounts can be confirmed instantly on WhatsApp at ${settings.whatsappNumber} or by submitting a Quote Request right here on the website.
- Turnaround: Mention 24/7 service in D.I. Khan with rush same-day options.
- Keep responses concise, clear, and action-oriented. Never break character.`;

      const ai = getAI();
      let aiReply: string | null = null;

      if (ai) {
        try {
          // Prepare conversation contents
          const formattedContents: any[] = [];
          
          if (Array.isArray(history) && history.length > 0) {
            for (const h of history.slice(-6)) {
              if (h.role === 'user' || h.role === 'assistant') {
                formattedContents.push({
                  role: h.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: h.content || '' }]
                });
              }
            }
          }
          
          formattedContents.push({
            role: 'user',
            parts: [{ text: message }]
          });

          const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: formattedContents,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          });

          if (aiResponse && aiResponse.text) {
            aiReply = aiResponse.text.trim();
          }
        } catch (geminiErr: any) {
          console.warn('Gemini API call failed, falling back to local assistant:', geminiErr.message);
        }
      }

      // Intelligent Local Fallback if Gemini API key is missing or errored
      if (!aiReply) {
        const lower = message.toLowerCase();
        
        if (lower.includes('flex') || lower.includes('banner') || lower.includes('rate') || lower.includes('price') || lower.includes('qimat') || lower.includes('kitne')) {
          aiReply = `Assalam-o-Alaikum! AL Khair Graphics par Flex Printing do qualities me dastiyab hai:\n\n1. **Star Flex (Heavy Quality)**: Outdoor boards aur billboards ke liye best hai, long-lasting colors.\n2. **China Flex (Standard)**: Temporary banners aur events ke liye economical choice.\n\nRates size aur square feet ke hisab se hotay hain. Hamara studio **24 Ghante** khula rehta hai! Aap apna size btaein ya WhatsApp (${settings.whatsappNumber}) par direct message karein for best rates.`;
        } else if (lower.includes('wallpaper') || lower.includes('wall') || lower.includes('deewar')) {
          aiReply = `Assalam-o-Alaikum! Hum high-definition 3D Wallpapers aur custom wall murals print aur install karte hain for drawing rooms, bedrooms aur corporate offices. Waterproof aur washable materials available hain.\n\nAap apni deewar ka size (Height x Width) bata kar instant quote le saktay hain ya hamaray studio par visit kar ke catalog dekh saktay hain!`;
        } else if (lower.includes('kahan') || lower.includes('location') || lower.includes('address') || lower.includes('shop') || lower.includes('office')) {
          aiReply = `Hamara studio Dera Ismail Khan me waqia hai:\n📍 **${settings.address}**\n\nHum **24 Hours Open** hain! Agar aapko rasta samajhne me madad chahiye to call karein: **${settings.phone}**.`;
        } else if (lower.includes('card') || lower.includes('visiting') || lower.includes('business card')) {
          aiReply = `Ji bilkul! Hum premium Business Cards print karte hain:\n- Matte Lamination\n- Gloss Lamination\n- Velvet Touch & UV Spot\n- Plastic / PVC Cards\n\n1000 cards ke special packages available hain. Aap apna design WhatsApp karein ya humse fresh design karwayein!`;
        } else if (lower.includes('logo') || lower.includes('design') || lower.includes('calligraphy')) {
          aiReply = `AL Khair Graphics creative graphic designing me specialize karta hai! Hum Urdu aur English typography, modern company logos, shop signboards aur social media posters banatay hain.\n\nHum pehle sample design dikhatay hain aur aapki tasalli ke baad print karte hain.`;
        } else if (lower.includes('time') || lower.includes('timing') || lower.includes('open') || lower.includes('khula')) {
          aiReply = `Good news! AL Khair Graphics **24 Ghante (Open 24/7)** open rehta hai. Emergency aur rush printing orders Dera Ismail Khan me sab se tezi se tayar kiye jatay hain.`;
        } else {
          aiReply = `Assalam-o-Alaikum! AL Khair Graphics AI Assistant me khush-aamdeed! 🎨\n\nHum Dera Ismail Khan me Graphic Design, Flex & Banner Printing, 3D Wallpapers, Sign Boards aur Business Cards ki 24/7 service faraham karte hain.\n\nAap kis service ya rate ke baray me maloomat chahte hain? Aap WhatsApp par bhi rabta kar saktay hain: ${settings.whatsappNumber}`;
        }
      }

      res.json({ reply: aiReply });
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  });

  // Authentication Routes
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = db.findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  });

  app.get('/api/auth/me', authenticateAdmin, (req, res) => {
    const adminData = (req as any).admin;
    const admin = db.findAdminByEmail(adminData.email);
    if (!admin) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });
  });

  app.put('/api/auth/profile', authenticateAdmin, (req, res) => {
    const adminData = (req as any).admin;
    const { name, email, newPassword } = req.body;
    
    if (newPassword) {
      db.updateAdminPassword(adminData.id, newPassword);
    }
    
    const updated = db.updateAdminProfile(adminData.id, name || adminData.name, email || adminData.email);
    res.json({ success: true, user: updated });
  });

  // ==========================================
  // VITE MIDDLEWARE / PRODUCTION STATIC SERVE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AL Khair Graphics server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
