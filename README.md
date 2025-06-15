# 🏥 MEDITRUST (Break-the-Glass Protocol)

A full-stack, decentralized emergency healthcare access system that ensures **life-saving medical data** is accessible in critical moments — while maintaining **patient privacy and control** under normal conditions.

---

## 🎯 Project Vision: The "Break-the-Glass" Scenario

In life-threatening emergencies, patients may be unconscious or unable to give consent. Yet, first responders **need access** to:

- 🩸 Blood type  
- 💊 Allergies  
- ❤️ Pre-existing conditions  

To prevent delays or life-threatening errors.

### ✅ Solution:

- 🔐 **Normal Mode**: Data is encrypted and fully controlled by the patient.
- 🚨 **Emergency Mode**: Verified doctors can trigger override access.
- 📩 **Patient Notification**: Immediate alerts and immutable blockchain logs keep everything transparent and auditable.

---

## 🛠️ System Architecture & Workflow

### 📦 Phase 1: Secure Data Onboarding (Patient-Controlled)

1. 🧑 Patient uploads health record image via **Expo mobile app**.
2. 🧠 **Django backend** receives it and calls the **Gemini API** for OCR & structuring.
3. 📦 Gemini returns **FHIR-compliant JSON**.
4. 🔐 Backend encrypts the JSON using AES.
5. 🗃️ Encrypted file is stored on **IPFS via Pinata**.
6. 🧾 Returned CID is logged on **Ethereum blockchain via Ganache**.
7. 🔑 Encryption key is stored in a secure vault (e.g., HashiCorp Vault).
8. ✅ Patient is notified of successful onboarding.

---

### 🚑 Phase 2: Emergency Data Access (Doctor Override)

1. 👨‍⚕️ Doctor provides credentials and patient ID.
2. 🔒 Backend verifies the doctor’s identity.
3. 🔎 Retrieves encrypted CID from blockchain and key from vault.
4. 📦 Doctor downloads and decrypts patient’s record using the key and CID.
5. 📩 Patient receives SMS/email alert.
6. 🧾 Blockchain logs the access for accountability.

---

## 🧠 Core Technologies

| Layer        | Tech Stack | Role |
|--------------|------------|------|
| 👨‍⚕️ Frontend | Expo React Native | Upload, access & notifications |
| 🧠 Backend | Django | Main orchestrator, API routing, encryption |
| 🧬 AI Parsing | Google Gemini API | Converts OCR text to FHIR JSON |
| ☁️ Storage | IPFS (via Pinata) | Decentralized, tamper-proof data storage |
| ⛓️ Audit Logging | Ethereum + Ganache | Immutable record of data access |
| 🔐 Encryption | AES | Patient data protection |
| 🗝️ Key Vault | HashiCorp Vault (conceptual) | Secure key management & release |

---

## 📋 Compliance-Focused Design

### ⚖️ HIPAA | GDPR | DPDPA

- 🧾 Logs all access events immutably.
- 👁️ Sends real-time alerts to patient (SMS/email).
- 💡 Allows access *only* during legitimate emergencies.
- 🧼 Extracts only **essential** medical data (via Gemini AI).

---

## 📄 FHIR / HL7 Standard

The structured output follows **FHIR Patient Resources**, making it:

- 🏥 Directly integrable with hospital EHR systems
- 🚀 Ready-to-use immediately on decryption

---

## ⚙️ Setup and Installation

### 🚀 Backend (Django)

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# Migrate DB
python manage.py makemigrations
python manage.py migrate

# Run the server
python manage.py runserver
```

### 📱 Frontend (Expo)

```bash
npm install
npx expo start
```

---

## 🔮 Future Development

| Feature | Description |
|--------|-------------|
| 🏥 Healthcare Portal | Web UI for hospitals & paramedics to register, request access |
| 🔐 Identity System | Verify doctors with NMC/MCI/official ID |
| 📡 Notification System | Email/SMS via Twilio or SendGrid |
| 🗝️ Secure Vault | Key escrow implementation using HashiCorp Vault / AWS KMS |
| 👥 Role-based Access | Different roles for paramedics, doctors, patients |

---

## 💬 Why MediTrust Matters

✔️ Saves lives by reducing 30+ minute retrieval delays to under 5 minutes  
✔️ Gives patients complete control over their health data  
✔️ Provides trust, transparency, and accountability in emergency situations  

---

> ⚠️ **Disclaimer**: This is a research-level MVP. It showcases technical feasibility and privacy-first emergency access, but a production rollout must pass medical, legal, and security audits.

📬 For queries, contributions, or feedback — feel free to connect!
