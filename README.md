

MEDITRUST(Break-the-Glass Protocol)

This project is a full-stack, decentralized application designed to solve a critical problem in emergency medicine: providing first responders and doctors with immediate, life-saving access to a patient's vital health information, while maintaining patient privacy and control under normal circumstances.

Project Vision: The "Break-the-Glass" Scenario

In a critical emergency, a patient may be incapacitated and unable to grant consent. First responders and doctors often lack access to vital information like blood type, allergies, or pre-existing conditions, leading to dangerous delays or medical errors.

This system addresses this by implementing a "Break-the-Glass" protocol:

Normal State: The patient's data is fully encrypted and under their control. No one can access it.

Emergency State: A verified healthcare provider can trigger an emergency override to access the encrypted data.

Patient Acknowledgement: The moment the data is accessed, an automated, immutable notification is logged, and the patient is alerted, ensuring transparency and accountability.

System Architecture & Workflow

The system operates in two distinct phases:

Phase 1: Secure Data Onboarding (Patient-Controlled)

This is the standard process where a patient uploads their information.

graph TD
    A[Patient's Mobile App - Expo] -- Uploads Health Record Image --> B{Django Backend};
    B -- OCR & Structuring --> C[Google Gemini API];
    C -- Returns FHIR JSON --> B;
    B -- Encrypts FHIR data --> B;
    B -- Uploads Encrypted File --> D[IPFS via Pinata];
    D -- Returns Immutable CID --> B;
    B -- Logs CID on Blockchain --> E[Ethereum via Ganache];
    E -- Returns Tx Hash --> B;
    B -- Stores Encrypted Key in Secure Vault --> F[Secure Key Escrow];
    B -- Confirms Success --> A;

Phase 2: Emergency Data Access (Doctor Override)

This is the "Break-the-Glass" protocol in action.

graph TD
    subgraph "Emergency Situation"
        G[Doctor/First Responder] -- Provides Patient Identifier & Own Credentials --> H{Backend API};
    end
    
    subgraph "Backend Verification & Override"
        H -- Verifies Doctor's Identity --> H;
        H -- Retrieves Encrypted Key --> I[Secure Key Escrow];
        H -- Retrieves CID from Blockchain --> J[Ethereum Blockchain];
    end
    
    subgraph "Data Access & Patient Notification"
        H -- Provides Decryption Key & CID --> G;
        G -- Downloads Encrypted File from IPFS & Decrypts --> K[Patient Health Record];
        H -- Triggers Automated Notification --> L[Patient's Email/SMS];
        H -- Logs Access Event on Blockchain --> J;
    end
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Mermaid
IGNORE_WHEN_COPYING_END
Core Technologies & Their Roles

Frontend (Expo): The patient's interface for uploading and managing their health data.

Backend (Django): The central orchestrator for the entire workflow, managing API requests, encryption, and communication between services.

Google Gemini API: Acts as an intelligent medical data parser, converting unstructured image text into a standardized FHIR format, crucial for interoperability.

IPFS (via Pinata): Stores the encrypted health record. Its content-addressable nature ensures the data file cannot be tampered with.

Ethereum (via Ganache): Serves as an immutable audit log. It logs:

The initial creation of a record (CID).

Crucially, every "break-the-glass" access event, creating a permanent, non-repudiable record of who accessed the data and when.

AES Encryption: The core of our privacy model. It ensures that the data stored on the public IPFS network is unreadable without the specific decryption key.

Secure Key Escrow (Conceptual): A critical backend component (e.g., HashiCorp Vault, AWS KMS) that securely holds the decryption keys, releasing them only when an authorized emergency override is initiated.

Data Standards & Compliance in an Emergency Context

This architecture is designed with HIPAA (US), GDPR (EU), and DPDPA (India) in mind, especially regarding emergency access.

FHIR / HL7

By structuring data as a FHIR Patient Resource, we ensure it is immediately useful and interoperable with hospital EHR systems once decrypted, saving precious time.

HIPAA, GDPR, & DPDPA Compliance

Disclaimer: This is a proof-of-concept. Achieving full compliance requires rigorous legal and security audits.

Our architecture aligns with key principles for emergency data access:

Legal Basis for Processing (GDPR/DPDPA): In an emergency where the patient cannot consent, data processing is permissible to protect the "vital interests" of the individual. Our system is built on this principle.

Emergency Access (HIPAA): The HIPAA Privacy Rule allows healthcare providers to access necessary patient information for treatment in emergency situations, even if formal consent cannot be obtained. Our override protocol facilitates this.

Accountability and Transparency (Crucial for All Regulations): This is the most important feature of our design.

The "Patient Acknowledgement" is not just a feature; it's a core compliance mechanism. By immediately notifying the patient (or their designated contact) and logging the access event on the immutable blockchain, we create a transparent and undeniable audit trail.

This prevents abuse of the override feature and demonstrates to regulators that access is controlled, logged, and accountable.

Data Minimization: The Gemini prompt is engineered to only extract essential medical information, preventing the collection of extraneous personal data.

Setup and Installation

(The setup instructions for backend, blockchain, and frontend remain the same as in the previous README. They are omitted here for brevity but should be included in the final file.)

Future Development & Next Steps

To make this concept production-ready, the following components need to be built out:

Healthcare Provider Portal: A secure web interface for doctors/hospitals to register and initiate "break-the-glass" requests.

Identity Verification System: Integration with a trusted identity provider to verify the credentials of healthcare professionals.

Patient Notification Service: A robust system using services like Twilio (SMS) or SendGrid (Email) to deliver post-access alerts.

Secure Key Escrow Implementation: Integrate a production-grade secrets management tool like HashiCorp Vault to manage the encryption keys.

Role-Based Access Control (RBAC): A detailed permissions system defining what different types of users (patients, doctors, paramedics) can do.
