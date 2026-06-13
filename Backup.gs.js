function doPost_backup(e) {
  const eventData = JSON.parse(e.postData.contents);
  const message = eventData.events[0].message.text;
  const reply_token = eventData.events[0].replyToken;

  
  for (let i = 0; i < data_table.length; i++)
  {
    if (data_table[i][0] == message) // If line message send `บ้านเลขที่` ( column 0 )
    {
      i = i + 2;
      let Column_A = data_sheet.getRange(i, 1).getValue();  // บ้านเลขที่
      let Column_B = data_sheet.getRange(i, 2).getValue();  // Soi
      let Column_C = data_sheet.getRange(i, 3).getValue();  // ชื่อสมาชิก
      let Column_D = data_sheet.getRange(i, 4).getValue();  // เบอร์โทร
      let Column_E = data_sheet.getRange(i, 5).getValue();  // เล่มที่
      let Column_F = data_sheet.getRange(i, 6).getValue();  // เลขที่ใบเสร็จ
      let Column_G = data_sheet.getRange(i, 7).getValue();  // วันที่ใบเสร็จ
      let Column_H = data_sheet.getRange(i, 8).getValue();  // วันที่ชำระ
      let Column_I = data_sheet.getRange(i, 9).getValue();  // ยอดชำระ
      let Column_J = data_sheet.getRange(i, 10).getValue();  // ประเภทรายรับ
      let Column_K = data_sheet.getRange(i, 11).getValue();  // วิธีชำระ
      let Column_L = data_sheet.getRange(i, 12).getValue();  // ชำระส่วนกลาง
      let Column_M = data_sheet.getRange(i, 13).getValue();  // ส่วนกลางเดือน
      let Column_N = data_sheet.getRange(i, 14).getValue();  // ถึงเดือน
      let Column_O = data_sheet.getRange(i, 15).getValue();  // ชำระเดือน
      let Column_P = data_sheet.getRange(i, 16).getValue();  // date
      let Column_Q = data_sheet.getRange(i, 17).getValue();  // Name*
      let Column_R = data_sheet.getRange(i, 18).getValue();  // สถานะ
      let Column_S = data_sheet.getRange(i, 19).getValue();  // ตัดชำระยอดค้าง
      let Column_T = data_sheet.getRange(i, 20).getValue();  // ชำระส่วนกลางเดือน


      result = 
          // Start Flex simulator
          {}
          // Stop Flex

    }
  }

} 

// const accessToken

