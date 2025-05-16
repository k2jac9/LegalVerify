# LegalVerify - Trusted Records Hub

## ✅ Project Overview
LegalVerify is a blockchain-powered platform that provides secure, verifiable legal reviews and Continuing Legal Education (CLE) records. Built on a multi-blockchain architecture (Aptos and Stellar), LegalVerify ensures that legal records are transparent, tamper-proof, and easily verifiable.

---

## ✅ Key Features
- **Immutable Legal Records:** Once recorded on the blockchain, reviews and CLE records cannot be altered or deleted.
- **Multi-Blockchain Support:** Integrated with Aptos (Move) and Stellar (SAC), with future support for Ethereum, Polkadot, and Forte.
- **Secure Verification:** Each record is cryptographically signed and linked to a blockchain transaction ID.
- **User-Friendly Dashboard:** Separate dashboards for Lawyers, Clients, and CLE Providers.
- **Searchable Database:** Easily search and access verified records.
- **Professional Security:** Designed for legal professionals, ensuring privacy and security.

---

## ✅ Tech Stack
- **Frontend:** React (Next.js) with Tailwind CSS (Light and Dark Mode).
- **Backend:** Node.js + Express (ProofBox API - Multi-Blockchain).
- **Blockchain Networks:** Aptos (Move), Stellar (SAC - Manage Data).
- **Authentication:** NextAuth.js (JWT for secure user sessions).
- **Deployment:**
  - Frontend: Vercel (Continuous Deployment).
  - Backend: Node.js (DigitalOcean, Railway, or Vercel).
  - CI/CD: GitHub Actions (Automatic Deployment).

---

## ✅ Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/k2jac9/lpf.git
cd lpf
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
- Create a `.env.local` file in the root directory.
- Add the following environment variables:
```env
NEXT_PUBLIC_APTOS_NODE_URL=https://fullnode.mainnet.aptos.dev
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon.stellar.org
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Build and Deploy (Production)
```bash
npm run build
npm run start
```

---

## ✅ Usage
### For Lawyers
- Create and manage verifiable legal reviews.
- Share verified reviews with clients and colleagues.

### For Clients
- Submit and view verifiable legal reviews.
- Access trusted, blockchain-verified feedback.

### For CLE Providers
- Verify CLE records for lawyers.
- Manage compliance records and ensure accuracy.

---

## ✅ API Documentation
- **POST /proofbox/create** - Create a blockchain record (Client Review or CLE Record).
- **POST /proofbox/verify** - Verify an existing blockchain record.

### Example Request (Create Record)
```json
{
  "network": "aptos",
  "recordType": 0,
  "hash": "SHA-256 hash of the review"
}
```

---

## ✅ Contributing
We welcome contributions to LegalVerify! Please follow the standard GitHub flow:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## ✅ License
Licensed under the MIT License.

---

## ✅ Contact
- Twitter: [@YourTwitterHandle]
- GitHub: [@k2jac9](https://github.com/k2jac9)
- Email: your-email@example.com
