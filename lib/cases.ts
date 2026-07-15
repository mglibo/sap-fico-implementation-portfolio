export type CaseStatus = "complete" | "validation-pending" | "planned";
export type StatusTone = "success" | "warning" | "secondary";
export type ModuleName = "SAP FI" | "SAP FI/MM" | "SAP FI/CO" | "Cross-module";

export type AccountingLine = {
  type: "Dr" | "Cr";
  account: string;
  label: string;
  amount: number;
  amountDisplay: string;
  impact: string;
};

export type TimelineStep = {
  stage: string;
  title: string;
  description: string;
  evidenceSteps?: number[];
};

export type ProductionIssue = {
  id: string;
  title: string;
  message?: string;
  symptom: string;
  businessImpact: string;
  rootCause: string;
  investigation: string[];
  resolution: string;
  lesson: string;
  relatedEvidenceSteps: number[];
};

export type EvidenceItem = {
  step: number;
  src: string;
  filename: string;
  title: string;
  group: string;
  transaction: string;
  whatItProves: string;
  alt: string;
  relatedIssueId?: string;
};

export type ValidationItem = {
  group?: "Functional validation" | "Technical validation" | "Final conclusion";
  label: string;
  status: "complete" | "pending" | "planned";
  detail: string;
};

export type RelatedCase = {
  id: string;
  label: string;
  available: boolean;
};

export type PortfolioCase = {
  id: string;
  slug: string;
  title: string;
  process: "P2P" | "O2C" | "R2R" | "AA" | "CO" | "Cross-module";
  module: ModuleName;
  status: CaseStatus;
  statusLabel: string;
  statusTone: StatusTone;
  implementationResult: string;
  businessObjective: string;
  shortObjective: string;
  companyCode?: string;
  vendor?: string;
  documentNumber?: string;
  fiscalYear?: string;
  documentType?: string;
  reference?: string;
  currency?: string;
  postingDate?: string;
  taxCode?: string;
  transactions: string[];
  tables: string[];
  configurationObjects: string[];
  prerequisites: string[];
  architecture: string[];
  configuration: string[];
  timeline: TimelineStep[];
  accountingEntry: AccountingLine[];
  accountingSummary?: string;
  productionIssues: ProductionIssue[];
  evidence: EvidenceItem[];
  validation: ValidationItem[];
  lessons: string[];
  interviewTalkingPoint: string;
  relatedCases: RelatedCase[];
  routeEnabled: boolean;
};

export type ProcessRoadmapItem = {
  id: string;
  label: string;
  statusLabel: string;
  status: CaseStatus;
  slug?: string;
  routeEnabled: boolean;
};

