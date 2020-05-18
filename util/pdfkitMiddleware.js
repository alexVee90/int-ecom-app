const PDFKIT     = require('pdfkit');
const fs         = require('fs');
const path       = require('path');
const getDirname = require('./getDirname');

module.exports = (session_id, user, items) => { 
  const filePath = `order-${session_id}.pdf`;
  const wrtFile = fs.createWriteStream(path.join(getDirname(), 'data', filePath));

  const doc = new PDFKIT();
  doc.text(`Invoice-${session_id}`);
  doc.text(`Buyer: ${user.name}`);
  items.forEach(item => doc.text(`${item.productId} x ${item.quantity} = ${Number(item.variant.price) * Number(item.quantity)}$`));
  doc.text('---------------------------------------------------------------------------------------------------------------------');
  doc.text(`Total: ${items.reduce((acc, i) => acc + (Number(i.variant.price) * Number(i.quantity)), 0)}$`);
  doc.end();

  doc.pipe(wrtFile);
}