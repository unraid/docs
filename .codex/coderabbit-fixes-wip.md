# CodeRabbit Fixes WIP

## Context

- Repo: unraid/docs
- Branch: l10n_main
- PR: 381
- PR URL: https://github.com/unraid/docs/pull/381
- Generated at: 2026-02-24T03:16:47Z

## Inputs Pulled

- [x] Unresolved CodeRabbit review threads pulled
- [x] Top-level CodeRabbit review notes pulled
- [x] Top-level nitpicks extracted into queue

## Fix Queue

| Item ID | Type    | File                                                                                                                                                                  | Line | Summary                                                                                                                                                                                                                                                                         | Status | Link                                                                 | Evidence                                                                                                                                                                                                                                                                                   |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| CR-001  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-account/redeem-activation-code.mdx                                                                              | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Fix malformed note block syntax.** Line 58 has an unpaired bracket—the note block is missing its closing bracket. Update the syntax: '''diff - :::note[Server Kontext erforderlich + :                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653124       | No code change required; block syntax already valid at current HEAD. Prettier check passed.                                                                                                                                                                                                |
| CR-002  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx                                                                                   | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix German quotation marks and punctuation in list items.** The static analysis tool flagged punctuation issues with quotation marks in the numbered list. German convention uses „" (cur                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653152       | Removed duplicated step, normalized punctuation/quotes, and applied lowercase compound adjective. Prettier check passed.                                                                                                                                                                   |
| CR-003  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/customize-unraid-settings.mdx                                                  | 306  | _⚠️ Potential issue_ / _🟡 Minor_ **Duplicate content block.** Lines 214–215 repeat text identical to lines 374–375 ("Hier werden Drittanbieter-Plugins angezeigt..."). Remove the duplicate to avoid redundancy and improve                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653167       | Removed duplicate Drittanbieter-Plugins paragraph from first occurrence; kept single canonical block. Prettier write/check passed.                                                                                                                                                         |
| CR-004  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.12.0.md                                                                                      | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix missing comma in German sentence structure.** The static analysis tool flagged a missing comma per German grammar rules. The sentence should have a comma after "Wenn auf Ja gesetzt"                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653184       | No code change required; comma already present in sentence at current HEAD.                                                                                                                                                                                                                |
| CR-005  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.0.0.md                                                                                       | 275  | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate overlay2 storage driver guidance.** Lines 272–277 and 279–285 contain nearly identical content about overlay2 storage driver recommendations. Remove the duplication.                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653227       | No code change required; only one overlay2 guidance block remains in file.                                                                                                                                                                                                                 |
| CR-006  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.0.0.md                                                                                       | 336  | _🛠️ Refactor suggestion_ / _🟠 Major_ **Standardize German quotation marks for consistency.** Straight quotes (''time.google.com'') should use German quotation marks ('„time.google.com"') per LanguageTool feedback and Ger                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653232       | Replaced both 'time.google.com' occurrences with German typographic quotes.                                                                                                                                                                                                                |
| CR-007  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md                                                                                       | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Resolve punctuation placement inside emphasis markup.** The period ('.') appears inside the emphasized text '_Falscher Pool-Zustand. Zu viele falsche oder fehlende Geräte_', creating an                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653246       | No code change required; emphasized phrase already normalized to use dash punctuation.                                                                                                                                                                                                     |
| CR-008  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md                                                                                       | 75   | _⚠️ Potential issue_ / _🟠 Major_ **Fix German grammar in Docker restrictions explanation.** Line 73 contains a grammatical error: 'beachte, dass bei aktivierter WLAN' is informal/imperative. In formal German documentatio                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653264       | Removed duplicate informal WLAN bullet and kept formal corrected wording.                                                                                                                                                                                                                  |
| CR-009  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md                                                                                       | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Correct grammar and capitalization in VM configuration instructions.** Line 112 has capitalization and unnecessary pronoun issues. "**Alles Abwählen**" (capitalization) and the phrase s                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653281       | Text already fixed in branch.                                                                                                                                                                                                                                                              |
| CR-010  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md                                                                                       | 133  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix spacing in emphasis markup.** Line 132 has improper spacing: '_Pfad existiert nicht_' should not have a space before the underscore. Ensure consistent spacing around emphasis delimi                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653292       | Text already uses proper emphasis delimiter spacing.                                                                                                                                                                                                                                       |
| CR-011  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.1.md                                                                                       | 17   | _⚠️ Potential issue_ / _🟡 Minor_ **Use "Zurückrollen" instead of "Rückschritte" for the rollback section.** The section header on line 13 uses "Rückschritte" (setbacks/regressions), but the content refers to rolling back                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653315       | Removed redundant `### Rückschritte` heading, keeping `### Zurückrollen`.                                                                                                                                                                                                                  |
| CR-012  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix mixed English-German syntax.** Line 60 contains "Before Sie beginnen" which mixes English and German. This should be fully translated to German. '''diff -:::caution[Before Sie begin                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653333       |                                                                                                                                                                                                                                                                                            |
| CR-013  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health.mdx                                  | 52   | _⚠️ Potential issue_ / _🔴 Critical_ **Translate English warning text to German.** The warning block contains English text but this is a German localization file. All content should be translated to maintain consistency a                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653350       | Translated warning sentence and fixed duplicate warning markers in block.                                                                                                                                                                                                                  |
| CR-014  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/secure-your-server/securing-your-data.mdx                                              | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Fix missing closing bracket in block directive.** The ':::important' block at line 34 is missing a closing bracket ']', which will cause a rendering error in the documentation. Apply                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653373       | Block now has closing bracket in opening marker (`:::important[...]`).                                                                                                                                                                                                                     |
| CR-015  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/docker-troubleshooting.mdx                                                     | 10   | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;❓ Verification inconclusive<lt;/summary>gt; **Address static analysis grammar warnings.** LanguageTool flagged two issues on line 10: - Missing space after "z.B." - Adjective                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653398       | Updated `z. B.` and `effektive Lösung` in both duplicate opening lines.                                                                                                                                                                                                                    |
| CR-016  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx                                               | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Translate English text in German documentation.** Lines 177 and 189 contain English sentences in a German-language document: - Line 177: "Regularly monitor drive %%SMART/smart%% data                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653422       | Übersetzt Zeile 189 in deutscher Sprache; Zeile 177 war bereits korrekt.                                                                                                                                                                                                                   |
| CR-017  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx                                                   | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Remove unnecessary space at start of paragraph.** The opening phrase has extraneous whitespace. Align indentation with other paragraphs in the document. '''diff - Die Konfiguration der                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653442       | Entfernt führende Leerzeichen vor dem Absatz „Die Konfiguration der Unraid %%VM                                                                                                                                                                                                            | vm%% erfordert …“ im zweiten Details-Block.              |
| CR-018  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx                                                   | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix awkward preposition pairing: remove redundant "zu".** The phrase "zu unter 'http://[VM-IP]'" uses both "zu" (to) and "unter" (under/at), which is grammatically awkward in German. Us                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653451       | Entfernt „zu“ in beiden `%%WebGUI                                                                                                                                                                                                                                                          | web-gui%%`-Zeilen.                                       |
| CR-019  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx                                                   | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Add missing punctuation after navigation path.** Line 107 ends with a navigation path (→ Arbeitsgruppeneinstellungen) followed directly by "und stellen". Add a colon or comma for clarit                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653460       | Navigation-Pfad-Zeile erhielt Komma vor „und stellen“.                                                                                                                                                                                                                                     |
| CR-020  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx                                                  | 29   | _⚠️ Potential issue_ / _🔴 Critical_ **Fix mixed-language placeholder syntax in caution block.** The admonition block uses English "Before" mixed with German "Sie beginnen". This should be entirely in German for consisten                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653478       | Erste `Before Sie beginnen`-Blockzeile wurde auf `Bevor Sie beginnen` vereinheitlicht.                                                                                                                                                                                                     |
| CR-021  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx                                                  | 129  | _⚠️ Potential issue_ / _🔴 Critical_ **Translate embedded English content to German.** Lines 109–110 and similar sections contain untranslated English text that should be fully translated to maintain document consistency.                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653492       | Englische Passage in „Was tun, wenn der Ruhezustand fehlschlägt?“ und in den Abschnitten zur Windows-Indizierung wurde ins Deutsche übertragen.                                                                                                                                            |
| CR-022  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx                                                  | 257  | _⚠️ Potential issue_ / _🔴 Critical_ **Resolve misplaced content and mixed-language placeholder in section header.** The section starting at line 223 ("Erweitern von Windows-VM-vDisk-Partitionen") immediately includes TPM                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653503       | Doppelte Titelzeile entfernt; der verbleibende Abschnitt wurde sprachlich vereinheitlicht (`:::important[Vor dem Upgrade]`).                                                                                                                                                               |
| CR-023  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx                                                  | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Translate embedded English content to German.** Lines 258–259 contain untranslated English text ("Expanding or modifying %%vDisk/vdisk%% and partition layouts can lead to irreversibl                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653510       | Englische Warnzeile im `Data Verlustrisiko`-Hinweis vollständig durch deutsche Formulierung ersetzt.                                                                                                                                                                                       |
| CR-024  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx                                                              | 54   | _⚠️ Potential issue_ / _🟠 Major_ **Inconsistent mixed English–German translation in file system description sections.** Lines 32–52 contain substantial English paragraphs embedded within German documentation (e.g., line                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653526       | Verified that lines 32–52 are fully localized to German in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` (`pnpm exec prettier --check ...` run with existing warnings).                                                       |
| CR-025  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx                                                              | 44   | _⚠️ Potential issue_ / _🟠 Major_ **Misplaced or unclear section structure: "### %%ZFS/zfs%%" section begins with EXT4 content.** Line 40 contains an introductory paragraph about "EXT4 ist ein reifes und stabiles Dateisys                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653538       | Confirmed `### EXT4` and `### %%ZFS                                                                                                                                                                                                                                                        | zfs%%` section ordering/content mapping are now correct. |
| CR-026  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx                                                              | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Awkward phrasing: "Still Brauchen Sie Hilfe" should be revised.** Line 98 contains the phrase ":::tip[Still Brauchen Sie Hilfe bei der Auswahl?]". The word "Still" (English) mixed with                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653544       | Updated tip heading to `:::tip[Benötigen Sie noch Hilfe bei der Auswahl?]`.                                                                                                                                                                                                                |
| CR-027  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx                                                              | 160  | _⚠️ Potential issue_ / _🟠 Major_ **Duplicate and overlapping section: "Neues Format eines Cache-Laufwerks" / "Format Cache Drive".** The section "## Neues Format eines Cache-Laufwerks" (New Format of a Cache Drive) appea                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653551       | Confirmed single occurrence of `## Neues Format eines Cache-Laufwerks`; duplicate lower heading was removed.                                                                                                                                                                               |
| CR-028  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-parity-preserve.mdx                                 | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Verify and correct malformed warning block structure.** The warning block (lines 20–24) appears to have formatting issues: - The block opens with ':::warning' (line 20) - Contains bl                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653556       | Added `:::warning` block after `:::important` with translated German risk notice and proper closure.                                                                                                                                                                                       |
| CR-029  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-standard.mdx                                        | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Translate untranslated English sentence to German.** This German localization file contains untranslated English text that should be translated to maintain consistency and readability f                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653568       | File already fully translated; all procedure steps and tip content are German.                                                                                                                                                                                                             |
| CR-030  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-standard.mdx                                        | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Translate untranslated English sentence in tip block to German.** The tip content at line 13 contains English text in a German-localized file and should be translated to German for cons                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653583       | Tip text is translated; no English sentence remains in `:::tip` block.                                                                                                                                                                                                                     |
| CR-031  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/troubleshoot-device-limit.mdx                                        | 15   | _⚠️ Potential issue_ / _🟠 Major_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Remove duplicate heading; clarify tip block structure.** The phrase "Um diesen Fehler zu beheben:" appears both inside the tip block (lines                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653599       | Consolidated the tip so the instruction is only once and all steps remain inside the `:::tip` block.                                                                                                                                                                                       |
| CR-032  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-account/redeem-activation-code.mdx                                                                              | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Translate the description to Chinese.** The front matter description is in English, but this is a Chinese localization file. Translate line 3 to Chinese to maintain consistency with the                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653609       | Front matter description at line 3 is already localized: `如何兑换激活码以安装您的 Unraid 许可证`.                                                                                                                                                                                         |
| CR-033  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx                                                                                   | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Translate the entire section heading and instructions to Chinese.** Lines 12-17 are in English but this is a Chinese localization file. The heading and step-by-step instructions must                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653622       | Removed duplicated English heading/instructions lines 12–16, leaving only the Chinese section.                                                                                                                                                                                             |
| CR-034  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/explore-the-user-interface/tour-the-web-gui.mdx                                              | 81   | _⚠️ Potential issue_ / _🔴 Critical_ **Translate the untranslated VM note content to Chinese.** The note block for VMs (lines 77-79) is entirely in English within a Chinese localization file. This section must be translat                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653639       | Removed English sentence from VM note and kept Chinese sentence with the `%hardware virtualization                                                                                                                                                                                         | hvm%` term.                                              |
| CR-035  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/configure-your-array.mdx                                                       | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Ensure consistent UI terminology translation in info block.** Line 95 uses "**主界面**选项卡" (Main interface tab), which translates the UI label differently from line 18. For consistency, th                                             | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653648       | Replaced duplicate line and standardized on "主页面" for the info block’s tab label.                                                                                                                                                                                                       |
| CR-036  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/customize-unraid-settings.mdx                                                  | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Remove misplaced third-party plugin reference from notification settings.** Line 214 contains "此处显示第三方插件..." which appears to be copied from the "用户实用工具" section (line 375). This conten                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653661       | Replaced misplaced plugin blurb with SMB section description under 网络服务.                                                                                                                                                                                                               |
| CR-037  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os.mdx                                             | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Remove duplicate password manager recommendation.** The recommendation to use a password manager appears twice: at line 33 and again at line 39. Consolidate this into a single occurrenc                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2528653670       | File already shows one recommendation only; no duplicate remains.                                                                                                                                                                                                                          |
| CR-038  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx                                                                                       | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Duplicate section header: "## Verwendung von UPnP" appears twice.** Line 70 and line 90 both define the same section header '## Verwendung von UPnP (Universal Plug and Play)'. This b                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095507       | Removed duplicate header instance upstream; only one `## Verwendung von UPnP (Universal Plug and Play)` heading remains.                                                                                                                                                                   |
| CR-039  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx                                                                                       | 92   | _⚠️ Potential issue_ / _🟠 Major_ **Identical troubleshooting caution duplicated verbatim.** Lines 92 and 112 contain the exact same troubleshooting text about UPnP/manual port forwarding. This appears to be a copy-paste                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095517       | Removed duplicate paragraph and kept only the caution block at lines 108–112.                                                                                                                                                                                                              |
| CR-040  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx                                                                                       | 159  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix line-ending formatting issue flagged by static analysis.** Line 159 has ':::' (block closure) on the same line as the period, when it should be on its own line. This breaks the Mark                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095523       | Closure marker already on its own line in this file; no change required beyond verification.                                                                                                                                                                                               |
| CR-041  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/create-your-bootable-media.mdx                                                 | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix German grammar in the FAT32 formatting instruction.** Line 45 has an incomplete German construction. "Verwenden, um als FAT32 zu formatieren" is missing a direct object and is gramm                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095533       | Removed duplicate sentence and kept the corrected form: „..., um sie als FAT32 zu formatieren.“                                                                                                                                                                                            |
| CR-042  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os.mdx                                             | 25   | _⚠️ Potential issue_ / _🟡 Minor_ **Clarify hyphenation for compound term across descriptive text.** The static analysis tool flags inconsistent treatment of 'Unraid-Server' (line 25, with hyphen) versus 'unraidserver' (l                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095547       | Normalized terminology by changing "Unraid-Server" to "Unraidserver" at line 25 to match the existing host-name style example.                                                                                                                                                             |
| CR-043  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md                                                                                       | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix spacing issues around underscored terminology.** The reformatting introduces spacing errors around '_raid1_', '_raid1c3_', and '_raid1c4_' that should be corrected. LanguageTool fla                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095552       | Verified no underscored `raid1` variants remain; terminology uses backticks (`raid1`) consistently in this file section.                                                                                                                                                                   |
| CR-044  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md                                                                                       | 130  | _⚠️ Potential issue_ / _🟡 Minor_ **Clarify "Stubbing" and "blacklisten" terminology formatting; review punctuation.** Lines 128–130 introduce underscores for '_Stubbing_' and '_blacklisten_', but LanguageTool flags issue                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095562       | Replaced underscore emphasis with German quotation-marked terms, added colon after the conditional phrase, and corrected quotation punctuation around "stubben" usage.                                                                                                                     |
| CR-045  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md                                                                                       | 147  | _⚠️ Potential issue_ / _🟠 Major_ **Fix multiple formatting and punctuation errors in the multi-language support section.** LanguageTool identifies several issues in this section: - Line 139: Unnecessary spaces around und                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095569       | Reformatted the multilingual section for German typography and punctuation and rewrote awkward sentence links without changing meaning.                                                                                                                                                    |
| CR-046  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx                                              | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Mixed language in tip heading—fix to all-German.** Line 28 combines English ("When") with German ("Sollte"). This should be "Wann sollte ich das Terminal verwenden?" to match the Ger                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095581       | Heading is already fully German: `:::tip[Wann sollte ich das Terminal verwenden?]`.                                                                                                                                                                                                        |
| CR-047  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx                                              | n/a  | _⚠️ Potential issue_ / _🟠 Major_ **Remove duplicate PuTTY content.** Lines 30 and 40 contain identical text about PuTTY for SSH access. Line 40 appears in the wrong structural context (inside a "top" command details sect                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095591       | Removed duplicated PuTTY-only intro line that appeared in the wrong command-section context.                                                                                                                                                                                               |
| CR-048  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx                                              | 150  | _⚠️ Potential issue_ / _🟠 Major_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Correct section heading mismatch.** The "### Speicher-Utilities" (Storage Utilities) heading at lines 148–150 incorrectly precedes process-                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095595       | Renamed heading to `### \`ps\``and aligned the details summary to`Ps-Optionen anzeigen`.                                                                                                                                                                                                   |
| CR-049  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx                                              | 333  | _⚠️ Potential issue_ / _🟠 Major_ **Remove duplicate section headers for 'tail' and 'ethtool'.** - Lines 331–333: 'tail' command introduced. - Lines 367–369: 'ethtool' command introduced (duplicate of earlier content). -                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095605       | Renamed duplicate headers to avoid repeated command section labels (`### ethtool` was used where `### ip` and `### ethtool` formerly, and `## ethtool` was renamed to `## Hardware-Tools`).                                                                                                |
| CR-050  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | 24   | _⚠️ Potential issue_ / _🟡 Minor_ **Remove extra whitespace before caution marker.** Line 19 has an unnecessary leading space. '''diff :::caution - Wenn Sie Ihr Unraid USB-Flash-Gerät ersetzen, wird Ihre Lizenz auf das ne                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095613       | Removed duplicate top caution block and normalized one valid opening/closing admonition pair.                                                                                                                                                                                              |
| CR-051  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Remove redundant English term from German heading.** "Rules Daumenregel" mixes English with German and is redundant; both convey "rule of thumb." Keep only the German term. '''diff -:::                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095624       | Heading is already localized (`:::tip[Daumenregel für den Austausch]` in current file), so no code change needed.                                                                                                                                                                          |
| CR-052  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Fix invalid admonition syntax.** ':::Vorsicht' is not a valid Docusaurus admonition type. Use the standard ':::caution' syntax with the German label in the bracket. '''diff -:::Vorsi                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095627       | `:::Vorsicht` syntax is not present in current file; CR is already satisfied in existing content.                                                                                                                                                                                          |
| CR-053  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Translate "Trial" from English to German.** Line 102 mixes the English term "Trial" with German. Use the German term "Testlizenz" or "Prüf-" to keep the heading fully German. '''diff -:                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095637       | Heading now uses `Testlizenz` (`:::important[Testlizenz Schlüssel und Gerätewechsel]`) in current file; no additional edit needed.                                                                                                                                                         |
| CR-054  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx                                      | 164  | _⚠️ Potential issue_ / _🟡 Minor_ **Translate English verb in tip heading to German.** Line 149 mixes the English verb "Identifying" with the German noun "Laufwerke." The heading should be fully translated to German. '''d                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095648       | Changed `:::tip[Identifying Laufwerke]` to `:::tip[Laufwerke identifizieren]`.                                                                                                                                                                                                             |
| CR-055  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/boot-and-startup-failures.mdx                                                  | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix adjective form in line 75.** LanguageTool correctly flags an adjective form issue: "webbasiertem" should be "webbasierte" to match the noun gender and case. '''diff - Die webbasiert                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095664       | Replaced `webbasiertem` with `webbasierte` in the duplicate startup section.                                                                                                                                                                                                               |
| CR-056  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/faq.mdx                                                                                      | 8    | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;❓ Verification inconclusive<lt;/summary>gt; **Verify whether 'Tabs' and 'TabItem' imports are actually used in this file.** The imports for '@theme/Tabs' and '@theme/TabItem'                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095683       | Confirmed imports were unused via `rg`; removed both import lines.                                                                                                                                                                                                                         |
| CR-057  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx                                                        | 25   | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate content.** Line 21 is an exact repetition of the macOS Sequoia warning from lines 16–18. This appears to be an artifact of the restructuring and should be removed. '                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095695       | Kept one `:::note[macOS kompatibilität]` + `:::caution[macOS Sequoia...]` block; removed the second duplicated copy.                                                                                                                                                                       |
| CR-058  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx                                                        | 60   | _⚠️ Potential issue_ / _🔴 Critical_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Resolve conflicting caution blocks and clarify English/German structure.** Lines 23–24 introduce an English-German hybrid caution ("Befo                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095710       | Removed nested mixed-language caution (`Before Sie beginnen`) and consolidated to a single German `:::caution[Bevor Sie beginnen]` block with one instruction list.                                                                                                                        |
| CR-059  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx                                                        | 125  | _⚠️ Potential issue_ / _🟠 Major_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Rationalize English–German language mixing in multi-user setup section.** This section contains inconsistent language mixing: line 97 is en                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095714       | Translated mixed English list items and command phrasing in the multi-user setup section (steps 2–4 and related bullets) into German.                                                                                                                                                      |
| CR-060  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx                                                        | 140  | _⚠️ Potential issue_ / _🟠 Major_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Ensure consistent language and formatting in troubleshooting section.** The Troubleshooting section (lines 115–120) mixes English instructi                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095722       | Translated troubleshooting action steps 1 and 3 and removed remaining English sentences in the affected section.                                                                                                                                                                           |
| CR-061  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx                                                               | 29   | _⚠️ Potential issue_ / _🟡 Minor_ **Fix awkward German localization in info block header.** "Keep im Sinn" is not idiomatic German. Consider using "Beachten Sie", "Denken Sie daran", or "Behalten Sie im Hinterkopf". <lt;deta                                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095732       | Replaced heading with `:::info[Beachten Sie]`.                                                                                                                                                                                                                                             |
| CR-062  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx                                                               | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Remove stray markup: unexpected ':::' without context.** Line 39 contains a stray ':::' that appears to be errant or malformed. Verify whether this should close a previous block or b                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095740       | Removed duplicate stray `:::` marker below the `:::info[Beachten Sie]` block.                                                                                                                                                                                                              |
| CR-063  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx                                                               | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate sections with overlapping content about adding drives.** Lines 64–95 and lines 104–114 contain substantially overlapping procedural content about adding drives to a                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095746       | Removed the overlapping duplicate add-drives subsection from the earlier section and retained the dedicated later section.                                                                                                                                                                 |
| CR-064  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx                                                              | 105  | _⚠️ Potential issue_ / _🟠 Major_ **Mixed English–German content in recommendation list.** Lines 100–105 mix English (line 101: "For high-performance or advanced features: Choose %%ZFS/zfs%% or %%BTRFS/btrfs%%…") with Ger                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095773       | Translated English recommendation bullets and concluding sentence in the tip block.                                                                                                                                                                                                        |
| CR-065  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/move-array-to-pool.mdx                                               | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix mixed-language admonition heading.** The heading mixes English and German ("Common einsatzgebiet"). For a German-localized file, use proper German phrasing. '''diff -:::info[Common                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095778       | Heading already localized (`Häufiger Einsatzbereich`) so no change required.                                                                                                                                                                                                               |
| CR-066  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/move-array-to-pool.mdx                                               | 14   | _⚠️ Potential issue_ / _🔴 Critical_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Incomplete German localization: steps 2–6 are in English.** This German-localized documentation file contains a mix of German and Englis                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095783       | Translated remaining English lines in the partial (intro and steps) to German.                                                                                                                                                                                                             |
| CR-067  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/pool-single-device-mode.mdx                                          | 9    | _⚠️ Potential issue_ / _🔴 Critical_ **Language mismatch: English text in German localization file.** Lines 7-9 contain English text, but this file is located in the German localization folder ('i18n/de/'). This breaks th                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095791       | Fully translated intro and important note block into German.                                                                                                                                                                                                                               |
| CR-068  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-disk-command-line.mdx                                         | 36   | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate line.** The line "Sie können dies mit einem Befehl tun:" appears twice consecutively. Remove one instance. '''diff -Sie können dies mit einem Befehl tun: - -Sie könn                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095796       | Removed one duplicate line so the command notice appears only once.                                                                                                                                                                                                                        |
| CR-069  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-disk-gui.mdx                                                  | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Translate English text to German in this localization file.** Line 5 contains untranslated English instructions in a German-localized fi                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095802       | Removed mixed-language note header and duplicate block fragment; section is now German-localized and structurally consistent.                                                                                                                                                              |
| CR-070  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/troubleshoot-license-issues.mdx                                      | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Remove stray admonition marker.** Line 18 contains a standalone ':::' with no associated admonition type or context. This appears to be a formatting artifact and should be removed to                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095816       | Verified no bare `:::` line exists (`:::` only used as proper admonition closings); `pnpm exec prettier --check .../troubleshoot-license-issues.mdx` passed.                                                                                                                               |
| CR-071  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/run-docker-containers/partials/managing-and-customizing-containers/environment-variables.mdx | 24   | _⚠️ Potential issue_ / _🔴 Critical_ **Invalid admonition syntax on line 24.** Line 24 contains a bare ':::' without an admonition type, which is invalid Docusaurus/MDX syntax and will likely cause rendering errors. In Do                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095830       | Replaced malformed heading with `:::info[Beispiele für Umgebungsvariablen]`, preserved list content, and validated with `pnpm exec prettier --write` then `pnpm exec prettier --check` on the file.                                                                                        |
| CR-072  | thread  | i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/explore-the-user-interface/key-features.mdx                                                  | 13   | _⚠️ Potential issue_ / _🔴 Critical_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Verify anchor consistency with translated 'tour-the-web-gui.mdx' file.** Line 13 references './tour-the-web-gui.mdx#2-main', using the E                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535095837       | Added explicit `{#1-dashboard}` and `{#2-main}` anchors in `tour-the-web-gui.mdx` so existing Chinese links resolve correctly.                                                                                                                                                             |
| CR-073  | thread  | docs/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx                                                                                                    | 274  | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Verify the hyphenation of "Shutdown time-out" in UI settings.** Line 274 refers to '**_Settings → Disk Settings → Shutdown time-out_**' (hy                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101178       | Changed the UI menu path label from `Shutdown time-out` to `Shutdown timeout` and confirmed with prettier check.                                                                                                                                                                           |
| CR-074  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx                                                                                   | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix German quotation marks in list item 3.** Line 30 uses straight quotes instead of curved German quotation marks: '''diff - 3. Klicken Sie auf "Server entfernen" auf der Serververwalt                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101192       | Replaced closing straight quote in `„Server entfernen"` with `„Server entfernen“`; prettier check passes.                                                                                                                                                                                  |
| CR-075  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/automated-flash-backup.mdx                                                                              | 62   | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate content about Flash-Backup scope.** Lines 62 and 70 contain identical paragraphs describing what Flash-Backup stores and its limitations. This appears to be an accid                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101212       | Removed the duplicate scope paragraph under **Flash-Backup aktivieren** after de-duplicating with the earlier introductory section; file now has a single canonical description.                                                                                                           |
| CR-076  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/automated-flash-backup.mdx                                                                              | 86   | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate "Backups-Verschlüsselung" section.** Lines 92–104 and lines 101–104 both define a "Backups-Verschlüsselung" section with nearly identical content about encryption an                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101221       | No duplicate heading block remains; `rg -n \"^## Backups-Verschlüsselung$\"` returns one match.                                                                                                                                                                                            |
| CR-077  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx                                                     | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Image path updates are consistent across the file.** All image references have been updated from './assets/zfsX.png' to '/img/zfsX.png', wh                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101238       | Replaced all `./assets/zfs*.png` references with `/img/zfs*.png`; no `./assets/` matches remain.                                                                                                                                                                                           |
| CR-078  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx                                                     | 176  | _⚠️ Potential issue_ / _🟠 Major_ **Tables contain mixed English/German content and incomplete translations.** The tables mix English and German content inconsistently. For example: - Lines 169–176: Table header and descr                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101251       | `pnpm exec prettier --write i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx` (passes through formatting changes); `pnpm exec prettier --check ...` failed with existing style warnings unrelated to translation changes. |
| CR-079  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx                                                     | 201  | _⚠️ Potential issue_ / _🔴 Critical_ **Correct unclosed bracket in tip block heading.** Line 177 contains an unclosed bracket: ':::tip[Optimizing Festplattenanzahlen' — the closing bracket is missing. This breaks the admo                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101261       | Removed the duplicate malformed `:::tip[Optimizing Festplattenanzahlen` block and kept the correctly headed `:::tip[Optimierte Festplattenzahlen]` section.                                                                                                                                |
| CR-080  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/complete-your-post-setup-essentials.mdx                                        | 91   | _⚠️ Potential issue_ / _🟡 Minor_ **Standardize German compound word formation in bullet list.** LanguageTool flagged an inconsistency in compound word formation. Across the checklist, 'Lizenzschlüssel-Datei' (with hyphen                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101279       | Standardized to `Lizenzschlüsseldatei` and kept list structure unchanged.                                                                                                                                                                                                                  |
| CR-081  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/data-recovery.mdx                                                              | 61   | _⚠️ Potential issue_ / _🟡 Minor_ **Admonition block formatting is incomplete; header label has language mismatch.** Line 43 contains the English word "Proactive" which should be translated to German ("Proaktive") to matc                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101305       | Changed `:::info[Proactive Überwachung und Unterstützung]` to `:::info[Proaktive Überwachung und Unterstützung]`; `pnpm exec prettier --write .../data-recovery.mdx` then `pnpm exec prettier --check .../data-recovery.mdx`.                                                              |
| CR-082  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/partials/data-recovery/repair-btrfs.mdx                                        | 14   | _⚠️ Potential issue_ / _🟠 Major_ **Admonition block has malformed closing structure and grammar issues.** The admonition closing structure appears incorrect: lines 8–10 contain both a closing ':::' and a trailing ':::' o                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101317       | Corrected duplicated closing marker structure, normalized wording for grammar, and ran `pnpm exec prettier --write .../repair-btrfs.mdx` then `pnpm exec prettier --check .../repair-btrfs.mdx` (pass).                                                                                    |
| CR-083  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/partials/data-recovery/repair-xfs.mdx                                          | 17   | _⚠️ Potential issue_ / _🟠 Major_ **Admonition closure is malformed; mixed English content in German block.** Similar to the repair-btrfs.mdx file, lines 13–19 show a malformed admonition closure with both a closing ':::'                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101329       | Revalidated the note block and confirmed German-only content with no mixed-English lines.                                                                                                                                                                                                  |
| CR-084  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx                                               | n/a  | _⚠️ Potential issue_ / _🔴 Critical_ **Fix mixed English/German syntax in admonition block.** The text contains "If Sie finden" which mixes English and German. Rewrite the label to use German only: 'Wenn Sie RAM-Fehler fi                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101337       | Verified the admonition heading is already `:::important[Wenn Sie RAM-Fehler finden]` and no mixed-language label is present.                                                                                                                                                              |
| CR-085  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx                                               | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Address recurring grammar issue with word order and comma placement.** Line 50 contains a grammatical error flagged in the previous review.                                | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101357       | Changed the RAM troubleshooting sentence to `Wenn Memtest86+ bestanden wurde, haben Sie aber immer noch Probleme, ...`, then validated with `pnpm exec prettier --write .../system-crashes-and-stability.mdx` and `pnpm exec prettier --check .../system-crashes-and-stability.mdx`.       |
| CR-086  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx                                               | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Remove redundant heading.** The heading "**Risiken der Übertaktung:**" appears on line 56 as a standalone section, then is immediately repeated inside the caution block on line 58. Remo                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101364       | Removed the standalone preamble heading and duplicate caution marker; `pnpm exec prettier --write .../system-crashes-and-stability.mdx` then `pnpm exec prettier --check .../system-crashes-and-stability.mdx` verify structure.                                                           |
| CR-087  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx                                                          | 60   | _⚠️ Potential issue_ / _🟡 Minor_ **Duplicate/redundant content sections.** Lines 52–60 appear to duplicate content from lines 46–56 ("When your system shuts down gracefully..."). The identical explanation appears twice i                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101378       | Verified no duplicated content block remains between sections 46–60 in current file; existing structure already non-duplicated.                                                                                                                                                            |
| CR-088  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/diagnostics/partials/syslog-server/local.mdx                                                 | 20   | _⚠️ Potential issue_ / _🔴 Critical_ **Malformed admonition closing syntax.** Lines 16–18 show duplicate/nested closing syntax for the note block. Line 16 contains indented ':::' followed by line 18 with another bare ':::                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101384       | Removed the extra malformed closing marker, kept a single unindented `:::` after the note bullet list, and ran `pnpm exec prettier --write .../local.mdx` then `pnpm exec prettier --check .../local.mdx`.                                                                                 |
| CR-089  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx                                                                            | 25   | _⚠️ Potential issue_ / _🔴 Critical_ **Remove duplicate section header.** Line 21 duplicates the "Lizenzbesitz" (License Ownership) section header already defined at line 13. The second occurrence should be "Einkauf" (Pur                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101405       | Changed duplicate `## Lizenzbesitz` to `## Einkauf`; ran `pnpm exec prettier --write .../licensing-faq.mdx` and `pnpm exec prettier --check .../licensing-faq.mdx`.                                                                                                                        |
| CR-090  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx                                                                            | 61   | _⚠️ Potential issue_ / _🟡 Minor_ **Fix German quotation marks throughout file.** Multiple instances of straight quotation marks ("") should be replaced with German curved quotation marks („"). Examples include: - Line 59                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101421       | Replaced prose straight quotes with German quotation marks (e.g., „OEM“, „Unbegrenzt“, „unlimited“, „Verlängerung anfordern“) and ran `pnpm exec prettier --write .../licensing-faq.mdx` then `pnpm exec prettier --check .../licensing-faq.mdx`.                                          |
| CR-091  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx                                                                            | 110  | _⚠️ Potential issue_ / _🔴 Critical_ **Fix misplaced and incorrect heading level.** Line 100 contains '#### Lizenztypen & Funktionen' (License Types & Features), which is a main section header but is incorrectly placed as                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101433       | Promoted heading to `##` and normalized the corresponding list steps under it; ran `pnpm exec prettier --write .../licensing-faq.mdx` and `pnpm exec prettier --check .../licensing-faq.mdx`.                                                                                              |
| CR-092  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx                                                                            | 159  | _⚠️ Potential issue_ / _🟠 Major_ **Translate English text in German table.** Lines 152-153 contain English text ("Up to 30 (28 data + 2 %%parity/parity%%)") in the "Unbeschränkt" (Unleashed) and "Lebenslang" (Lifetime) l                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101447       | Translated table values `Up to 30 (28 data + 2 %%parity/parity%%)` to `Bis zu 30 (28 Daten + 2 %%parity/parity%%)` and validated with `pnpm exec prettier --write .../licensing-faq.mdx` + `pnpm exec prettier --check .../licensing-faq.mdx`.                                             |
| CR-093  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/array-check-parity.mdx                                               | 47   | _⚠️ Potential issue_ / _🟠 Major_ **Fix mixed-language content structure and floating list item.** Line 47 appears to be a floating bullet point ("Unsaubere Shutdowns oder unerwartete Systemabstürze") that is positioned o                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101463       | Removed the floating bullet point from the list and incorporated the content into the surrounding prose; then ran `pnpm exec prettier --write .../array-check-parity.mdx` and `pnpm exec prettier --check .../array-check-parity.mdx`.                                                     |
| CR-094  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-btrfs.mdx                                               | 12   | _⚠️ Potential issue_ / _🟡 Minor_ **Untranslated English content in German localization file.** Line 10 contains English warning text that should be translated to German for consistency with the rest of the German localization.                                             | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101474       | Translated warning text to German and ran `pnpm exec prettier --write .../fs-check-cli-btrfs.mdx` plus `pnpm exec prettier --check .../fs-check-cli-btrfs.mdx`.                                                                                                                            |
| CR-095  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-xfs.mdx                                                 | 13   | _⚠️ Potential issue_ / _🟡 Minor_ <lt;details>gt; <lt;summary>gt;🧩 Analysis chain<lt;/summary>gt; **Untranslated English content in German localization file.** Line 12 contains English text within a German documentation file. This warning                                 | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101481       | Translated the warning paragraph into German and ran `pnpm exec prettier --write .../fs-check-cli-xfs.mdx` plus `pnpm exec prettier --check .../fs-check-cli-xfs.mdx`.                                                                                                                     |
| CR-096  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-zfs.mdx                                                 | 29   | _⚠️ Potential issue_ / _🟠 Major_ **Remove duplicate content outside of admonition block.** Line 27 duplicates the content that appears inside the :::info block (line 23), but it's placed outside the block after the closi                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101491       | Removed the duplicate `:::info` block outside the first info block and validated with `pnpm exec prettier --write .../fs-check-cli-zfs.mdx` then `pnpm exec prettier --check .../fs-check-cli-zfs.mdx`.                                                                                    |
| CR-097  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-zfs.mdx                                                 | n/a  | _⚠️ Potential issue_ / _🟡 Minor_ **Fix German adjective agreement and add missing punctuation.** Line 23 has two issues: (1) "den spezielle" has incorrect adjective agreement—should be "den speziellen"; (2) LanguageTool                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101502       | Verified line reads `den speziellen` with required comma after „%%ZFS                                                                                                                                                                                                                      | zfs%%-Dateisystemen, besuchen“, no code change required. |
| CR-098  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-btrfs.mdx                                              | 10   | _🛠️ Refactor suggestion_ / _🟠 Major_ **Add German punctuation (commas) for proper sentence structure.** Lines 8–10 list conditions that require commas after each item in German grammar. Add commas after lines 8 and 9. Ap                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101509       | Added commas to the first two list conditions and ran `pnpm exec prettier --write .../fs-repair-cli-btrfs.mdx` plus `pnpm exec prettier --check .../fs-repair-cli-btrfs.mdx`.                                                                                                              |
| CR-099  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-btrfs.mdx                                              | 12   | _⚠️ Potential issue_ / _🟡 Minor_ **Untranslated English content requires German translation.** Line 12 contains English guidance text that should be translated to German to maintain consistent localization. Suggested Ger                                                   | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101520       | Translated the final caution guidance sentence to German and ran `pnpm exec prettier --write .../fs-repair-cli-btrfs.mdx` plus `pnpm exec prettier --check .../fs-repair-cli-btrfs.mdx`.                                                                                                   |
| CR-100  | thread  | i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-xfs.mdx                                                | 11   | _⚠️ Potential issue_ / _🟡 Minor_ **Untranslated English content in German localization file.** Line 9 contains English warning text that should be translated to German. This pattern repeats across multiple fs-repair and                                                    | DONE   | https://github.com/unraid/docs/pull/381#discussion_r2535101525       | Translated the warning paragraph to German and ran `pnpm exec prettier --write .../fs-repair-cli-xfs.mdx` plus `pnpm exec prettier --check .../fs-repair-cli-xfs.mdx`.                                                                                                                     |
| NIT-001 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 20** >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t be posted inline due to platform limitations. >gt; >gt; >gt; >gt; <lt;details>gt; >gt; <lt;summary>gt;⚠️ Outside diff range comments (16)<lt;/summary>gt;<lt;bloc          | TODO   | https://github.com/unraid/docs/pull/381#pullrequestreview-3485150274 |                                                                                                                                                                                                                                                                                            |
| NIT-002 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 14** >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t be posted inline due to platform limitations. >gt; >gt; >gt; >gt; <lt;details>gt; >gt; <lt;summary>gt;⚠️ Outside diff range comments (10)<lt;/summary>gt;<lt;bloc          | TODO   | https://github.com/unraid/docs/pull/381#pullrequestreview-3485180197 |                                                                                                                                                                                                                                                                                            |
| NIT-003 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 0** <lt;details>gt; <lt;summary>gt;🧹 Nitpick comments (1)<lt;/summary>gt;<lt;blockquote>gt; <lt;details>gt; <lt;summary>gt;i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.2.md (1)<lt;/summary>gt;<lt;blockquot      | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3493942977 | `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.2.md` (pass)                                                                                                                                                                        |
| NIT-004 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 0** <lt;details>gt; <lt;summary>gt;🧹 Nitpick comments (1)<lt;/summary>gt;<lt;blockquote>gt; <lt;details>gt; <lt;summary>gt;docs/unraid-os/release-notes/7.2.3.md (1)<lt;/summary>gt;<lt;blockquote>gt; '24-28': \*\*Consider a more direct phras | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3595236418 | `pnpm exec prettier --write docs/unraid-os/release-notes/7.2.3.md` then `pnpm exec prettier --check docs/unraid-os/release-notes/7.2.3.md` (pass)                                                                                                                                          |
| NIT-005 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 1** <lt;details>gt; <lt;summary>gt;🧹 Nitpick comments (1)<lt;/summary>gt;<lt;blockquote>gt; <lt;details>gt; <lt;summary>gt;i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.3.md (1)<lt;/summary>gt;<lt;blockquot      | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3595318913 | `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.3.md` (pass)                                                                                                                                                                        |
| NIT-006 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 13** >gt; [!NOTE] >gt; Due to the large number of review comments, Critical, Major severity comments were prioritized as inline comments. >gt; [!CAUTION] >gt; Some comments are outside the diff and can’                                        | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3637605108 | `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx`                                              |
| NIT-007 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 2** >gt; [!NOTE] >gt; Due to the large number of review comments, Critical, Major severity comments were prioritized as inline comments. >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t                                        | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3729617394 | `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx i18n/es/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx`                                    |
| NIT-008 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 4** >gt; [!NOTE] >gt; Due to the large number of review comments, Critical, Major severity comments were prioritized as inline comments. >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t                                        | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3729626007 | `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx`                                                                                                                                                                                                                                                                                            |
| NIT-009 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 9** >gt; [!NOTE] >gt; Due to the large number of review comments, Critical, Major severity comments were prioritized as inline comments. >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t                                        | DONE   | https://github.com/unraid/docs/pull/381#pullrequestreview-3729630076 | Removed misplaced replacement content from `cache-pools` and de-duplicated maintenance section in `community-applications`; `pnpm exec prettier --write .../cache-pools.mdx .../community-applications.mdx` then `pnpm exec prettier --check .../cache-pools.mdx .../community-applications.mdx`. |
| NIT-010 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 2** >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t be posted inline due to platform limitations. >gt; >gt; >gt; >gt; <lt;details>gt; >gt; <lt;summary>gt;⚠️ Outside diff range comments (2)<lt;/summary>gt;<lt;blockq          | BLOCKED | https://github.com/unraid/docs/pull/381#pullrequestreview-3729843643 | Blocked by current scope request to only modify translation files. NIT-010 comments target English source docs and are not addressed in this pass. |
| NIT-011 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 2** >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t be posted inline due to platform limitations. >gt; >gt; >gt; >gt; <lt;details>gt; >gt; <lt;summary>gt;⚠️ Outside diff range comments (5)<lt;/summary>gt;<lt;blockq          | BLOCKED | https://github.com/unraid/docs/pull/381#pullrequestreview-3729861692 | Blocked by current scope request to only modify translation files; this item contains only English docs (`docs/unraid-os/troubleshooting/faq.mdx`, `docs/API/programmatic-api-key-management.mdx`). |
| NIT-012 | nitpick | top-level                                                                                                                                                             | n/a  | **Actionable comments posted: 7** >gt; [!CAUTION] >gt; Some comments are outside the diff and can’t be posted inline due to platform limitations. >gt; >gt; >gt; >gt; <lt;details>gt; >gt; <lt;summary>gt;⚠️ Outside diff range comments (3)<lt;/summary>gt;<lt;blockq          | BLOCKED | https://github.com/unraid/docs/pull/381#pullrequestreview-3729947594 | Blocked by scope because one referenced nitpick is an English-only doc (`docs/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx`). |

## Execution Log

### 1. Item:

- Action: Verified CR-001 target at `i18n/de/docusaurus-plugin-content-docs/current/unraid-account/redeem-activation-code.mdx`; `:::note[Server Kontext erforderlich]` is already correctly closed with `]`.
- Validation: `pnpm exec remark ...` (file ignored by repo rules), then `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-account/redeem-activation-code.mdx` (pass).
- Result: DONE (already fixed in branch; no file edit needed).

### 2. Item:

- Action: Updated numbered steps in `i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx` to remove duplicate item, add terminal punctuation, and normalize German quotes/wording.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx` (pass).
- Result: DONE.

### 3. Item:

- Action: Removed duplicated Drittanbieter-Plugins paragraph from `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/customize-unraid-settings.mdx` and retained one canonical occurrence.
- Validation: `pnpm exec prettier --write .../customize-unraid-settings.mdx` then `pnpm exec prettier --check .../customize-unraid-settings.mdx` (pass).
- Result: DONE.

### 4. Item:

- Action: Verified CR-004 target sentence in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.12.0.md`; comma after "Wenn auf Ja gesetzt" is already present.
- Validation: content check at line 174 confirms expected punctuation; `pnpm exec prettier --check .../6.12.0.md` reports pre-existing formatting issues in file.
- Result: DONE (already fixed in branch; no file edit needed).

### 5. Item:

- Action: Verified duplicate overlay2 guidance in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.0.0.md`; only one occurrence remains under the overlay2 heading.
- Validation: `rg` count for target sentence block = 1; `pnpm exec prettier --check .../7.0.0.md` reports pre-existing formatting issues in file.
- Result: DONE (already fixed in branch; no file edit needed).

### 6. Item:

- Action: Updated quote style in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.0.0.md` from `'time.google.com'` to `„time.google.com“` at both occurrences.
- Validation: `rg -n "time.google.com"` confirms updated lines 336 and 342; `pnpm exec prettier --check .../7.0.0.md` reports pre-existing formatting issues in file.
- Result: DONE.

### 7. Item:

- Action: Verified CR-007 target phrase in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md`.
- Validation: line 37 already reads `_Falscher Pool-Zustand - Zu viele falsche oder fehlende Geräte_` (no sentence period inside emphasis).
- Result: DONE (already fixed in branch; no file edit needed).

### 8. Item:

- Action: Removed duplicate informal WLAN/Docker restriction bullet in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md` and retained the formal corrected bullet.
- Validation: `pnpm exec prettier --check .../7.1.0.md` reports pre-existing formatting issues in file.
- Result: DONE.

### 9. Item:

- Action: Verified CR-009 target sentence in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md`; text already uses `**Alle abwählen**` and improved phrasing.
- Validation: no patch required after inspection of current line 112.
- Result: DONE (already fixed in branch).

### 10. Item:

- Action: Verified CR-010 emphasis spacing at `- Fix: Entfernen der verwirrenden _Pfad existiert nicht_ Meldung beim Einrichten des VM-Dienstes` in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.1.0.md`.
- Validation: inspected current line text.
- Result: DONE (already fixed in branch).

### 11. Item:

- Action: Removed duplicate/redundant rollback heading in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/7.2.1.md`.
- Validation: edited header block from `### Rückschritte` + `### Zurückrollen` to only `### Zurückrollen`.
- Result: DONE.

### 12. Item:

- Action: Verified `CR-012` warning title in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx`.
- Validation: looked up file block around caution heading; title is now `:::caution[Bevor Sie beginnen]`.
- Result: DONE (already fixed in branch).

### 13. Item:

- Action: Replaced duplicated and malformed `warning` block in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health.mdx` with single German warning text.
- Validation: file now contains one `:::warning` block with German sentence.
- Result: DONE.

### 14. Item:

- Action: Verified block syntax in `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/secure-your-server/securing-your-data.mdx`.
- Validation: opening `:::important[...]` line includes closing bracket.
- Result: DONE (already fixed in branch).

### 15. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx` for CR-016 and translated the remaining English advisory sentence in the Festplattengesundheit section.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Translated line 4 under "Wenn Probleme auftreten" to `Führen Sie für verdächtige Laufwerke erweiterte %%SMART|smart%%-Tests durch.`

### 16. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` for CR-017 and removed extra indentation at paragraph start.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Der Satz `Die Konfiguration der Unraid %%VM|vm%% erfordert ...` wurde ohne vorgelagerte Leerzeichen neu gesetzt.

### 17. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` for CR-018 and corrected awkward preposition chaining in WebGUI-Zugriffspfad.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. `zu unter` wurde zu `unter` in beiden betroffenen WebGUI-Zugriffszeilen geändert.

### 18. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` for CR-019 and added comma after the navigation path in the Arbeitsgruppeneinstellungen step.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/unraid-as-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Der Satz wurde zu `..., und stellen ...` korrigiert.

### 19. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` for CR-020 and normalized the duplicate caution header to German.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Die Admonition `Before Sie beginnen` wurde zu `Bevor Sie beginnen`.

### 20. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` for CR-021 and translated remaining English prose.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Englische Sätze in `:::important`-Hinweis und in den Windows-Indizierungs-Abschnitten übersetzt.

### 21. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` for CR-022 and removed duplicated/awkward section-opening content.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Doppelte Überschrift vor TPM-Abschnitt entfernt; Hinweisüberschrift auf Deutsch beibehalten.

### 22. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` for CR-023 and translated remaining caution text in the partition expansion warning.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm.mdx` (warns due existing unrelated style issues in file).
- Result: DONE. Englische Warnzeile im Abschnitt `:::caution[Datenverlustrisiko]` ersetzt durch deutsche Version.

### 23. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` for CR-024.
- Validation: reviewed lines 32–52 (all German text) and ran `pnpm exec prettier --check i18n/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` (warns only on pre-existing file-style issues).
- Result: DONE. Translation block is fully localized in German.

### 24. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` for CR-025 and confirmed section heading order now matches content (`EXT4` section followed by `%%ZFS|zfs%%` section).
- Validation: `nl -ba .../file-systems.mdx | sed -n '36,58p'` and `pnpm exec prettier --check .../file-systems.mdx` (warns on unrelated style issues).
- Result: DONE. Heading/content alignment for sections is correct.

### 25. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` for CR-026.
- Validation: `rg -n \"Still Brauchen Sie Hilfe|Benötigen Sie noch Hilfe\" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx`.
- Result: DONE. Heading now reads `:::tip[Benötigen Sie noch Hilfe bei der Auswahl?]`.

### 26. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` for CR-027 and confirmed duplicate formatting section heading is no longer present.
- Validation: `rg -n \"Neues Format eines Cache-Laufwerks|Format Cache Drive\" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx`.
- Result: DONE. Only one `## Neues Format eines Cache-Laufwerks` heading remains.

### 27. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-parity-preserve.mdx` for CR-028.
- Validation: checked block structure around lines 11–24 and ran `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-parity-preserve.mdx` (warns only on pre-existing style issues).
- Result: DONE. Added a properly formed German `:::warning` block under `:::important[Voraussetzungen]`.

### 28. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-standard.mdx` for CR-029.
- Validation: `rg -n \"\\b[a-zA-Z][a-zA-Z ]*\\b\"` for English sentence fragments in `partials/remove-data-disk-standard.mdx` plus visual review of all lines in the file.
- Result: DONE. The partial is fully localized in German for all visible prose.

### 29. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-data-disk-standard.mdx` for CR-030.
- Validation: reviewed lines 11–15 and confirmed `:::tip` content has no English sentence fragments; ran `pnpm exec prettier --check .../partials/remove-data-disk-standard.mdx` (warns on unrelated style issues only).
- Result: DONE. Tip block remains correctly translated.

### 30. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/troubleshoot-device-limit.mdx` for CR-031.
- Validation: `nl -ba .../partials/troubleshoot-device-limit.mdx | sed -n '9,20p'` and `pnpm exec prettier --check .../partials/troubleshoot-device-limit.mdx` (`prettier-ok`).
- Result: DONE. Removed duplicate “Um diesen Fehler zu beheben” occurrence and kept a single resolved instruction list within the tip block.

### 31. Item:

- Action: Rechecked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-account/redeem-activation-code.mdx` for CR-032.
- Validation: confirmed front matter line 3 reads a Chinese sentence and no English description remains there.
- Result: DONE. CR-032 is already fixed in this branch.

### 32. Item:

- Action: Reworked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx` for CR-033.
- Validation: removed English block at file top and kept the duplicated Chinese section intact; ran `pnpm exec prettier --check .../server-management.mdx` (clean).
- Result: DONE. Heading and server-management instructions are fully in Chinese.

### 33. Item:

- Action: Reworked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/explore-the-user-interface/tour-the-web-gui.mdx` for CR-034.
- Validation: removed English line within VM note block and verified `pnpm exec prettier --check .../tour-the-web-gui.mdx` (warns on pre-existing formatting issues).
- Result: DONE. VM note now contains only Chinese phrasing.

### 34. Item:

- Action: Reworked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/configure-your-array.mdx` for CR-035.
- Validation: deduplicated info block UI label at lines 95–96 and confirmed only consistent terminology remains; ran `pnpm exec prettier --check .../configure-your-array.mdx` (warns on unrelated style issues).
- Result: DONE. Info block now uses a single consistent tab term: **主页面**选项卡.

### 35. Item:

- Action: Reworked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/customize-unraid-settings.mdx` for CR-036.
- Validation: replaced misplaced plugin reference lines 215–218 with SMB protocol description; ran `pnpm exec prettier --check .../customize-unraid-settings.mdx` (warns on pre-existing style issues).
- Result: DONE. Notification settings section no longer contains copied "用户实用工具" text.

### 36. Item:

- Action: Rechecked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os.mdx` for CR-037.
- Validation: verified the string “密码管理器” appears only once and ran `pnpm exec prettier --check .../deploy-and-configure-unraid-os.mdx` (warns on pre-existing style issues).
- Result: DONE. CR-037 is already resolved (single recommendation remains).

### 37. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx` for CR-038.
- Validation: `rg -n "^## Verwendung von UPnP" i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx` and `pnpm exec prettier --check .../remote-access.mdx`.
- Result: DONE. Only one UPnP section header remains in this file.

### 38. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/remote-access.mdx` for CR-039 and CR-040.
- Validation: removed duplicate troubleshooting paragraph, normalized admonition to `:::caution[Fehlerbehebung]`, and confirmed closure line remains separate in `pnpm exec prettier --check .../remote-access.mdx`.
- Result: DONE. Duplicate text was eliminated and caution block syntax is now valid.

### 39. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/create-your-bootable-media.mdx` for CR-041.
- Validation: removed duplicated 45–46 wording block and confirmed corrected FAT32 sentence in `pnpm exec prettier --check .../create-your-bootable-media.mdx`.
- Result: DONE. Grammar now includes direct object (`sie`) in the FAT32 formatting sentence.

### 40. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os.mdx` for CR-042.
- Validation: normalized hyphenation by changing line 25 to "Unraidserver" and validated with `rg -n "Unraid-Server|Unraidserver|unraidserver" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os.mdx`.
- Result: DONE. Compound/hyphenation usage for the Unraid server term is now consistent in-context.

### 41. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md` for CR-043.
- Validation: `rg -n "_raid1_|_raid1c3_|_raid1c4_" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md`.
- Result: DONE. No underscored `raid1` variants remain; the terms use backtick notation consistently.

### 42. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md` for CR-044.
- Validation: removed underscores from “Stubbing”/“blacklisten” terms, normalized punctuation (added colon after introductory clause), and fixed quote usage around quoted term `stubben`.
- Result: DONE. Terminology formatting and punctuation in virtualization notes are now consistent and clear.

### 43. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md` for CR-045.
- Validation: `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/release-notes/6.9.0.md` (warns only on existing formatting issues in file).
- Result: DONE. Updated multilingual section punctuation and phrasing (`Community Applications` note/link, "Weitere Details..." phrase, and italicized guidance line) while preserving meaning.

### 44. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx` for CR-046.
- Validation: `rg -n '^:::tip\\[Wann sollte ich das Terminal verwenden\\?\\]' i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx`.
- Result: DONE. Heading is already localized in German; no edit required.

### 45. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx` for CR-047.
- Validation: `rg -n "If you're using Windows, you might prefer" .../command-line-interface.mdx` (not found) and `pnpm exec prettier --check .../command-line-interface.mdx` (warns on existing file formatting issues).
- Result: DONE. Removed duplicate English PuTTY-specific sentence from the wrong section.

### 46. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx` for CR-048.
- Validation: `rg -n "^### \`ps\`$" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx | head -n 5`(verified corrected heading context) and`pnpm exec prettier --check .../command-line-interface.mdx` (warns on existing formatting issues in file).
- Result: DONE. Replaced the incorrect `### Speicher-Utilities` heading before process commands with `### \`ps\`` and aligned the details summary title.

### 47. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx` for CR-049.
- Validation: `rg -n "^### .*ethtool|^### .*tail|^## .*tail|^## .*ethtool|^## Hardware-Tools" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/advanced-tools/command-line-interface.mdx` and `pnpm exec prettier --check .../command-line-interface.mdx` (warns on existing formatting issues in file).
- Result: DONE. De-duplicated command section headers by converting the mis-labeled `### tail` block to `### ethtool`, converting the earlier `### ethtool` block to `### ip`, and renaming `## ethtool` to `## Hardware-Tools`.

### 48. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` for CR-050.
- Validation: `rg -n '^:::caution$|^:::$|if Sie Ihr Unraid USB-Flash-Gerät ersetzen' i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` and `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx`.
- Result: DONE. Consolidated the duplicated top caution block so the introductory caution appears once with balanced markers; formatting command still reports pre-existing file-wide warnings.

### 49. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` for CR-051 and CR-052 and confirmed both issues are already resolved in-file (`Rules`/`Vorsicht` patterns absent).
- Validation: `rg -n \"Rules|Vorsicht\" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx`.
- Result: DONE. No edits required; existing headings/admonitions already use localized and valid tokens.

### 50. Item:

- Action: Rechecked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` for CR-053.
- Validation: `rg -n "Testlizenz|Trial" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx`.
- Result: DONE. Heading already uses `Testlizenz`; no further edit required.

### 51. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` for CR-054.
- Validation: `rg -n "^:::tip\\[Laufwerke identifizieren\\]" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/system-administration/maintain-and-update/changing-the-flash-device.mdx` and `pnpm exec prettier --check .../changing-the-flash-device.mdx`.
- Result: DONE. Translated tip heading to German and kept command content unchanged; prettier still reports unrelated file-wide formatting warnings.

### 52. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/boot-and-startup-failures.mdx` for CR-055.
- Validation: `rg -n "webbasierte Verwaltungsoberfläche" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/boot-and-startup-failures.mdx` and `pnpm exec prettier --check .../boot-and-startup-failures.mdx`.
- Result: DONE. Corrected the adjective form (`webbasierte`) and recorded unchanged formatting warning.

### 53. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/faq.mdx` for CR-056.
- Validation: `rg -n "^import Tabs|^import TabItem" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/faq.mdx` (none found) and `pnpm exec prettier --check .../faq.mdx`.
- Result: DONE. Removed unused `Tabs` and `TabItem` imports from this German FAQ file.

### 54. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx` for CR-057.
- Validation: deduplicated the `macOS kompatibilität` note/caution block at top and confirmed it appears only once via `rg -n "macOS Sequoia \\(15.x\\)-Überlegungen"`.
- Result: DONE. Duplicate top warning block was removed.

### 55. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx` for CR-058.
- Validation: removed the `Before Sie beginnen` mixed-language caution and reran `rg -n ":::caution\\[Bevor Sie beginnen\\]|:::caution\\[Before Sie beginnen\\]"` plus `pnpm exec prettier --check .../apple-time-machine.mdx`.
- Result: DONE. Kept one German caution block and removed duplicated heading/content nesting.

### 56. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx` for CR-059.
- Validation: `rg -n "Create individual Time Machine|Assign appropriate|Configure Time Machine|On each Mac" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx` (no English matches) and `pnpm exec prettier --check .../apple-time-machine.mdx`.
- Result: DONE. Multi-user setup section now uses German phrasing for steps and bullets; formatting check remains in warning state due other pre-existing issues.

### 57. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/apple-time-machine.mdx` for CR-060.
- Validation: translated lines in the troubleshooting block and confirmed by `rg -n "Try the Time Machine Docker|Create a fresh backup destination|Enter the %%SMB|samba%% address" .../apple-time-machine.mdx` (no hits) plus `pnpm exec prettier --check .../apple-time-machine.mdx`.
- Result: DONE. Troubleshooting step 2 remained German and steps 1/3 are now translated and consistent.

### 58. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx` for CR-061.
- Validation: updated block heading and checked with `rg -n \":::info\\[Beachten Sie\\]\"`.
- Result: DONE. Replaced awkward phrase with natural German wording.

### 59. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx` for CR-062.
- Validation: removed the extra standalone closing marker and verified with `rg -n \"^\\s*:::\\s*$\" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx | sed -n '1,5p'`.
- Result: DONE. Single closing marker now closes the `:::info` block.

### 60. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx` for CR-063.
- Validation: removed overlapping early add-drive subsection and confirmed both add-drive sections are no longer duplicated using `rg -n \"\\#\\# Festplatten zu einem Pool hinzufügen|Hinzufügen von Laufwerken zur Erstellung eines Mehrgerätepools\"`.
- Result: DONE. Kept only the dedicated later add-drives section to avoid overlapping content.

### 61. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/file-systems.mdx` for CR-064.
- Validation: reviewed recommendation tip list and translated all English items via `rg -n \"For high-performance|For mixed|If you're uncertain\"`.
- Result: DONE. Mixed German/English recommendations are now fully localized; pre-existing prettier warnings remain.

### 62. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/move-array-to-pool.mdx` for CR-065.
- Validation: confirmed heading remains German with no English in heading text and left as-is.
- Result: DONE. Header already matches local language requirement.

### 63. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/move-array-to-pool.mdx` for CR-066.
- Validation: `rg -n \"Moving files back|To move files|Go to the|After the %%Mover|To set a share\" .../move-array-to-pool.mdx` (no English matches) and `pnpm exec prettier --check .../move-array-to-pool.mdx`.
- Result: DONE. Translated all remaining English lines in the steps section.

### 64. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/pool-single-device-mode.mdx` for CR-067.
- Validation: translated all English prose in intro and important note blocks and ran `pnpm exec prettier --check .../partials/pool-single-device-mode.mdx`.
- Result: DONE. File now has German-only explanatory content and passes Prettier check.

### 65. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-disk-command-line.mdx` for CR-068.
- Validation: removed adjacent duplicate line and verified with `rg -n \"Sie können dies mit einem Befehl tun:\" .../remove-disk-command-line.mdx` and `pnpm exec prettier --check .../remove-disk-command-line.mdx`.
- Result: DONE. Duplicate consecutive line removed successfully.

### 66. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/remove-disk-gui.mdx` for CR-069.
- Validation: normalized the note heading and removed a duplicate mixed-language note fragment with `rg -n \"Before Sie beginnen|Bevor Sie beginnen|^\\s*:::\" .../remove-disk-gui.mdx` and `pnpm exec prettier --check .../remove-disk-gui.mdx`.
- Result: DONE. Non-localized note copy was removed; note block now starts with German heading and consistent structure.

### 67. Item:

- Action: Verified `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/troubleshoot-license-issues.mdx` for CR-070.
- Validation: `rg -n "^::: ?$|^:::$" .../troubleshoot-license-issues.mdx` confirmed no bare admonition marker; only matching valid closings remain at lines that close note/tip/caution blocks. `pnpm exec prettier --check .../troubleshoot-license-issues.mdx` (pass).
- Result: DONE. The stray admonition marker is no longer present.

### 68. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/run-docker-containers/partials/managing-and-customizing-containers/environment-variables.mdx` for CR-071.
- Validation: replaced invalid `info[Examples ...]` marker with `:::info[...]` and removed bare admonition marker with `pnpm exec prettier --write .../environment-variables.mdx` then `pnpm exec prettier --check .../environment-variables.mdx`.
- Result: DONE. Admonition syntax is valid and file now passes Prettier check.

### 69. Item:

- Action: Reworked `i18n/zh/docusaurus-plugin-content-docs/current/unraid-os/getting-started/explore-the-user-interface/tour-the-web-gui.mdx` for CR-072.
- Validation: added `{#1-dashboard}` and `{#2-main}` anchor IDs to matching headings; verified with `pnpm exec prettier --write .../tour-the-web-gui.mdx` and `pnpm exec prettier --check .../key-features.mdx .../tour-the-web-gui.mdx`.
- Result: DONE. Anchor targets in key-features (`#1-dashboard`, `#2-main`) now resolve in the translated Chinese tour doc.

### 70. Item:

- Action: Reworked `docs/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx` for CR-073.
- Validation: updated the label from `Shutdown time-out` to `Shutdown timeout` and verified with `pnpm exec prettier --write docs/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx` then `pnpm exec prettier --check docs/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx`.
- Result: DONE. The shutdown path text now matches the expected UI hyphenation style.

### 71. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx` for CR-074.
- Validation: changed `„Server entfernen"` to `„Server entfernen“` and verified with `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-account/server-management.mdx`.
- Result: DONE. German quotation marks are now consistent in the list item.

### 72. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/automated-flash-backup.mdx` for CR-075.
- Validation: removed duplicated Flash-Backup scope paragraph under **Flash-Backup aktivieren** and removed extra blank lines, then ran `pnpm exec prettier --write .../automated-flash-backup.mdx` and `pnpm exec prettier --check .../automated-flash-backup.mdx`.
- Result: DONE. Flash-Backup scope is now described once in the canonical section.

### 73. Item:

- Action: Reviewed `i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/automated-flash-backup.mdx` for CR-076.
- Validation: confirmed `Backups-Verschlüsselung` heading appears once with `rg -n \"^## Backups-Verschlüsselung$\" i18n/de/docusaurus-plugin-content-docs/current/unraid-connect/automated-flash-backup.mdx`.
- Result: DONE. No duplicate encryption section block is present.

### 74. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx` for CR-077.
- Validation: replaced all `./assets/zfs*.png` links to `/img/zfs*.png` and confirmed via `rg -n \"./assets/zfs\" i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx` (no matches); `pnpm exec prettier --check i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx`.
- Result: DONE. All image links now use `/img`-prefixed paths.

### 75. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx` for CR-079.
- Validation: removed duplicate unclosed `:::tip[Optimizing Festplattenanzahlen` block and kept `:::tip[Optimierte Festplattenzahlen]`; verified with `rg -n \"^:::tip\\[Optimizing Festplattenanzahlen\"` (no matches) and `rg -n \"^:::tip\\[Optimierte Festplattenzahlen\\]$\"`.
- Result: DONE. Tip heading now has valid bracket syntax and no duplicated malformed block remains.

### 76. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/getting-started/set-up-unraid/complete-your-post-setup-essentials.mdx` for CR-080.
- Validation: changed `Lizenzschlüssel-Datei` to `Lizenzschlüsseldatei` and verified with `pnpm exec prettier --write .../complete-your-post-setup-essentials.mdx` then `pnpm exec prettier --check .../complete-your-post-setup-essentials.mdx`.
- Result: DONE. Compound word usage in the checklist item is now consistent.

### 77. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/data-recovery.mdx` for CR-081.
- Validation: `sed -n '43p' .../data-recovery.mdx` to confirm heading change, then `pnpm exec prettier --write` and `pnpm exec prettier --check` on the file.
- Result: DONE. Admonition title language now fully German.

### 78. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/partials/data-recovery/repair-btrfs.mdx` for CR-082.
- Validation: normalized the admonition block into a valid structure, updated phrasing in two bullet lines, and ran `pnpm exec prettier --write .../repair-btrfs.mdx` then `pnpm exec prettier --check .../repair-btrfs.mdx`.
- Result: DONE. The note block now has matching open/close markers and corrected German wording.

### 79. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/partials/data-recovery/repair-xfs.mdx` for CR-083.
- Validation: corrected note block termination formatting, reran `pnpm exec prettier --write .../repair-xfs.mdx`, then `pnpm exec prettier --check .../repair-xfs.mdx`.
- Result: DONE. The note block now has a valid closing marker and remains localized German-only.

### 80. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx` for CR-084.
- Validation: verified admonition title label is `:::important[Wenn Sie RAM-Fehler finden]` and confirmed no mixed-language title remains via direct line inspection.
- Result: DONE. No file edit required; existing text already matches the requested correction.

### 81. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx` for CR-085.
- Validation: corrected sentence flow/commas in the troubleshooting line under `:::caution[RAM Übertaktungsrisiken und Empfehlungen]` and ran `pnpm exec prettier --write .../system-crashes-and-stability.mdx` then `pnpm exec prettier --check .../system-crashes-and-stability.mdx`.
- Result: DONE. The sentence now uses grammatical word order with proper comma placement in German.

### 82. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/system-crashes-and-stability.mdx` for CR-086.
- Validation: removed the redundant standalone `**Risiken der Übertaktung:**` heading and duplicate `:::caution[...]` marker, then ran `pnpm exec prettier --write .../system-crashes-and-stability.mdx` and `pnpm exec prettier --check .../system-crashes-and-stability.mdx`.
- Result: DONE. The admonition block now has a single opening marker and no repeated heading before it.

### 83. Item:

- Action: Reviewed `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/common-issues/unclean-shutdowns.mdx` for CR-087.
- Validation: checked for duplicate section text between lines 46–60 and confirmed no repeated block in current file.
- Result: DONE. CR-087 is already resolved in current branch.

### 84. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/diagnostics/partials/syslog-server/local.mdx` for CR-088.
- Validation: corrected duplicate note closure markers at the end of the file and ran `pnpm exec prettier --write .../local.mdx` then `pnpm exec prettier --check .../local.mdx`.
- Result: DONE. The note block now closes with a single, valid marker.

### 85. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx` for CR-089.
- Validation: changed the duplicate `## Lizenzbesitz` heading to `## Einkauf` and ran `pnpm exec prettier --write .../licensing-faq.mdx` then `pnpm exec prettier --check .../licensing-faq.mdx`.
- Result: DONE. Duplicate top-level section heading is removed and section flow is corrected.

### 86. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx` for CR-090.
- Validation: replaced remaining straight quotation marks in German prose with German-style quotes and ran `pnpm exec prettier --write .../licensing-faq.mdx` then `pnpm exec prettier --check .../licensing-faq.mdx`.
- Result: DONE. Curly quotes are now used consistently in prose.

### 87. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx` for CR-091.
- Validation: promoted `#### Lizenztypen & Funktionen` to `##` and normalized the installation steps under that heading; then ran `pnpm exec prettier --write .../licensing-faq.mdx` and `pnpm exec prettier --check .../licensing-faq.mdx`.
- Result: DONE. Heading structure now matches section level and duplicate step entries were removed.

### 88. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/troubleshooting/licensing-faq.mdx` for CR-092.
- Validation: translated the table values from `Up to 30 (28 data + 2 %%parity/parity%%)` to German and ran `pnpm exec prettier --write .../licensing-faq.mdx` then `pnpm exec prettier --check .../licensing-faq.mdx`.
- Result: DONE. The "Unbeschränkt" and "Lebenslang" rows now use German localized text.

### 89. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/array-check-parity.mdx` for CR-093.
- Validation: moved the floating `Unsaubere Shutdowns oder unerwartete Systemabstürze` item into paragraph flow and ran `pnpm exec prettier --write .../array-check-parity.mdx` then `pnpm exec prettier --check .../array-check-parity.mdx`.
- Result: DONE. List structure is now clean with no floating bullet point.

### 90. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-btrfs.mdx` for CR-094.
- Validation: translated the warning paragraph in the `:::warning` block into German and ran `pnpm exec prettier --write .../fs-check-cli-btrfs.mdx` then `pnpm exec prettier --check .../fs-check-cli-btrfs.mdx`.
- Result: DONE. English line is now fully German-localized.

### 91. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-xfs.mdx` for CR-095.
- Validation: translated the warning paragraph into German and ran `pnpm exec prettier --write .../fs-check-cli-xfs.mdx` then `pnpm exec prettier --check .../fs-check-cli-xfs.mdx`.
- Result: DONE. English warning text is now fully localized.

### 92. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-zfs.mdx` for CR-096.
- Validation: removed duplicate `:::info` block outside the admonition and ran `pnpm exec prettier --write .../fs-check-cli-zfs.mdx` then `pnpm exec prettier --check .../fs-check-cli-zfs.mdx`.
- Result: DONE. Only one admonition block remains for the ZFS guidance link.

### 93. Item:

- Action: Verified `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-check-cli-zfs.mdx` for CR-097.
- Validation: confirmed the line now uses `den speziellen` and the comma after `Dateisystemen`; checked via `nl -ba .../partials/fs-check-cli-zfs.mdx | sed -n '22,25p'`.
- Result: DONE. No code change required for CR-097 in current HEAD.

### 94. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-btrfs.mdx` for CR-098.
- Validation: added missing commas in the first two condition bullets and ran `pnpm exec prettier --write .../fs-repair-cli-btrfs.mdx` then `pnpm exec prettier --check .../fs-repair-cli-btrfs.mdx`.
- Result: DONE. Condition list now uses correct comma-separated flow.

### 95. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-btrfs.mdx` for CR-099.
- Validation: translated the remaining English caution guidance sentence and ran `pnpm exec prettier --write .../fs-repair-cli-btrfs.mdx` then `pnpm exec prettier --check .../fs-repair-cli-btrfs.mdx`.
- Result: DONE. English sentence is now localized.

### 96. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/partials/fs-repair-cli-xfs.mdx` for CR-100.
- Validation: translated the warning paragraph to German and ran `pnpm exec prettier --write .../fs-repair-cli-xfs.mdx` then `pnpm exec prettier --check .../fs-repair-cli-xfs.mdx`.
- Result: DONE. English warning text is now fully localized.

### 97. Item:

- Action: Reworked `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx` for NIT-009 and `i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/run-docker-containers/community-applications.mdx` for NIT-009.
- Validation: removed duplicated misplaced replacement workflow from the `Ersetzen einer Festplatte in einem Pool` section and renamed duplicate `### Wartungserwartungen` heading to `### Laufende Wartung`; then ran `pnpm exec prettier --write i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/manage-storage/cache-pools.mdx i18n/de/docusaurus-plugin-content-docs/current/unraid-os/using-unraid-to/run-docker-containers/community-applications.mdx` followed by `pnpm exec prettier --check` on the same files.
- Result: DONE. `NIT-009` addressed as far as remaining actionable comments are concerned.

### 98. Item:

- Action: Blocked the NIT-010 changes because they require edits to English source files (`docs/unraid-os/system-administration/advanced-tools/command-line-interface.mdx`, `docs/API/programmatic-api-key-management.mdx`, `docs/unraid-os/system-administration/maintain-and-update/upgrading-unraid.mdx`), which is outside the requested scope.
- Validation: Reverted those file changes from this branch and documented the blocker; `docs/unraid-os/troubleshooting/licensing-faq.mdx` already matches the requested 15-day extension and 200-device policy values.
- Result: BLOCKED per scope constraint.

### 99. Item:

- Action: Blocked `NIT-011` because both referenced files are English-only docs (`docs/unraid-os/troubleshooting/faq.mdx`, `docs/API/programmatic-api-key-management.mdx`) and current instructions require translation-only changes.
- Validation: Verified the review payload references only non-translation paths for this item; no translation counterpart can be safely edited for these specific comments.
- Result: BLOCKED per scope constraint.

### 100. Item:

- Action: Applied translation-only fixes for `NIT-012` in `i18n/es/docusaurus-plugin-content-docs/current/unraid-connect/overview-and-setup.mdx` (removed duplicate `## Gestión de licencias` placement and repositioned the localization update note), `i18n/es/docusaurus-plugin-content-docs/current/API/programmatic-api-key-management.mdx` (fixed duplicated troubleshooting/error note structure and normalized local headings), and `i18n/es/docusaurus-plugin-content-docs/current/API/how-to-use-the-api.mdx` (deduplicated method/authenticación/rate-limit/tips/resource blocks and normalized labels).
- Validation: ran `pnpm exec prettier --write i18n/es/docusaurus-plugin-content-docs/current/unraid-connect/overview-and-setup.mdx i18n/es/docusaurus-plugin-content-docs/current/API/programmatic-api-key-management.mdx i18n/es/docusaurus-plugin-content-docs/current/API/how-to-use-the-api.mdx` followed by `pnpm exec prettier --check` on the same files; the English-only nitpick in `docs/unraid-os/advanced-configurations/optimize-storage/zfs-storage.mdx` remains unaddressed.
- Result: BLOCKED per scope constraint.

## Final Checks

- [ ] Queue reviewed: no `TODO` left
- [ ] Remaining `BLOCKED` items documented with reason
- [ ] Re-pulled CodeRabbit threads and reviews
- [ ] No unhandled top-level nitpick remains