const p2p003Evidence: EvidenceItem[] = ([
  {
    step: 1,
    filename: "STEP_01_OBBO_CREATE_POSTING_PERIOD_VARIANT_NT01.png",
    group: "Posting Period Setup",
    transaction: "OBBO",
    title: "Create posting-period variant NT01",
    whatItProves: "Created posting period variant NT01 for NovaTech.",
  },
  {
    step: 2,
    filename: "STEP_02_OBBP_ASSIGN_POSTING_PERIOD_VARIANT_NT01_TO_COMPANY_CODE_NT01.png",
    group: "Posting Period Setup",
    transaction: "OBBP",
    title: "Assign posting-period variant to NT01",
    whatItProves: "Assigned posting period variant NT01 to company code NT01.",
  },
  {
    step: 3,
    filename: "STEP_03_OB52_OPEN_POSTING_PERIOD_07_2026_FOR_VARIANT_NT01.png",
    group: "Posting Period Setup",
    transaction: "OB52",
    title: "Open posting period 07/2026",
    whatItProves: "Opened posting period 07/2026 for all account types using account type +.",
  },
  {
    step: 4,
    filename: "STEP_04_FS00_CREATE_EXPENSE_GL_ACCOUNT_610000.png",
    group: "G/L and Tax Configuration",
    transaction: "FS00",
    title: "Create expense account 610000",
    whatItProves: "Created P&L account 610000, Laboratory supplies.",
  },
  {
    step: 5,
    filename: "STEP_05_FS00_CONFIGURE_EXPENSE_GL_ACCOUNT_610000_TAX_CATEGORY.png",
    group: "G/L and Tax Configuration",
    transaction: "FS00",
    title: "Configure expense-account tax category",
    whatItProves: "Configured company-code control data for 610000; tax category shown as *.",
  },
  {
    step: 6,
    filename: "STEP_06_FTXP_INITIAL_INPUT_TAX_CODE_V1_RATE_NOT_MAINTAINED.png",
    group: "G/L and Tax Configuration",
    transaction: "FTXP",
    title: "Initial V1 tax attempt abandoned",
    whatItProves: "Initial V1 tax code described 15% input tax, but no condition rate was maintained. V1 was not the final tax code.",
  },
  {
    step: 7,
    filename: "STEP_07_OBYZ_VERIFY_TAX_PROCEDURE_TAXD_INPUT_TAX_MWVS.jpeg",
    group: "G/L and Tax Configuration",
    transaction: "OBYZ",
    title: "Verify TAXD tax procedure",
    whatItProves: "Verified German tax procedure TAXD contains MWVS input-tax condition with account key VST.",
  },
  {
    step: 8,
    filename: "STEP_08_OBQ1_VERIFY_MWVS_CONDITION_TYPE.jpeg",
    group: "G/L and Tax Configuration",
    transaction: "OBQ1",
    title: "Verify MWVS condition type",
    whatItProves: "Verified MWVS is a tax condition using percentage calculation and access sequence MWST.",
  },
  {
    step: 9,
    filename: "STEP_09_FTXP_INPUT_TAX_CODE_V5_RATE_NOT_VISIBLE.jpeg",
    group: "G/L and Tax Configuration",
    transaction: "FTXP",
    title: "V5 rate not visible on revisit",
    whatItProves: "V5 appeared to have a blank MWVS rate on the tax-rate screen after revisit.",
  },
  {
    step: 10,
    filename: "STEP_10_VERIFY_V5_19_PERCENT_INPUT_TAX_CONDITION_RECORD.jpeg",
    group: "G/L and Tax Configuration",
    transaction: "Condition record",
    title: "Confirm V5 19% condition record",
    whatItProves: "Confirmed V5 condition record exists at 19.000%, valid from 12.07.2026 to 31.12.9999.",
  },
  {
    step: 11,
    filename: "STEP_11_FS00_CONFIGURE_INPUT_VAT_GL_ACCOUNT_157000.png",
    group: "G/L and Tax Configuration",
    transaction: "FS00",
    title: "Configure input VAT account 157000",
    whatItProves: "Configured input VAT G/L 157000. Screenshot shows tax category * and line-item display.",
  },
  {
    step: 12,
    filename: "STEP_12_OB40_ASSIGN_VST_TO_GL_ACCOUNT_157000.png",
    group: "G/L and Tax Configuration",
    transaction: "OB40",
    title: "Assign VST to input VAT account",
    whatItProves: "Assigned transaction key VST to G/L 157000 for chart of accounts NTCA.",
  },
  {
    step: 13,
    filename: "STEP_13_OBA7_VERIFY_VENDOR_INVOICE_DOCUMENT_TYPE_KR_NUMBER_RANGE_15.png",
    group: "Document Controls",
    transaction: "OBA7",
    title: "Verify document type KR",
    whatItProves: "Verified document type KR uses number range 15.",
  },
  {
    step: 14,
    filename: "STEP_14_FBN1_CREATE_DOCUMENT_NUMBER_RANGE_15_NT01_2026.png",
    group: "Document Controls",
    transaction: "FBN1",
    title: "Create number range interval 15",
    whatItProves: "Created 2026 interval 15 for NT01: 1700000000-1799999999.",
  },
  {
    step: 15,
    filename: "STEP_15_FB60_ERROR_F5155_NO_AMOUNT_AUTHORIZATION_NT01.png",
    group: "Invoice Execution and Troubleshooting",
    transaction: "FB60",
    title: "F5155 amount authorization error",
    whatItProves: "Captured F5155: no amount authorization for customers/vendors in NT01.",
    relatedIssueId: "f5155",
  },
  {
    step: 16,
    filename: "STEP_16_OBA4_CREATE_DEFAULT_EMPLOYEE_TOLERANCE_GROUP_NT01.png",
    group: "Document Controls",
    transaction: "OBA4",
    title: "Create default tolerance group",
    whatItProves: "Created blank/default employee tolerance group for NT01 with sandbox posting limits.",
    relatedIssueId: "f5155",
  },
  {
    step: 17,
    filename: "STEP_17_FB60_ZERO_BALANCE_190_EUR_DIFFERENCE.jpeg",
    group: "Invoice Execution and Troubleshooting",
    transaction: "FB60",
    title: "Zero-balance difference of 190 EUR",
    whatItProves: "Captured 190 EUR imbalance when header gross was 1,190 and expense line was 1,000.",
    relatedIssueId: "zero-balance",
  },
  {
    step: 18,
    filename: "STEP_18_FB60_SIMULATE_VENDOR_INVOICE_ACCOUNTING_ENTRY.png",
    group: "Invoice Execution and Troubleshooting",
    transaction: "FB60 simulation",
    title: "Simulate vendor invoice accounting",
    whatItProves: "Simulation produced vendor credit 1,190, expense debit 1,000, and input VAT debit 190.",
  },
  {
    step: 19,
    filename: "STEP_19_FB60_ERROR_GLT2076_MISSING_DOCUMENT_SPLITTING_ITEM_CATEGORY.png",
    group: "Invoice Execution and Troubleshooting",
    transaction: "FB60 / New GL",
    title: "GLT2076 document splitting error",
    whatItProves: "Captured GLT2076: no document-splitting item category for account 610000/NTCA.",
    relatedIssueId: "glt2076",
  },
  {
    step: 20,
    filename: "STEP_20_DOCUMENT_SPLITTING_CLASSIFY_GL_ACCOUNT_610000_AS_EXPENSE.png",
    group: "Invoice Execution and Troubleshooting",
    transaction: "Document splitting",
    title: "Classify 610000 as Expense",
    whatItProves: "Classified G/L 610000 as item category 20000 Expense.",
    relatedIssueId: "glt2076",
  },
  {
    step: 21,
    filename: "STEP_21_FB03_DISPLAY_POSTED_VENDOR_INVOICE_1700000000.png",
    group: "Final Result",
    transaction: "FB03",
    title: "Display posted document 1700000000",
    whatItProves: "Displayed posted document 1700000000, company code NT01, fiscal year 2026, balanced to zero.",
  },
  {
    step: 22,
    filename: "STEP_22_FBL1N_VERIFY_VENDOR_OPEN_ITEM_100000.png",
    group: "Final Technical Validation",
    transaction: "FBL1N",
    title: "Verify Vendor Open Item in FBL1N",
    whatItProves: "Confirms that document 1700000000 remains open on vendor 100000 for 1,190.00 EUR. The invoice created an outstanding vendor liability and has not yet been paid or cleared.",
    alt: "FBL1N showing the open vendor invoice for vendor 100000 and document 1700000000.",
  },
  {
    step: 23,
    filename: "STEP_23_SE16N_VERIFY_BKPF_DOCUMENT_1700000000_NT01_2026.png",
    group: "Final Technical Validation",
    transaction: "SE16N - BKPF",
    title: "Verify Accounting Document Header in BKPF",
    whatItProves: "Confirms the accounting-document header for document 1700000000, company code NT01, and fiscal year 2026. The posted FI document exists at database-header level with the expected identifying information.",
    alt: "BKPF record for accounting document 1700000000 in company code NT01 and fiscal year 2026.",
  },
  {
    step: 24,
    filename: "STEP_24_SE16N_VERIFY_BSEG_DOCUMENT_ITEMS_1700000000_NT01_2026.png",
    group: "Final Technical Validation",
    transaction: "SE16N - BSEG",
    title: "Verify Accounting Document Items in BSEG",
    whatItProves: "Confirms the vendor, expense, and input VAT line items for document 1700000000: vendor 100000 credit 1,190.00 EUR, G/L 610000 debit 1,000.00 EUR, and G/L 157000 debit 190.00 EUR.",
    alt: "BSEG line items for document 1700000000 showing vendor, expense, and input VAT postings.",
  },
  {
    step: 25,
    filename: "STEP_25_SE16N_VERIFY_BSIK_VENDOR_OPEN_ITEM_100000.png",
    group: "Final Technical Validation",
    transaction: "SE16N - BSIK",
    title: "Verify Open Vendor Item in BSIK",
    whatItProves: "Confirms that the posted invoice is technically stored as an open vendor item. The document is eligible for a later payment and clearing process through the automatic payment program.",
    alt: "BSIK record confirming document 1700000000 as an open vendor item.",
  },
] satisfies Array<Omit<EvidenceItem, "src" | "alt"> & { alt?: string }>).map((item) => ({
  ...item,
  src: `/images/p2p-003/${item.filename}`,
  alt: item.alt ?? `P2P-003 step ${item.step}: ${item.whatItProves}`,
}));

