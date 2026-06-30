/**
 * Pure Javascript JSON-file database implementation.
 * Replaces better-sqlite3 to bypass native compilation issues on Windows / Node 24.
 * Exposes the exact same interface (q.<query>.get() and q.<query>.run()).
 *
 * Modified to perform all operations synchronously. This ensures complete 
 * transaction isolation and prevents race conditions under quick consecutive requests.
 */
const path = require('path');
const fs   = require('fs');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const USERS_FILE    = path.join(DATA_DIR, 'users_db.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments_db.json');

/**
 * Reads a JSON file synchronously. Returns an empty array if file does not exist or has invalid JSON.
 */
function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`[db] Error reading JSON from ${file}:`, err);
    return [];
  }
}

/**
 * Writes data to a JSON file synchronously.
 */
function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`[db] Error writing JSON to ${file}:`, err);
  }
}

// Database query interfaces matching the SQLite queries
const q = {
  findUserByUsername: {
    get(username) {
      const users = readJSON(USERS_FILE);
      return users.find(u => u.username === username);
    }
  },
  findUserByEmail: {
    get(email) {
      const users = readJSON(USERS_FILE);
      return users.find(u => u.email === email);
    }
  },
  findUserById: {
    get(id) {
      const users = readJSON(USERS_FILE);
      return users.find(u => u.id === Number(id));
    }
  },
  insertUser: {
    run(name, username, email, password_hash) {
      const users = readJSON(USERS_FILE);
      const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = {
        id,
        name,
        username,
        email,
        password_hash,
        has_premium: 0,
        ad_free_until: null,
        created_at: new Date().toISOString()
      };
      users.push(newUser);
      writeJSON(USERS_FILE, users);
      return { lastInsertRowid: id };
    }
  },
  grantPremium: {
    run(adFreeUntil, userId) {
      const users = readJSON(USERS_FILE);
      const user = users.find(u => u.id === Number(userId));
      if (user) {
        user.has_premium = 1;
        user.ad_free_until = adFreeUntil;
        writeJSON(USERS_FILE, users);
      }
    }
  },
  insertPayment: {
    run(user_id, razorpay_order_id, amount, status, is_mock) {
      const payments = readJSON(PAYMENTS_FILE);
      const id = payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 1;
      const newPayment = {
        id,
        user_id,
        razorpay_order_id,
        razorpay_payment_id: null,
        amount,
        status,
        is_mock,
        created_at: new Date().toISOString()
      };
      payments.push(newPayment);
      writeJSON(PAYMENTS_FILE, payments);
      return { lastInsertRowid: id };
    }
  },
  completePayment: {
    run(paymentId, status, orderId) {
      const payments = readJSON(PAYMENTS_FILE);
      const payment = payments.find(p => p.razorpay_order_id === orderId);
      if (payment) {
        payment.razorpay_payment_id = paymentId;
        payment.status = status;
        writeJSON(PAYMENTS_FILE, payments);
      }
    }
  }
};

module.exports = {
  db: { pragma() {} }, // Mock db object to avoid crash on custom database properties
  q
};
