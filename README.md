# SNP1 — LINE OA บอทค่าส่วนกลางหมู่บ้าน

บอท LINE Official Account สำหรับ **หมู่บ้านเศรณีปาร์ค 1 (SNP1)** พัฒนาด้วย
Google Apps Script ผูกกับ Google Sheet เพื่อช่วยงานนิติบุคคลฯ ในการแจ้งและ
ตรวจสอบการชำระค่าส่วนกลาง (ค่าส่วนกลางเดือนละ 1,300 บาท)

---

## ✨ ฟีเจอร์ปัจจุบัน

### สำหรับสมาชิกลูกบ้าน (แชต 1-1 กับ LINE OA)
- 🏠 **เช็คยอดบ้านเลขที่** — พิมพ์เลขบ้าน (1–70) เพื่อดูสถานะการชำระค่าส่วนกลาง
- 📊 **รายงานล่าสุด** — ดูสรุปการรับชำระประจำเดือน (ส่งแบบ *reply* ไม่กิน quota)
- 💳 **วิธีชำระเงิน** — เลขบัญชีและช่องทางการชำระ
- 📞 **ติดต่อกรรมการ** — เบอร์ติดต่อและกลุ่มไลน์ลูกบ้าน
- 📱 **Rich Menu** — เมนู 4 ปุ่มด้านล่างห้องแชต ใช้งานง่ายไม่ต้องจำคำสั่ง

### สำหรับคณะกรรมการ
- 📢 **Broadcast อัตโนมัติ** เข้ากลุ่มกรรมการ สรุปยอดชำระรายเดือน
  - Template 1 (วันที่ 25–31) และ Template 2 (วันที่ 1–10 รวมรายชื่อบ้านค้างชำระ)
- 📋 เมนูบนชีต (`💬 SNP Tools`) สำหรับสั่งส่งรายงาน / อัปเดตข้อมูลแบบ manual

---

## 🛠 เทคโนโลยีที่ใช้
- **Google Apps Script** (bound script ผูกกับ Google Sheet)
- **clasp** สำหรับ sync โค้ดระหว่างเครื่อง ↔ Apps Script
- **LINE Messaging API** (webhook, push/reply, Flex Message, Rich Menu)
- **GitHub** เป็นแหล่งเก็บโค้ดหลัก (source of truth)

---

## 📁 โครงสร้างไฟล์
| ไฟล์ | คำอธิบาย |
|------|----------|
| `Code.js` | โค้ดหลัก (webhook, logic การชำระ, broadcast, rich menu) |
| `Backup.gs.js` | โค้ดสำรอง / legacy |
| `index.html.html` | หน้า HTML ของ web app |
| `appsscript.json` | manifest ของ Apps Script |
| `flex-templates/` | สำเนา Flex JSON (template1/2) สำหรับเก็บประวัติใน git |
| `.clasp.json` | config ของ clasp (script ID) — *gitignored* |
| `.claspignore` | กันไม่ให้ไฟล์เฉพาะ repo ถูก push ขึ้น Apps Script |

> **หมายเหตุ:** Flex layout ที่ใช้งานจริงเก็บอยู่ในชีตแท็บ `FlexMessage`
> (B2 = template1, C2 = template2) — โค้ดอ่านตอน runtime ส่วน `flex-templates/`
> เป็นสำเนาไว้ดูประวัติ แก้แล้วต้องวางกลับลงเซลล์ในชีตด้วย

---

## ⚙️ การตั้งค่า (Configuration)

ความลับ/ค่าตั้งต่าง ๆ **ไม่เก็บในโค้ด** แต่อยู่ใน Script Properties
(Apps Script → ⚙️ Project Settings → Script Properties) ต้องตั้งค่า key เหล่านี้:

| Key | คำอธิบาย |
|-----|----------|
| `LINE_ACCESS_TOKEN` | Channel access token ของ LINE OA |
| `LINE_GROUP_ID` | ID กลุ่มกรรมการที่จะส่ง broadcast |
| `LINE_USER_ID` | userId สำหรับทดสอบ/แอดมิน |
| `RICHMENU_IMAGE_FILE_ID` | file ID รูป rich menu ใน Google Drive (สำหรับ `setupRichMenu()`) |

---

## 🚀 ขั้นตอน Deploy (clasp)