const p2p002Evidence: EvidenceItem[] = [
  "CASE_002_01_XK01_INITIAL_SCREEN_BIOLAB.png",
  "CASE_002_02_OB13_CREATE_CHART_OF_ACCOUNTS_NTCA.png",
  "CASE_002_03_OBY6_ASSIGN_CHART_OF_ACCOUNTS_TO_COMPANY_CODE_NT01.png",
  "CASE_002_04_OBD4_CREATE_GL_ACCOUNT_GROUPS_NTCA.png",
  "CASE_002_05_OB53_DEFINE_RETAINED_EARNINGS_ACCOUNT_NTCA.png",
  "CASE_002_06_OBY6_ASSIGN_FIELD_STATUS_VARIANT_0001_TO_NT01.png",
  "CASE_002_07_FS00_CREATE_GL_ACCOUNT_210000_RECONCILIATION_ACCOUNT.png",
  "CASE_002_08_FS00_ASSIGN_FIELD_STATUS_GROUP_G001_TO_GL_ACCOUNT_210000.png",
  "CASE_002_09_FS00_VERIFY_GL_ACCOUNT_210000_CREATED.png",
  "CASE_002_11_XK01_ENTER_COMPANY_CODE_PAYMENT_TERMS.png",
  "CASE_002_12_XK01_ENTER_PURCHASING_ORGANIZATION_DATA.png",
  "CASE_002_13_XK01_VENDOR_CREATION_SUCCESS.png",
  "CASE_002_14_SE16N_VERIFY_VENDOR_MASTER_LFA1.png",
  "CASE_002_15_SE16N_VERIFY_VENDOR_COMPANY_CODE_LFB1.png",
  "CASE_002_16_SE16N_VERIFY_VENDOR_PURCHASING_ORGANIZATION_LFM1.png",
].map((filename, index) => ({
  step: index + 1,
  filename,
  src: `/images/case-002/${filename}`,
  title: filename
    .replace(/^CASE_002_\d+_/, "")
    .replace(/\.(png|jpg|jpeg)$/i, "")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase()),
  group: index < 9 ? "FI prerequisite setup" : "Vendor creation and validation",
  transaction: filename.split("_")[3] ?? "SAP",
  whatItProves:
    index < 9
      ? "Documents a prerequisite FI configuration step required before vendor master creation could be completed."
      : "Documents BioLab vendor master creation or validation at general, company code, or purchasing organization level.",
  alt: `P2P-002 evidence screenshot ${index + 1}: ${filename}`,
}));

