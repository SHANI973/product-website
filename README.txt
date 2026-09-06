================================================================================
ERHAN UP PAKISTAN — PREMIUM E-COMMERCE LANDING WEBSITE
================================================================================

Welcome to the Erhan Up Pakistan official landing website codebase.
This project is built using pure semantic HTML5, modern modular CSS3, and 
lightweight Vanilla JavaScript with zero external runtime dependencies.

================================================================================
TABLE OF CONTENTS
================================================================================
1. Directory Structure
2. How to Run Locally
3. How to Change Price
4. How to Change WhatsApp Number
5. How to Change Delivery & Shipping Information
6. How to Replace Images
7. How to Edit Product Specifications & Content
8. How to Deploy Online (Free & Production Options)
9. Legal & Disclaimer Notes

================================================================================
1. DIRECTORY STRUCTURE
================================================================================
minimeis-pakistan/
├── index.html            # Main semantic HTML structure with all 20 sections
├── style.css             # Scandinavian luxury design tokens, layout & animations
├── script.js             # Central STORE_CONFIG, interaction engine & WhatsApp generator
├── README.txt            # This operations & maintenance manual
└── assets/
    └── images/
        ├── hero-carrier.jpg        # Mother + baby close-up emotion
        ├── sun-canopy-couple.jpg   # Couple walking with sun canopy
        ├── family-sunlight.jpg     # Family in park golden hour
        ├── city-adventure.jpg      # Father + child urban walk
        └── product-studio.jpg      # Official studio profile & folding view

================================================================================
2. HOW TO RUN LOCALLY
================================================================================
You can preview and test this website locally using any standard web server:

Method A — Using Python (Recommended):
1. Open PowerShell or Command Prompt.
2. Navigate to this project folder:
   cd C:\Users\muham\.gemini\antigravity\scratch\minimeis-pakistan
3. Run the built-in HTTP server:
   python -m http.server 8080
4. Open your browser and visit:
   http://localhost:8080

Method B — Using VS Code:
1. Open the "minimeis-pakistan" folder in VS Code.
2. Install the "Live Server" extension.
3. Right-click "index.html" and click "Open with Live Server".

Method C — Direct File Access:
Simply double-click "index.html" to open it directly in Google Chrome, Edge,
Brave, or Safari.

================================================================================
3. HOW TO CHANGE PRICE
================================================================================
The price is completely centralized at the very top of "script.js".

1. Open "script.js" in any text editor.
2. Look at lines 15–20:

   const STORE_CONFIG = {
     ...
     price: 5000,        // <--- Change this number (e.g. 45000 or 52000)
     currency: "PKR",
     ...
   };

3. Save the file.
4. Refresh your browser. 
   The website will automatically calculate and update the unit price, the
   live quantity multiplier in the checkout box, the mobile order bar, and the
   pre-filled WhatsApp order draft!

================================================================================
4. HOW TO CHANGE WHATSAPP NUMBER
================================================================================
To direct orders to your specific WhatsApp business account:

1. Open "script.js".
2. Edit the top configuration values:

   const STORE_CONFIG = {
     // Enter without "+" or spaces, including country code (92 for Pakistan):
     whatsappNumber: "923315667047",   // <--- Put your 12-digit number here
     
     // Human-readable format displayed on the website:
     displayWhatsapp: "0331 5667047",
     ...
   };

3. Save the file.
All WhatsApp order links, support buttons, and footer contact entries will
instantly route to your new number.

================================================================================
5. HOW TO CHANGE DELIVERY & SHIPPING INFORMATION
================================================================================
In "script.js", you can customize delivery timelines and shipping fees:

   const STORE_CONFIG = {
     ...
     deliveryTime: "2–4 business days (major cities) / 3–6 business days nationwide",
     shippingFee: "Free Nationwide Delivery",
     codAvailable: true,    // Set to false if Cash on Delivery is disabled
     ...
   };

When "codAvailable" is set to false:
The website automatically updates the trust cards and order badges to indicate
"Secure Advance Bank Payment" instead of claiming COD.

================================================================================
6. HOW TO REPLACE IMAGES
================================================================================
All images reside inside the "assets/images/" directory.
To replace an image with your own:

1. Prepare your photograph (high resolution, properly cropped, optimized JPG/WebP).
2. Save it into "assets/images/" using the same file name, OR update the "src"
   attribute in "index.html".
3. Key image files:
   - "hero-carrier.jpg": Hero section & gallery
   - "sun-canopy-couple.jpg": Feature 1 & gallery
   - "family-sunlight.jpg": Product introduction & gallery
   - "city-adventure.jpg": Feature 3, gallery & final CTA backdrop
   - "product-studio.jpg": Foldable design, specs & order form preview

Tip: For optimal page load speed on mobile networks in Pakistan, keep file
sizes between 100 KB and 300 KB.

================================================================================
7. HOW TO EDIT PRODUCT SPECIFICATIONS & CONTENT
================================================================================
All editorial copy is organized into semantic HTML5 sections inside "index.html":

- Section 01: Announcement Marquee (top bar text)
- Section 02: Navigation links & Logo text
- Section 03: Hero Section (Headline, Subhead, Trust bullet points)
- Section 04: Product Statistics (Age, Weight capacity, Carrier weight, Fold dimensions)
- Section 05: Product Introduction (Story & philosophy)
- Section 06: Why Parents Love It (4 core pillars)
- Section 07: Feature Showcase (Alternating editorial features)
- Section 08: Foldable Design (4-step OPEN -> FOLD -> PACK -> GO sequence)
- Section 09: Lifestyle Gallery (Photo captions)
- Section 10: Comfort Section (Ergonomic points)
- Section 11: Safety & Support (Harness, frame details & manufacturer guidance)
- Section 12: How It Works (3-step routine)
- Section 13: Technical Specifications (Specs table)
- Section 14: Testimonials (Customer experience quotes)
- Section 15: FAQ Accordion (8 questions & answers)
- Section 16: Pakistan Delivery / Trust
- Section 17: Final Call to Action
- Section 18: Order Form & City list
- Section 19: Footer
- Section 20: Mobile Order Bar

================================================================================
8. HOW TO DEPLOY ONLINE
================================================================================
Because this is a completely static, standalone website, it can be deployed in
seconds for free on any modern hosting provider:

Option 1 — Netlify:
1. Visit https://app.netlify.com/drop
2. Drag and drop the "minimeis-pakistan" folder into the browser window.
3. Your site is live instantly with an SSL certificate.

Option 2 — Vercel:
1. Install Vercel CLI or connect your GitHub repository to Vercel.
2. Run `vercel deploy`.

Option 3 — GitHub Pages:
1. Push the folder to a GitHub repository.
2. Go to Settings > Pages > Source: "main branch / root".
3. Save.

Option 4 — Traditional Pakistani Web Hosting (cPanel / Apache / Nginx):
1. Connect via FTP or cPanel File Manager.
2. Upload the contents into "public_html/".
3. The site works immediately without requiring PHP or database setup.

================================================================================
9. LEGAL & TRADEMARK NOTICE
================================================================================
- MiniMeis is an internationally registered trademark of MiniMeis AS, Norway.
- This landing website is configured as an independent retail and distribution
  showcase for the Pakistani market.
- Always observe official safety limits: child must be able to sit unsupported
  (approx. 6 months) up to 18 kg maximum.
================================================================================