GitHub เป็น source of truth ขั้นตอนหลังแก้โค้ด:
```bash
clasp push                                   # อัปโหลด local → Apps Script
# ทดสอบบอทด้วยตัวเองก่อน
git add . && git commit -m "..."             # บันทึก revision
git push                                     # สำรองขึ้น GitHub
clasp deploy -i <DEPLOYMENT_ID> -d "คำอธิบายสั้น ๆ"
```

> ⚠️ **ห้ามรัน `clasp deploy` เปล่า ๆ (ไม่มี `-i`)** เพราะจะสร้าง deployment ใหม่
> = URL web app ใหม่ = **webhook ของ LINE พัง** ต้องอัปเดต deployment เดิม
> ด้วย `-i <DEPLOYMENT_ID>` เสมอ (ดู ID ได้จาก `clasp deployments`)

### การติดตั้ง Rich Menu
1. อัปโหลดรูปเมนู (PNG/JPEG ขนาด 1250×843, < 1 MB) ขึ้น Google Drive
2. ตั้งค่า Script Property `RICHMENU_IMAGE_FILE_ID` = file ID ของรูป
3. รันฟังก์ชัน `setupRichMenu()` ใน Apps Script editor (อนุญาตสิทธิ์ Drive)
4. จัดการเมนูเดิมได้ด้วย `listRichMenus()` และ `deleteRichMenu(id)`

---

## 🗺 Roadmap (ไอเดียฟีเจอร์ในอนาคต)

### ลำดับความสำคัญสูง
- [ ] **ลงทะเบียนบ้าน (ผูก userId ↔ เลขบ้าน)** — ให้สมาชิกยืนยันตัวตนด้วยรหัสจาก
      ใบเสร็จ เพื่อความเป็นส่วนตัว และปลดล็อกฟีเจอร์แจ้งเตือนรายบุคคล
- [ ] **แจ้งเตือนค้างชำระอัตโนมัติ** — DM หาบ้านที่ค้างชำระ พร้อมยอดที่ต้องจ่าย
      (จำนวนเดือน × 1,300) และวิธีชำระ
- [ ] **ใบเสร็จดิจิทัล** — เมื่อกรรมการบันทึกการชำระในชีต ส่ง Flex ใบเสร็จให้สมาชิก
      อัตโนมัติ (เลขที่ใบเสร็จ / เดือน / ยอด)
- [ ] **ยืนยัน signature ของ webhook** — ตรวจ `X-Line-Signature` (HMAC-SHA256)
      เพื่อกันการปลอม request เข้ามาที่ web app

### ปรับปรุงรายงาน
- [ ] **เพิ่มยอดเงินค้างชำระรวม** ใน broadcast (ไม่ใช่แค่จำนวนบ้าน)
- [ ] **อัตราการเก็บเงิน (collection rate)** ต่อเดือน
- [ ] **แยกประเภทรายรับ** (ค่าส่วนกลาง vs เงินบริจาค)
- [ ] **รายงานอายุหนี้ (aging)** — ใครค้าง 2+/3+ เดือน

### คุณภาพข้อมูล & ความสะดวก
- [ ] **PromptPay QR** — สร้าง QR พร้อมยอดที่ต้องชำระให้สมาชิกสแกนจ่าย
- [ ] **ค้นหาด้วยเบอร์โทร** เป็นทางเลือกนอกจากเลขบ้าน
- [ ] **ตรวจสอบความถูกต้องของข้อมูลในชีต** — เลขใบเสร็จซ้ำ, ยอดไม่หาร 1,300 ลงตัว,
      ข้อมูลขาด
- [ ] **แจ้งเตือนแอดมินเมื่อ broadcast ล้มเหลว**
- [ ] **สำรองข้อมูลชีตอัตโนมัติ** ตามรอบเวลา

---

## 📌 หมายเหตุด้านความปลอดภัย
- โค้ดในไฟล์นี้ปลอดความลับ (อ่านจาก Script Properties) — commit ขึ้น GitHub ได้
- หาก token เคยหลุด ให้ **reissue** ที่ LINE Developers Console แล้วอัปเดต
  `LINE_ACCESS_TOKEN` ใน Script Properties

---

*จัดทำเพื่อใช้งานภายในนิติบุคคลหมู่บ้านจัดสรรเศรณีปาร์ค 1*