export const cases: PortfolioCase[] = [
  {
    id: "p2p-001",
    slug: "p2p-001-enterprise-foundation",
    title: "P2P-001 Enterprise Foundation",
    process: "P2P",
    module: "SAP FI/MM",
    status: "complete",
    statusLabel: "Complete",
    statusTone: "success",
    implementationResult: "Foundation complete",
    businessObjective:
      "Create the SAP ECC sandbox enterprise-structure baseline used by later P2P cases.",
    shortObjective: "NovaTech company-code and purchasing foundation for future P2P work.",
    companyCode: "NT01 - Nova Tech Industries GmbH",
    transactions: ["OX08"],
    tables: [],
    configurationObjects: ["Purchasing organization NT01", "Company code NT01"],
    prerequisites: ["SAP ECC sandbox access", "Fictional NovaTech business scenario"],
    architecture: [
      "P2P-001 creates the enterprise foundation used by downstream vendor master, invoice, and payment cases.",
      "The purchasing organization is MM-owned but becomes FI-relevant through vendor master and P2P integration.",
    ],
    configuration: [
      "Created purchasing organization NT01.",
      "Assigned purchasing organization NT01 to company code NT01.",
    ],
    timeline: [
      {
        stage: "Foundation",
        title: "Create purchasing organization",
        description: "Created NT01 as the NovaTech Germany purchasing organization.",
      },
      {
        stage: "Assignment",
        title: "Connect to company code",
        description: "Assigned NT01 purchasing organization to company code NT01.",
      },
    ],
    accountingEntry: [],
    productionIssues: [],
    evidence: [],
    validation: [
      {
        label: "Enterprise structure evidence",
        status: "complete",
        detail: "Purchasing organization and assignment screenshots are documented in the Life OS case.",
      },
    ],
    lessons: [
      "A purchasing organization is primarily MM, but it becomes FI-relevant through the P2P process.",
    ],
    interviewTalkingPoint:
      "I built a clean NovaTech enterprise-structure baseline so later FI/MM cases have a traceable sandbox dependency chain.",
    relatedCases: [
      { id: "p2p-002", label: "P2P-002 Vendor Master", available: true },
      { id: "p2p-003", label: "P2P-003 Vendor Invoice", available: true },
    ],
    routeEnabled: true,
  },
  {
    id: "p2p-002",
    slug: "p2p-002-vendor-master",
    title: "P2P-002 Vendor Master",
    process: "P2P",
    module: "SAP FI/MM",
    status: "complete",
    statusLabel: "Complete",
    statusTone: "success",
    implementationResult: "Vendor master created and validated",
    businessObjective:
      "Create BioLab Chemicals GmbH as a vendor for company code NT01 and purchasing organization NT01.",
    shortObjective: "Create and validate a FI/MM vendor master for BioLab Chemicals GmbH.",
    companyCode: "NT01 - Nova Tech Industries GmbH",
    vendor: "100000 - BioLab Chemicals GmbH",
    transactions: ["XK01", "OB13", "OBY6", "OBD4", "OB53", "FS00", "SE16N"],
    tables: ["LFA1", "LFB1", "LFM1"],
    configurationObjects: [
      "Chart of accounts NTCA",
      "G/L account groups",
      "Retained earnings setup",
      "Field status variant 0001",
      "Vendor reconciliation account 210000",
    ],
    prerequisites: ["P2P-001 enterprise foundation"],
    architecture: [
      "The vendor master bridges FI company-code data and MM purchasing-organization data.",
      "The reconciliation account connects the AP subledger to the general ledger.",
    ],
    configuration: [
      "Created chart of accounts NTCA and assigned it to NT01.",
      "Created G/L account groups and retained earnings setup.",
      "Created reconciliation account 210000.",
      "Created BioLab Chemicals GmbH in XK01 and validated LFA1/LFB1/LFM1.",
    ],
    timeline: [
      {
        stage: "Requirement",
        title: "Create supplier master",
        description: "Create a vendor usable by Finance and Purchasing.",
      },
      {
        stage: "Prerequisites",
        title: "Resolve FI gaps",
        description: "Complete chart of accounts, retained earnings, field status, and reconciliation account prerequisites.",
      },
      {
        stage: "Master data",
        title: "Create BioLab vendor",
        description: "Maintain general, company-code, and purchasing-organization data in XK01.",
      },
      {
        stage: "Validation",
        title: "Validate vendor tables",
        description: "Confirm the vendor in LFA1, LFB1, and LFM1.",
      },
    ],
    accountingEntry: [],
    productionIssues: [],
    evidence: p2p002Evidence,
    validation: [
      { label: "LFA1", status: "complete", detail: "Vendor general data exists." },
      { label: "LFB1", status: "complete", detail: "Vendor company-code data exists for NT01." },
      { label: "LFM1", status: "complete", detail: "Vendor purchasing-organization data exists for NT01." },
    ],
    lessons: [
      "Vendor master creation depends on complete FI company-code setup.",
      "A missing reconciliation account can reveal deeper setup gaps.",
      "A vendor used in both FI and MM must be extended to both company code and purchasing organization views.",
    ],
    interviewTalkingPoint:
      "I created a vendor master from scratch in SAP ECC and resolved all prerequisite FI configuration gaps before saving the vendor, then validated it in LFA1, LFB1, and LFM1.",
    relatedCases: [
      { id: "p2p-001", label: "P2P-001 Enterprise Foundation", available: true },
      { id: "p2p-003", label: "P2P-003 Vendor Invoice", available: true },
      { id: "p2p-004", label: "P2P-004 Automatic Payment Configuration", available: false },
    ],
    routeEnabled: true,
  },
  {
    id: "p2p-003",
    slug: "p2p-003-vendor-invoice",
    title: "P2P-003 Vendor Invoice",
    process: "P2P",
    module: "SAP FI",
    status: "complete",
    statusLabel: "Complete - posted and technically validated",
    statusTone: "success",
    implementationResult: "Complete - posted and technically validated",
    businessObjective:
      "Post a direct FI vendor invoice for BioLab Chemicals GmbH, proving AP invoice accounting, tax calculation, document numbering, tolerance control, and document-splitting troubleshooting.",
    shortObjective: "Post a direct FI vendor invoice with 19% German input VAT and documented troubleshooting.",
    companyCode: "NT01 - Nova Tech Industries GmbH",
    vendor: "100000 - BioLab Chemicals GmbH",
    documentNumber: "1700000000",
    fiscalYear: "2026",
    documentType: "KR - Vendor Invoice",
    reference: "BIOLAB-2026-001",
    currency: "EUR",
    postingDate: "12.07.2026",
    taxCode: "V5 - 19% domestic input tax, Germany",
    transactions: ["OBBO", "OBBP", "OB52", "FS00", "FTXP", "OBYZ", "OBQ1", "OB40", "OBA7", "FBN1", "FB60", "OBA4", "FB03", "FBL1N", "SE16N"],
    tables: ["BKPF", "BSEG", "BSIK"],
    configurationObjects: [
      "Posting period variant NT01",
      "Expense G/L 610000",
      "Input VAT G/L 157000",
      "Tax procedure TAXD",
      "MWVS input-tax condition",
      "VST account key",
      "Document type KR",
      "Number range 15",
      "Default employee tolerance group",
      "Document splitting item category 20000",
    ],
    prerequisites: [
      "Company code NT01 exists.",
      "Vendor 100000 exists in NT01.",
      "Reconciliation account 210000 exists.",
      "Payment terms N030 exist on the vendor.",
      "Period 07/2026 is open for posting.",
      "Tax code V5 has a valid 19% condition record.",
    ],
    architecture: [
      "This is a direct FI/AP invoice entered with FB60, not a PO/GR/MIRO invoice verification scenario.",
      "The object chain is NT01 company code -> vendor 100000 -> expense account 610000 -> tax code V5/MWVS/VST -> input VAT account 157000 -> document type KR -> document 1700000000.",
      "The vendor was created with purchasing-organization data, but this case does not claim FI-MM three-way match evidence.",
    ],
    configuration: [
      "Created posting-period variant NT01, assigned it to company code NT01, and opened period 07/2026.",
      "Created expense account 610000 and input VAT account 157000.",
      "Verified TAXD, MWVS, VST, and OB40 as separate tax configuration layers.",
      "Used V5 as the final 19% German input-tax code; V1 was only an abandoned initial attempt.",
      "Verified KR document type and created number range interval 1700000000-1799999999 for NT01/2026.",
      "Created the blank/default OBA4 employee tolerance group for NT01.",
      "Classified only G/L account 610000 as document-splitting item category 20000 Expense.",
    ],
    timeline: [
      {
        stage: "Prerequisites",
        title: "Prepare posting period",
        description: "Create NT01 posting-period variant, assign it to company code NT01, and open period 07/2026.",
        evidenceSteps: [1, 2, 3],
      },
      {
        stage: "Accounts",
        title: "Create G/L accounts",
        description: "Create expense account 610000 and prepare input VAT account 157000.",
        evidenceSteps: [4, 5, 11],
      },
      {
        stage: "Tax",
        title: "Verify German input VAT",
        description: "Abandon V1, verify TAXD/MWVS/VST layers, and confirm V5 has a valid 19% condition record.",
        evidenceSteps: [6, 7, 8, 9, 10, 12],
      },
      {
        stage: "Controls",
        title: "Prepare document controls",
        description: "Verify KR, create number range 15, and maintain the default OBA4 tolerance group.",
        evidenceSteps: [13, 14, 16],
      },
      {
        stage: "Execution",
        title: "Enter and simulate FB60",
        description: "Enter the BioLab invoice, calculate input VAT, resolve F5155 and zero-balance issues, then simulate the document.",
        evidenceSteps: [15, 17, 18],
      },
      {
        stage: "Posting",
        title: "Resolve GLT2076 and post",
        description: "Classify account 610000 for document splitting and post document 1700000000, then display it in FB03.",
        evidenceSteps: [19, 20, 21],
      },
      {
        stage: "Validation",
        title: "Validate document technically",
        description: "Confirm the open vendor item in FBL1N and validate BKPF, BSEG, and BSIK through SE16N.",
        evidenceSteps: [22, 23, 24, 25],
      },
    ],
    accountingEntry: [
      {
        type: "Dr",
        account: "610000",
        label: "Laboratory Supplies Expense",
        amount: 1000,
        amountDisplay: "1,000.00 EUR",
        impact: "Expense increases.",
      },
      {
        type: "Dr",
        account: "157000",
        label: "Input VAT Recoverable",
        amount: 190,
        amountDisplay: "190.00 EUR",
        impact: "Recoverable VAT asset increases.",
      },
      {
        type: "Cr",
        account: "Vendor 100000",
        label: "BioLab Chemicals GmbH",
        amount: 1190,
        amountDisplay: "1,190.00 EUR",
        impact: "Vendor liability increases; payment has not occurred.",
      },
    ],
    accountingSummary: "Total debits and credits both equal 1,190.00 EUR. Balance: 0.00 EUR.",
    productionIssues: [
      {
        id: "f5155",
        title: "No amount authorization for customers/vendors in company code NT01",
        message: "F5155",
        symptom: "FB60 stopped after the vendor invoice amount was entered.",
        businessImpact: "The invoice could not proceed in the new company code.",
        rootCause: "No default employee tolerance group and posting limits existed for NT01.",
        investigation: [
          "Checked the FB60 error context.",
          "Confirmed the user relied on the blank/default employee tolerance group.",
          "Reviewed OBA4 as the relevant tolerance configuration.",
        ],
        resolution: "Created the blank/default employee tolerance group for NT01 in OBA4 and maintained posting limits.",
        lesson: "A newly created company code requires employee tolerance configuration before customer or vendor postings can be processed.",
        relatedEvidenceSteps: [15, 16],
      },
      {
        id: "zero-balance",
        title: "Posting is only possible with a zero balance",
        symptom: "The document remained out of balance by exactly 190 EUR.",
        businessImpact: "The invoice could not be simulated or posted until the tax-inclusive distribution was corrected.",
        rootCause: "The FB60 line-item amount and tax calculation did not initially represent the full gross distribution required by this entry layout.",
        investigation: [
          "Compared the 1,190 EUR gross header amount with the 1,000 EUR expense line.",
          "Identified that the 190 EUR difference matched the expected 19% input VAT.",
          "Confirmed OB40/VST was already assigned to account 157000, so this was not an OB40 defect.",
        ],
        resolution: "Corrected the entered distribution amount and tax handling, then simulated the document until the balance reached zero.",
        lesson: "A difference equal to the expected VAT amount is a strong indicator that tax has not been included correctly in the document distribution.",
        relatedEvidenceSteps: [17, 18],
      },
      {
        id: "glt2076",
        title: "No item category assigned to account 610000/NTCA",
        message: "GLT2076",
        symptom: "The document balanced and simulated, but posting failed.",
        businessImpact: "The payable could not be posted despite correct accounting and tax calculation.",
        rootCause: "Online document splitting was active, and the new expense account 610000 had no document-splitting item category.",
        investigation: [
          "Confirmed the account named in the error: 610000/NTCA.",
          "Checked document-splitting classification requirements.",
          "Avoided a broad account-range fix that could hide chart-of-accounts design problems.",
        ],
        resolution: "Classified account 610000 under item category 20000 - Expense.",
        lesson: "When document splitting is active, newly created G/L accounts must be classified before postings can succeed.",
        relatedEvidenceSteps: [19, 20, 21],
      },
    ],
    evidence: p2p003Evidence,
    validation: [
      {
        group: "Functional validation",
        label: "Invoice posted successfully in FB60",
        status: "complete",
        detail: "The KR vendor invoice for BioLab Chemicals GmbH posted as accounting document 1700000000 in company code NT01.",
      },
      {
        group: "Functional validation",
        label: "Document displayed successfully in FB03",
        status: "complete",
        detail: "Document 1700000000 is displayed for company code NT01 and fiscal year 2026.",
      },
      {
        group: "Functional validation",
        label: "Accounting document balanced to zero",
        status: "complete",
        detail: "The posted entry balances debit 610000 for 1,000.00 EUR and debit 157000 for 190.00 EUR against the vendor credit for 1,190.00 EUR.",
      },
      {
        group: "Functional validation",
        label: "Input VAT calculated at 19%",
        status: "complete",
        detail: "Tax code V5 calculated 190.00 EUR input VAT on the 1,000.00 EUR expense base.",
      },
      {
        group: "Functional validation",
        label: "Vendor liability created for 1,190.00 EUR",
        status: "complete",
        detail: "The vendor line records the open payable for vendor 100000, BioLab Chemicals GmbH.",
      },
      {
        group: "Technical validation",
        label: "FBL1N confirms the vendor open item",
        status: "complete",
        detail: "FBL1N confirms that vendor 100000 has document 1700000000 open for 1,190.00 EUR.",
      },
      {
        group: "Technical validation",
        label: "BKPF confirms the FI document header",
        status: "complete",
        detail: "BKPF confirms document 1700000000 for company code NT01 and fiscal year 2026.",
      },
      {
        group: "Technical validation",
        label: "BSEG confirms the accounting line items",
        status: "complete",
        detail: "BSEG confirms the vendor credit, expense debit, and input VAT debit lines for document 1700000000.",
      },
      {
        group: "Technical validation",
        label: "BSIK confirms the open vendor-item record",
        status: "complete",
        detail: "BSIK confirms the invoice is technically stored as an open vendor item.",
      },
      {
        group: "Final conclusion",
        label: "P2P-003 completion conclusion",
        status: "complete",
        detail: "P2P-003 is complete. The vendor invoice was configured, posted, displayed, and validated at both application and database-table level. The liability remains open and will be used in the future automatic payment cases.",
      },
    ],
    lessons: [
      "A clean company code exposes dependencies that mature systems often hide.",
      "A tax-code description does not prove that a tax rate exists; verify the condition record.",
      "OBYZ, FTXP, OB40, and FB60 each prove different parts of tax behavior.",
      "A blank OBA4 group is a valid default for users without explicit group assignment.",
      "Active document splitting can block a balanced FI document until the relevant G/L is classified.",
      "This case proves a direct FI invoice, not a full PO-based P2P cycle.",
    ],
    interviewTalkingPoint:
      "I built a direct vendor-invoice process for a new ECC company code. I configured posting periods, expense and input-VAT accounts, German input tax, automatic VST account determination, KR number ranges, posting tolerances, and document-splitting classification. During FB60 testing I resolved F5155, a 190 EUR zero-balance issue, and GLT2076. The final KR document posted as a 1,000 EUR expense, 190 EUR recoverable VAT, and 1,190 EUR vendor liability.",
    relatedCases: [
      { id: "p2p-001", label: "P2P-001 Enterprise Foundation", available: true },
      { id: "p2p-002", label: "P2P-002 Vendor Master", available: true },
      { id: "p2p-004", label: "P2P-004 Automatic Payment Configuration", available: false },
      { id: "p2p-005", label: "P2P-005 Automatic Payment Run", available: false },
    ],
    routeEnabled: true,
  },
];

