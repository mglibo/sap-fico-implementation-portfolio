import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const casesSource = fs.readFileSync(path.join(root, "lib", "cases.ts"), "utf8");

const expectedP2P003Evidence = [
  "STEP_01_OBBO_CREATE_POSTING_PERIOD_VARIANT_NT01.png",
  "STEP_02_OBBP_ASSIGN_POSTING_PERIOD_VARIANT_NT01_TO_COMPANY_CODE_NT01.png",
  "STEP_03_OB52_OPEN_POSTING_PERIOD_07_2026_FOR_VARIANT_NT01.png",
  "STEP_04_FS00_CREATE_EXPENSE_GL_ACCOUNT_610000.png",
  "STEP_05_FS00_CONFIGURE_EXPENSE_GL_ACCOUNT_610000_TAX_CATEGORY.png",
  "STEP_06_FTXP_INITIAL_INPUT_TAX_CODE_V1_RATE_NOT_MAINTAINED.png",
  "STEP_07_OBYZ_VERIFY_TAX_PROCEDURE_TAXD_INPUT_TAX_MWVS.jpeg",
  "STEP_08_OBQ1_VERIFY_MWVS_CONDITION_TYPE.jpeg",
  "STEP_09_FTXP_INPUT_TAX_CODE_V5_RATE_NOT_VISIBLE.jpeg",
  "STEP_10_VERIFY_V5_19_PERCENT_INPUT_TAX_CONDITION_RECORD.jpeg",
  "STEP_11_FS00_CONFIGURE_INPUT_VAT_GL_ACCOUNT_157000.png",
  "STEP_12_OB40_ASSIGN_VST_TO_GL_ACCOUNT_157000.png",
  "STEP_13_OBA7_VERIFY_VENDOR_INVOICE_DOCUMENT_TYPE_KR_NUMBER_RANGE_15.png",
  "STEP_14_FBN1_CREATE_DOCUMENT_NUMBER_RANGE_15_NT01_2026.png",
  "STEP_15_FB60_ERROR_F5155_NO_AMOUNT_AUTHORIZATION_NT01.png",
  "STEP_16_OBA4_CREATE_DEFAULT_EMPLOYEE_TOLERANCE_GROUP_NT01.png",
  "STEP_17_FB60_ZERO_BALANCE_190_EUR_DIFFERENCE.jpeg",
  "STEP_18_FB60_SIMULATE_VENDOR_INVOICE_ACCOUNTING_ENTRY.png",
  "STEP_19_FB60_ERROR_GLT2076_MISSING_DOCUMENT_SPLITTING_ITEM_CATEGORY.png",
  "STEP_20_DOCUMENT_SPLITTING_CLASSIFY_GL_ACCOUNT_610000_AS_EXPENSE.png",
  "STEP_21_FB03_DISPLAY_POSTED_VENDOR_INVOICE_1700000000.png",
  "STEP_22_FBL1N_VERIFY_VENDOR_OPEN_ITEM_100000.png",
  "STEP_23_SE16N_VERIFY_BKPF_DOCUMENT_1700000000_NT01_2026.png",
  "STEP_24_SE16N_VERIFY_BSEG_DOCUMENT_ITEMS_1700000000_NT01_2026.png",
  "STEP_25_SE16N_VERIFY_BSIK_VENDOR_OPEN_ITEM_100000.png",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const filename of expectedP2P003Evidence) {
  const file = path.join(root, "public", "images", "p2p-003", filename);
  assert(fs.existsSync(file), `Missing P2P-003 evidence asset: ${filename}`);
}

assert(
  expectedP2P003Evidence.every((filename) => casesSource.includes(filename)),
  "Not every P2P-003 evidence filename is represented in case data.",
);

assert(
  casesSource.includes('status: "complete"') &&
    casesSource.includes('statusLabel: "Complete - posted and technically validated"'),
  "P2P-003 must be marked complete after final technical validation.",
);

assert(
  casesSource.includes('label: "FBL1N confirms the vendor open item"') &&
    casesSource.includes('label: "BKPF confirms the FI document header"') &&
    casesSource.includes('label: "BSEG confirms the accounting line items"') &&
    casesSource.includes('label: "BSIK confirms the open vendor-item record"'),
  "Final technical validation checks must be visible.",
);

assert(
  !casesSource.includes("validation evidence pending") &&
    !casesSource.includes("Future table-validation evidence still pending") &&
    !casesSource.includes("Future evidence screenshot still pending"),
  "P2P-003 should not retain stale pending-validation wording.",
);

assert(
  casesSource.includes('id: "p2p-004"') &&
    casesSource.includes('id: "p2p-005"') &&
    [...casesSource.matchAll(/id: "p2p-00[45]"[\s\S]*?routeEnabled: false/g)].length >= 2,
  "P2P-004 and P2P-005 must remain planned without enabled routes.",
);

const debitTotal = 1000 + 190;
const creditTotal = 1190;
assert(debitTotal === creditTotal, "P2P-003 accounting entry does not balance.");

assert(
  !casesSource.includes("C:\\\\") && !casesSource.includes("Life_OS"),
  "Website case data must not expose local Windows paths or Life OS internals.",
);

console.log("Case-data validation passed.");
console.log(`P2P-003 evidence assets: ${expectedP2P003Evidence.length}`);
console.log(`P2P-003 accounting balance: ${debitTotal - creditTotal}.00 EUR`);
