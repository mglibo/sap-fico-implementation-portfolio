# SAP FICO Implementation Portfolio — Test Plan

## What was built
A static portfolio website showcasing a complete SAP S/4HANA FICO implementation project for a fictional company (NovaTech Industries GmbH). The site has 8 navigable sections, interactive tabs, collapsible accordions, scroll animations, and responsive navigation.

**Deployed at:** https://sap-fico-implementation-portfo-njlryzzo.devinapps.com

## Test Scope
Test the primary end-to-end flow: page load → navigation → interactive components (tabs, accordions) → content verification across all major sections.

---

## Test 1: Page Load & Hero Content
**Steps:** Navigate to the deployed URL.
**Assertions:**
- Page title in browser tab should be "SAP S/4HANA FICO Implementation | NovaTech Industries"
- Hero section displays heading "End-to-End SAP FICO Implementation"
- Four stat numbers visible: "12" (Month Timeline), "3" (Company Codes), "2" (SAP Modules), "6" (Business Processes)
- Two CTA buttons visible: "View Project Details" and "About the Consultant"

## Test 2: Navigation Links Scroll to Sections
**Steps:** Click "Company" nav link in the top navbar.
**Assertions:**
- Page scrolls to the Company section
- Section heading "Company Scenario" is visible
- Company name "NovaTech Industries GmbH" with tagline "Precision Electronics Manufacturing" is visible
- The "Company" nav link should have the `active` class (visually highlighted)

## Test 3: Tab Switching (Enterprise Structure)
**Steps:** 
1. Click "Enterprise Structure" nav link
2. Verify default tab "Organizational Units" is active and shows table with "Client / 100 / NovaTech Industries Group" row
3. Click "FI Structure" tab button
4. Click "CO Structure" tab button
**Assertions:**
- Default tab: "Organizational Units" tab button is active, table shows row with "Client" / "100" / "NovaTech Industries Group"
- After clicking "FI Structure": table shows "Chart of Accounts" / "NTCA" / "NovaTech Operative CoA"
- The "Organizational Units" table should NOT be visible (hidden)
- After clicking "CO Structure": table shows "Controlling Area" / "NT01" / "NovaTech Controlling Area"
- The "FI Structure" table should NOT be visible

## Test 4: Accordion Toggle (Business Processes)
**Steps:**
1. Click "Business Processes" nav link
2. Verify P2P accordion is open by default (shows "Purchase Requisition" with T-Code ME51N)
3. Click "Order-to-Cash (O2C)" accordion header
4. Click "Record-to-Report (R2R)" accordion header
**Assertions:**
- P2P is open by default: content visible showing flow steps with "Purchase Requisition" and "T-Code: ME51N"
- After clicking O2C: P2P closes (content hidden), O2C opens showing "Sales Order" and "T-Code: VA01"
- After clicking R2R: O2C closes, R2R opens showing "Period-End Closing Checklist" and "T-Code: AFAB"

## Test 5: About Section & Footer Content
**Steps:** Click "About" nav link.
**Assertions:**
- Avatar shows initials "MG"
- Name displayed: "Mateo Glibo"
- Title displayed: "SAP FICO Consultant"
- Skill tags visible including "FI — Financial Accounting" and "CO — Controlling"
- Footer shows "This is a fictional demonstration project created for portfolio purposes."

## Test 6: Navbar Scroll Effect
**Steps:** While on the About section (scrolled down), observe the navbar.
**Assertions:**
- Navbar should have `scrolled` class (adds box-shadow), visible as slight shadow under nav bar
- Scroll back to top: navbar shadow should disappear