export const processRoadmap: ProcessRoadmapItem[] = [
  {
    id: "p2p-001",
    label: "P2P-001 Enterprise Foundation",
    statusLabel: "Complete",
    status: "complete",
    slug: "p2p-001-enterprise-foundation",
    routeEnabled: true,
  },
  {
    id: "p2p-002",
    label: "P2P-002 Vendor Master",
    statusLabel: "Complete",
    status: "complete",
    slug: "p2p-002-vendor-master",
    routeEnabled: true,
  },
  {
    id: "p2p-003",
    label: "P2P-003 Vendor Invoice",
    statusLabel: "Complete",
    status: "complete",
    slug: "p2p-003-vendor-invoice",
    routeEnabled: true,
  },
  {
    id: "p2p-004",
    label: "P2P-004 Automatic Payment Configuration",
    statusLabel: "Planned",
    status: "planned",
    routeEnabled: false,
  },
  {
    id: "p2p-005",
    label: "P2P-005 Automatic Payment Run",
    statusLabel: "Planned",
    status: "planned",
    routeEnabled: false,
  },
];

export const caseBySlug = new Map(cases.map((item) => [item.slug, item]));

export const availableCases = cases.filter((item) => item.routeEnabled);

export const implementedCases = cases.filter((item) => item.status !== "planned");

export const allEvidenceItems = cases.flatMap((item) => item.evidence);
