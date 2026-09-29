import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def create_document():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)

    # Styles & Colors
    # DDD Signature Colors
    COLOR_BLUE = RGBColor(0, 163, 224)       # #00A3E0
    COLOR_CHARCOAL = RGBColor(35, 39, 51)    # #232733
    COLOR_MUTED = RGBColor(100, 116, 139)    # #64748B
    COLOR_DARK = RGBColor(15, 23, 42)        # #0F172A

    # Set base font
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Calibri'
    style_normal.font.size = Pt(11)
    style_normal.font.color.rgb = COLOR_CHARCOAL

    # Document Header / Logo
    logo_path = "/Users/macbook/Documents/new/public/assets/ddd_logo.png"
    if os.path.exists(logo_path):
        header_p = doc.add_paragraph()
        header_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run_logo = header_p.add_run()
        run_logo.add_picture(logo_path, width=Inches(2.2))

    # Title
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title_p.add_run("DDD FlowHub")
    title_run.font.size = Pt(26)
    title_run.font.bold = True
    title_run.font.color.rgb = COLOR_BLUE

    # Subtitle
    sub_p = doc.add_paragraph()
    sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub_run = sub_p.add_run("Technical Stack, Languages, Tools & Architecture Documentation")
    sub_run.font.size = Pt(13)
    sub_run.font.bold = True
    sub_run.font.color.rgb = COLOR_CHARCOAL

    # Meta
    meta_p = doc.add_paragraph()
    meta_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    meta_run = meta_p.add_run("Organization: Digital Divide Data (DDD)  |  Version: 2.4  |  Car Vision Program")
    meta_run.font.size = Pt(9.5)
    meta_run.font.color.rgb = COLOR_MUTED

    # Quote Callout Box
    quote_table = doc.add_table(rows=1, cols=1)
    quote_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    q_cell = quote_table.rows[0].cells[0]
    set_cell_background(q_cell, "F0F9FF")
    set_cell_margins(q_cell, top=140, bottom=140, left=200, right=200)
    qp = q_cell.paragraphs[0]
    qp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    q_run = qp.add_run('“We did not replace Google Chat & Sheets. We fixed the gaps between them.”\nTagline: Right info, right person, right time.')
    q_run.font.italic = True
    q_run.font.size = Pt(10.5)
    q_run.font.bold = True
    q_run.font.color.rgb = RGBColor(2, 132, 199)

    doc.add_paragraph() # Spacer

    # Section 1: Executive Overview
    h1 = doc.add_heading(level=1)
    h1_run = h1.add_run("1. Project Overview & Operational Context")
    h1_run.font.color.rgb = COLOR_BLUE
    h1_run.font.bold = True

    p = doc.add_paragraph()
    p.add_run(
        "DDD FlowHub is a dedicated enterprise web application designed for Digital Divide Data (DDD) "
        "operations staff. Operating across three 8-hour daily shifts (Shift 1, Shift 2, and Night Shift), "
        "DDD delivers mission-critical autonomous vehicle car labeling annotations. FlowHub sits directly on top "
        "of existing tools (Google Chat and Google Sheets) and provides real-time role-based workspaces for Associates, "
        "Seniors, Team Leaders (TLs), and Project Managers (PMs)."
    )

    # Section 2: Code Languages Breakdown
    h2 = doc.add_heading(level=1)
    h2_run = h2.add_run("2. Programming & Code Languages")
    h2_run.font.color.rgb = COLOR_BLUE
    h2_run.font.bold = True

    table_lang = doc.add_table(rows=1, cols=3)
    table_lang.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = table_lang.rows[0].cells
    hdr_cells[0].text = "Language"
    hdr_cells[1].text = "Implementation Scope"
    hdr_cells[2].text = "Key Roles in DDD FlowHub"

    for i, cell in enumerate(hdr_cells):
        set_cell_background(cell, "00A3E0")
        set_cell_margins(cell, top=140, bottom=140, left=160, right=160)
        p = cell.paragraphs[0]
        p.runs[0].font.bold = True
        p.runs[0].font.color.rgb = RGBColor(255, 255, 255)

    lang_data = [
        ("JavaScript (ES6+)", "Core logic, state, Web APIs", "Powers reactive state management, synthesizes audio frequencies via the Web Audio API, handles localStorage caching, simulates Google Chat webhooks, and orchestrates live turnover transitions."),
        ("JSX (JavaScript XML)", "Component rendering (React)", "Declarative component templates used across all 4 role screens (Associate, Senior, TL, PM), modals, drawers, and the interactive 9-slide pitch deck."),
        ("HTML5", "index.html & Semantic structure", "Semantic tags including <header>, <aside>, <main>, <nav>, <table>, and <form> ensuring high accessibility and search engine / accessibility standards."),
        ("Vanilla CSS3", "src/index.css design system", "Custom modern enterprise design system based on DDD logo colors (#00A3E0 Arc Blue & #232733 Charcoal Slate). Uses CSS variables, Flexbox, CSS Grid, and custom scrollbars with zero neon glow effects.")
    ]

    for row_idx, (lang, scope, role_desc) in enumerate(lang_data):
        row = table_lang.add_row()
        cells = row.cells
        cells[0].text = lang
        cells[1].text = scope
        cells[2].text = role_desc
        fill = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for c in cells:
            set_cell_background(c, fill)
            set_cell_margins(c, top=120, bottom=120, left=150, right=150)
            c.paragraphs[0].runs[0].font.size = Pt(9.5)
        cells[0].paragraphs[0].runs[0].font.bold = True

    doc.add_paragraph()

    # Section 3: Frameworks & Libraries
    h3 = doc.add_heading(level=1)
    h3_run = h3.add_run("3. Frameworks, Libraries & Dependencies")
    h3_run.font.color.rgb = COLOR_BLUE
    h3_run.font.bold = True

    table_pkgs = doc.add_table(rows=1, cols=4)
    table_pkgs.alignment = WD_TABLE_ALIGNMENT.CENTER
    pkg_hdrs = table_pkgs.rows[0].cells
    pkg_hdrs[0].text = "Package / Library"
    pkg_hdrs[1].text = "Version"
    pkg_hdrs[2].text = "Type"
    pkg_hdrs[3].text = "Technical Purpose & Implementation"

    for cell in pkg_hdrs:
        set_cell_background(cell, "232733")
        set_cell_margins(cell, top=140, bottom=140, left=150, right=150)
        p = cell.paragraphs[0]
        p.runs[0].font.bold = True
        p.runs[0].font.color.rgb = RGBColor(255, 255, 255)

    pkg_data = [
        ("react", "^19.2.8", "Runtime", "Core declarative UI framework providing reactive hooks: useState, useEffect, and createContext for application-wide state synchronization."),
        ("react-dom", "^19.2.8", "Runtime", "Direct DOM reconciliation and rendering of the React application tree into index.html (#root)."),
        ("vite", "^8.3.0", "Dev / Build", "High-performance frontend tool providing Hot Module Replacement (HMR) during development and optimized Rolldown production bundling."),
        ("@vitejs/plugin-react", "^6.1.1", "Dev Tool", "Babel/Fast-Refresh integration for seamless real-time React component reloading without full page refreshes."),
        ("lucide-react", "^1.48.0", "Runtime", "Tree-shakable modern SVG icon system used for all role navigation, status indicators, audio icons, and modal controls."),
        ("canvas-confetti", "^1.9.4", "Runtime", "Micro-interaction utility triggering visual acknowledgment bursts when associates confirm emergency alerts."),
        ("oxlint", "^1.81.0", "Dev Tool", "High-speed Rust-based JavaScript and JSX linter for code health, syntax verification, and static analysis.")
    ]

    for row_idx, (pkg, ver, p_type, desc) in enumerate(pkg_data):
        row = table_pkgs.add_row()
        cells = row.cells
        cells[0].text = pkg
        cells[1].text = ver
        cells[2].text = p_type
        cells[3].text = desc
        fill = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for c in cells:
            set_cell_background(c, fill)
            set_cell_margins(c, top=120, bottom=120, left=140, right=140)
            c.paragraphs[0].runs[0].font.size = Pt(9.5)
        cells[0].paragraphs[0].runs[0].font.bold = True

    doc.add_paragraph()

    # Section 4: Native Browser APIs
    h4 = doc.add_heading(level=1)
    h4_run = h4.add_run("4. Native Browser Web APIs (Zero-Dependency Utilities)")
    h4_run.font.color.rgb = COLOR_BLUE
    h4_run.font.bold = True

    p = doc.add_paragraph()
    p.add_run(
        "To ensure high reliability on company workstations with strict IT security policies, "
        "DDD FlowHub avoids heavy external third-party services for audio and local storage. "
        "The following native browser APIs are utilized:"
    )

    apis = [
        ("Web Audio API (AudioContext, OscillatorNode, GainNode): ", "Located in src/utils/audio.js. Synthesizes high-priority dual-tone emergency alert sirens (880 Hz to 1046.5 Hz) and harmonious confirmation chimes purely from mathematical waveform frequencies. No external audio MP3 or WAV files are downloaded over the network."),
        ("Web Storage API (localStorage): ", "Maintains persistent client-side state across browser reloads. Persists current active role, client queue count, fallback protocols, active alert acknowledgments, and auto-archived tasks."),
        ("Clipboard API (navigator.clipboard): ", "Powers the instant 1-click 'Copy Steps' feature on the Known-Issues troubleshooting board so seniors and associates can paste PC fixes directly into system prompts.")
    ]

    for title, desc in apis:
        bp = doc.add_paragraph(style='List Bullet')
        r_t = bp.add_run(title)
        r_t.bold = True
        r_t.font.color.rgb = COLOR_CHARCOAL
        r_d = bp.add_run(desc)
        r_d.font.color.rgb = COLOR_MUTED

    doc.add_paragraph()

    # Section 5: Solutions & Problem Matrix
    h5 = doc.add_heading(level=1)
    h5_run = h5.add_run("5. DDD Operational Problems & Technical Solutions")
    h5_run.font.color.rgb = COLOR_BLUE
    h5_run.font.bold = True

    table_prob = doc.add_table(rows=1, cols=3)
    table_prob.alignment = WD_TABLE_ALIGNMENT.CENTER
    pr_hdrs = table_prob.rows[0].cells
    pr_hdrs[0].text = "Operational Problem"
    pr_hdrs[1].text = "Impacted Roles"
    pr_hdrs[2].text = "DDD FlowHub Technical Solution"

    for cell in pr_hdrs:
        set_cell_background(cell, "00A3E0")
        set_cell_margins(cell, top=140, bottom=140, left=150, right=150)
        p = cell.paragraphs[0]
        p.runs[0].font.bold = True
        p.runs[0].font.color.rgb = RGBColor(255, 255, 255)

    prob_data = [
        ("1. Missed Important Messages (Google Chat muted, seniors shouting)", "Associates, Seniors, TLs", "Unmissable Full-Screen Alerts with synthesized audible siren and mandatory 'I have seen this' button. Live acknowledgment tracker shows who has and has not confirmed."),
        ("2. Empty Task Queue ('What do I do now?')", "Associates, TLs", "'What Do I Do Now' Dashboard dynamically activates fallback protocols configured in advance by Team Leaders (e.g. secondary QA reviews, refresher training)."),
        ("3. Scattered Schedules & Shift Info", "Associates", "'My Schedule & Shift Hub' tab centralizes meetings, daily handover syncs, and break times filtered by shift (Shift 1, 2, Night)."),
        ("4. Repeated Car Labeling Questions", "Associates, TLs, PMs", "Official Rulings Board where Project Managers publish client decisions once as searchable cards with tags, DO/DON'T rules, and high-res vehicle imagery."),
        ("5. Repeated PC & Tool Freezes (Chrome RAM, WebGL crash)", "Associates, Seniors", "Known-Issues Troubleshooting Catalog with numbered, copyable steps and community upvotes so seniors do not repeat themselves."),
        ("6. Manual Task Link Generation & Turnover", "Team Leaders", "Auto-Turnover Generator provisions batch task links automatically, appends them to Google Sheets, and sends webhook alerts to Google Chat."),
        ("7. Manual Deletion of Submitted Tasks (Lost history)", "Team Leaders", "Auto-Archive Engine automatically migrates completed tasks to a separate 'Submitted Archive' tab, preserving 100% audit history."),
        ("8. Information Spread Across Tools", "All DDD Staff", "One Unified Portal sitting directly on top of Google Workspace. Google Sheets remains the database, ensuring zero disruption to muscle memory.")
    ]

    for row_idx, (p_text, who, sol) in enumerate(prob_data):
        row = table_prob.add_row()
        cells = row.cells
        cells[0].text = p_text
        cells[1].text = who
        cells[2].text = sol
        fill = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for c in cells:
            set_cell_background(c, fill)
            set_cell_margins(c, top=120, bottom=120, left=140, right=140)
            c.paragraphs[0].runs[0].font.size = Pt(9.5)
        cells[0].paragraphs[0].runs[0].font.bold = True

    doc.add_paragraph()

    # Section 6: UI Architecture
    h6 = doc.add_heading(level=1)
    h6_run = h6.add_run("6. UI Architecture & Left Navigation Tab")
    h6_run.font.color.rgb = COLOR_BLUE
    h6_run.font.bold = True

    p = doc.add_paragraph()
    p.add_run(
        "To prevent cramped cards, awkward text indentations, and crowded navigation bars, DDD FlowHub implements "
        "a collapsible left navigation tab (Sidebar.jsx). Key design principles include:\n\n"
        "• Collapsible Left Navigation Drawer: Can be expanded for full navigation and role switching, or collapsed into an unobtrusive tab on the left edge.\n"
        "• Dynamic Fluid Expansion: When the sidebar is collapsed, the main workspace dynamically expands to 100% width, providing ample room for multi-column vehicle cards and tables.\n"
        "• Exact Logo Brand Palette: Strict adherence to the official Digital Divide Data palette (#00A3E0 Arc Blue, #232733 Charcoal Slate, and crisp #253047 1px structural borders).\n"
        "• Modern Flat Aesthetics: Total elimination of neon halos, blur drops, and glow effects, delivering a clean, corporate-grade enterprise appearance."
    )

    # Section 7: Running Instructions
    h7 = doc.add_heading(level=1)
    h7_run = h7.add_run("7. Local Execution & Commands")
    h7_run.font.color.rgb = COLOR_BLUE
    h7_run.font.bold = True

    p_run = doc.add_paragraph()
    p_run.add_run(
        "To run DDD FlowHub locally on macOS:\n\n"
        "1. Open Terminal and navigate to the project directory:\n"
        "   cd /Users/macbook/Documents/new\n\n"
        "2. Start the local Vite development server:\n"
        "   npm run dev\n\n"
        "3. Open the browser to:\n"
        "   http://localhost:5173/\n\n"
        "4. To generate a production-ready optimized build:\n"
        "   npm run build\n\n"
        "5. To preview the production bundle:\n"
        "   npm run preview"
    )
    p_run.runs[0].font.name = 'Consolas'
    p_run.runs[0].font.size = Pt(10)

    # Save file
    output_path = "/Users/macbook/Documents/new/DDD_FlowHub_Technical_Documentation.docx"
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    create_document()
